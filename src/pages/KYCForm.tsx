import styled from 'styled-components';
import { Card, Typography, Stepper, useToast } from '../components/ui';
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
import { useState } from 'react';

const Wrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[3]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  }
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

  const { currentStep, nextStep, prevStep, progress, currentStepIndex, goToStep } = useMultiStepForm(stepsConfig);
  const { success, error } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => {
    nextStep();
  };

  const handleSubmitAll = async () => {
    try {
      setSubmitting(true);
      const values = getValues();
      // Simula chamada async
      await new Promise((r) => setTimeout(r, 800));
      console.log('Submitting KYC data', {
        ...values,
        fileFront: (values as any).documentFront,
        fileBack: (values as any).documentBack,
      });
      success('KYC enviado com sucesso!');
    } catch (e) {
      error('Falha ao enviar KYC. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
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
              allValues: current,
            }}
            onBack={prevStep}
            onSubmit={handleSubmitAll}
            submitting={submitting}
            goToStep={goToStep}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Typography variant="h2" style={{ marginBottom: 8 }}>KYC - Verificação de Identidade</Typography>
      <Stepper
        steps={stepsConfig.map((s) => ({ id: s.id, label: s.title || String(s.id) }))}
        activeIndex={currentStepIndex}
      />
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
