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
import { FormProvider, useForm } from 'react-hook-form';

const Wrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
`;

export type FormValues = PersonalInfo & AddressInfo & DocumentInfo;

const stepsConfig: StepConfig[] = [
  { id: 'personal', title: 'Dados Pessoais' },
  { id: 'address', title: 'Endereço' },
  { id: 'document', title: 'Documento' },
  { id: 'selfie', title: 'Selfie' },
  { id: 'review', title: 'Revisão' },
];

export const KYCForm = () => {
  const methods = useForm<FormValues>({ mode: 'onChange', reValidateMode: 'onChange' });
  const { getValues } = methods;

  const { currentStep, nextStep, prevStep, progress } = useMultiStepForm(stepsConfig);

  // Persist files across navigation
  const [fileFront, setFileFront] = useState<File | null>(null);
  const [fileBack, setFileBack] = useState<File | null>(null);

  const handleNext = () => {
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'personal':
        return (
          <PersonalInfoStep onNext={handleNext as any} />
        );
      case 'address':
        return (
          <AddressStep onBack={prevStep} onNext={handleNext as any} />
        );
      case 'document':
        return (
          <IdentityStep
            onBack={prevStep}
            onNext={handleNext as any}
            fileFront={fileFront}
            fileBack={fileBack}
            setFileFront={setFileFront}
            setFileBack={setFileBack}
          />
        );
      case 'selfie':
        return <SelfieStep onBack={prevStep} onNext={nextStep} />;
      case 'review': {
        const current = getValues();
        return (
          <ReviewStep
            data={{ personal: current, address: current, document: { ...current, fileFront, fileBack } }}
            onBack={prevStep}
            onSubmit={() => {
              const values = getValues();
              console.log('Submitting KYC data', { ...values, fileFront, fileBack });
              alert('KYC enviado!');
            }}
          />
        );
      }
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
      <FormProvider {...methods}>
        {renderStep()}
      </FormProvider>
    </Wrapper>
  );
};

export default KYCForm;
