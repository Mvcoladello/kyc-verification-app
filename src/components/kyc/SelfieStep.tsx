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

  useEffect(() => {
    return () => {
      // cleanup stream when leaving step
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      setIsCapturing(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      setCameraError('Não foi possível acessar a câmera. Permita o acesso ou use o upload de arquivo.');
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), 'image/jpeg', 0.9));
    const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setValue('selfie', file, { shouldValidate: true });
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

          <div style={{ display: 'grid', gap: 8 }}>
            {!isCapturing ? (
              <Button type="button" variant="secondary" onClick={startCamera}>Usar câmera</Button>
            ) : (
              <div style={{ display: 'grid', gap: 8 }}>
                <video ref={videoRef} style={{ width: '100%', borderRadius: 8 }} playsInline muted aria-label="Pré-visualização da câmera" />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="button" onClick={capturePhoto}>Capturar foto</Button>
                  <Button type="button" variant="secondary" onClick={() => { stream?.getTracks().forEach((t) => t.stop()); setStream(null); setIsCapturing(false); }}>Fechar câmera</Button>
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
