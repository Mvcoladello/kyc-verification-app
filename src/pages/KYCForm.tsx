import { useState } from 'react';
import styled from 'styled-components';
import { Card, Typography } from '../components/ui';
import { PersonalInfoStep } from '../components/kyc/PersonalInfoStep';
import { AddressStep } from '../components/kyc/AddressStep';
import { IdentityStep } from '../components/kyc/IdentityStep';
import { SelfieStep } from '../components/kyc/SelfieStep';
import { ReviewStep } from '../components/kyc/ReviewStep';
import { useMultiStepForm, type StepConfig } from '../hooks/useMultiStepForm';
import type { PersonalInfo, AddressInfo, DocumentInfo } from '../hooks/useFormValidation';

const Wrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
`;

export type KycData = {
  personal: PersonalInfo;
  address: AddressInfo;
  document: DocumentInfo & { fileFront?: File | null; fileBack?: File | null };
};

const stepsConfig: StepConfig[] = [
  { id: 'personal', title: 'Dados Pessoais' },
  { id: 'address', title: 'Endereço' },
  { id: 'document', title: 'Documento' },
  { id: 'selfie', title: 'Selfie' },
  { id: 'review', title: 'Revisão' },
];

export const KYCForm = () => {
  const [data, setData] = useState<Partial<KycData>>({});

  const { currentStep, nextStep, prevStep, progress } = useMultiStepForm(stepsConfig);

  const handleNext = (values: any) => {
    if (currentStep.id === 'personal') setData((d) => ({ ...d, personal: values }));
    if (currentStep.id === 'address') setData((d) => ({ ...d, address: values }));
    if (currentStep.id === 'document') setData((d) => ({ ...d, document: values }));
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'personal':
        return (
          <PersonalInfoStep
            initialValues={data.personal}
            onNext={(v) => handleNext(v)}
          />
        );
      case 'address':
        return (
          <AddressStep
            initialValues={data.address}
            onBack={prevStep}
            onNext={(v) => handleNext(v)}
          />
        );
      case 'document':
        return (
          <IdentityStep
            initialValues={data.document}
            onBack={prevStep}
            onNext={(v) => handleNext(v)}
          />
        );
      case 'selfie':
        return <SelfieStep onBack={prevStep} onNext={nextStep} />;
      case 'review':
        return (
          <ReviewStep
            data={data as any}
            onBack={prevStep}
            onSubmit={() => {
              console.log('Submitting KYC data', data);
              alert('KYC enviado!');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Typography variant="h2" style={{ marginBottom: 16 }}>KYC - Verificação de Identidade</Typography>
      <Card padding="small" style={{ marginBottom: 16 }}>
        <Typography variant="body2" color="textSecondary">Progresso: {progress}%</Typography>
      </Card>
      {renderStep()}
    </Wrapper>
  );
};

export default KYCForm;
