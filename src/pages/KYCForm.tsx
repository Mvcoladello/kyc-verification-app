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
import { zodResolver } from '@hookform/resolvers/zod';
import { fullFormSchema, type FullFormValues } from '../hooks/useFormValidation';

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
  const methods = useForm<FullFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(fullFormSchema) as any,
  });
  const { getValues } = methods;

  const { currentStep, nextStep, prevStep, progress } = useMultiStepForm(stepsConfig);

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
          />
        );
      case 'selfie':
        return <SelfieStep onBack={prevStep} onNext={nextStep} />;
      case 'review': {
        const current = getValues();
        return (
          <ReviewStep
            data={{
              personal: current,
              address: current,
              document: { ...current, fileFront: (current as any).documentFront, fileBack: (current as any).documentBack },
            }}
            onBack={prevStep}
            onSubmit={() => {
              const values = getValues();
              console.log('Submitting KYC data', {
                ...values,
                fileFront: (values as any).documentFront,
                fileBack: (values as any).documentBack,
              });
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
