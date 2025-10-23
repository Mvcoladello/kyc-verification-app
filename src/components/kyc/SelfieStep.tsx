import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

export interface SelfieStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const SelfieStep = ({ onBack, onNext }: SelfieStepProps) => {
  const { control, setValue, formState: { errors } } = useFormContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Encapsula parada da câmera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setIsCapturing(false);
  };

  useEffect(() => {
    return () => {
      // cleanup stream quando saindo do passo
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [stream, previewUrl]);

  const startCamera = async () => {
    // Verifica suporte
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Câmera não suportada neste dispositivo/navegador. Use o upload de arquivo.');
      return;
    }

    try {
      setIsStarting(true);
      setCameraError(null);

      // Tenta usar câmera frontal
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        } as MediaTrackConstraints,
        audio: false,
      };

      // Se já existir um stream anterior, encerra
      stopCamera();

      const s = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(s);
      setIsCapturing(true);

      if (videoRef.current) {
        videoRef.current.srcObject = s;
        try {
          await videoRef.current.play();
        } catch (err) {
          // Alguns browsers podem bloquear autoplay; o botão de captura só aparece após play
        }
      }
    } catch (e: any) {
      if (e?.name === 'NotAllowedError') {
        setCameraError('Permissão da câmera negada. Autorize o acesso ou use o upload de arquivo.');
      } else if (e?.name === 'NotFoundError') {
        setCameraError('Nenhuma câmera foi encontrada. Conecte uma câmera ou use o upload.');
      } else {
        setCameraError('Não foi possível acessar a câmera. Permita o acesso ou use o upload de arquivo.');
      }
      setIsCapturing(false);
    } finally {
      setIsStarting(false);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Garante que dimensões do vídeo estejam disponíveis
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, w, h);
    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve((b as Blob) ?? new Blob()), 'image/jpeg', 0.9)
    );

    const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setValue('selfie', file, { shouldValidate: true });

    // Mostra prévia e encerra a câmera
    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
    stopCamera();
  };

  return (
    <Card variant="elevated" padding="large">
      <Card.Header>
        <Card.Title>Selfie</Card.Title>
        <Card.Description>
          Faça upload de uma selfie legível ou use sua câmera para capturar agora.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div style={{ display: 'grid', gap: 12 }}>
          <Typography variant="body2" color="textSecondary">
            Dicas: Boa iluminação, rosto centralizado, sem acessórios que cubram o rosto.
          </Typography>

          <Controller
            name="selfie"
            control={control}
            render={({ field, fieldState }) => (
              <FileUpload
                label="Upload de Selfie"
                accept=".jpg,.jpeg,.png"
                maxSizeMB={5}
                fullWidth
                file={field.value as File | null}
                onChange={(file) => field.onChange(file)}
                error={fieldState.error?.message}
                helperText={(field.value as File | null)?.name}
              />
            )}
          />

          {/* Pré-visualização após captura pela câmera */}
          {previewUrl && (
            <div style={{ display: 'grid', gap: 8 }}>
              <img src={previewUrl} alt="Pré-visualização da selfie" style={{ width: '100%', borderRadius: 8 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setPreviewUrl(null);
                    startCamera();
                  }}
                >
                  Tirar outra foto
                </Button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 8 }}>
            {!isCapturing ? (
              <Button type="button" variant="secondary" onClick={startCamera} disabled={isStarting}>
                {isStarting ? 'Abrindo câmera…' : 'Usar câmera'}
              </Button>
            ) : (
              <div style={{ display: 'grid', gap: 8 }}>
                <video
                  ref={videoRef}
                  style={{ width: '100%', borderRadius: 8 }}
                  playsInline
                  muted
                  autoPlay
                  aria-label="Pré-visualização da câmera"
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="button" onClick={capturePhoto}>Capturar foto</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      stopCamera();
                    }}
                  >
                    Fechar câmera
                  </Button>
                </div>
                {cameraError && (
                  <Typography variant="body2" color="textSecondary">{cameraError}</Typography>
                )}
              </div>
            )}
          </div>

          {errors?.selfie && (
            <Typography variant="body2" color="textSecondary" role="alert">{(errors as any).selfie?.message}</Typography>
          )}
        </div>
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="button" onClick={onNext}>Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
