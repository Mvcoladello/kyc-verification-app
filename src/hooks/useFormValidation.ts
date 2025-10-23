import { useMemo } from 'react';
import { useForm, type UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Passo 1: Dados Pessoais
export const personalInfoSchema = z.object({
  fullName: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .min(8, 'Telefone inválido')
    .optional()
    .or(z.literal('')),
  cpf: z
    .string()
    .min(11, 'CPF inválido')
    .max(14, 'CPF inválido'),
  birthDate: z.string().optional(),
});

// Passo 2: Endereço
export const addressSchema = z.object({
  country: z.string().min(1, 'País é obrigatório'),
  zipCode: z.string().min(3, 'CEP inválido'),
  state: z.string().min(1, 'Estado é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  street: z.string().min(1, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
});

// Passo 3: Documento
export const documentSchema = z.object({
  documentType: z.enum(['rg', 'cnh', 'passport']).default('rg'),
  documentNumber: z.string().min(5, 'Número do documento inválido'),
  issuingCountry: z.string().min(1, 'País emissor é obrigatório'),
  // Os arquivos serão validados pelo hook useFileUpload
});

export const stepSchemas = {
  personal: personalInfoSchema,
  address: addressSchema,
  document: documentSchema,
} as const;

export type StepKey = keyof typeof stepSchemas;

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type AddressInfo = z.infer<typeof addressSchema>;
export type DocumentInfo = z.infer<typeof documentSchema>;

// Helper types to map step -> form values
type SchemaMap = typeof stepSchemas;
type SchemaOf<K extends keyof SchemaMap> = SchemaMap[K];
export type FormValuesOf<K extends StepKey> = z.infer<SchemaOf<K>>;

export const useFormValidation = <TStep extends StepKey>(
  step: TStep,
  options?: { formProps?: UseFormProps<FormValuesOf<TStep>>; defaultValues?: Partial<FormValuesOf<TStep>> }
) => {
  const schema = useMemo(() => stepSchemas[step] as SchemaOf<TStep>, [step]);

  type FormValues = FormValuesOf<TStep>;

  const methods = useForm<FormValues>({
    // zodResolver typing can be broader than react-hook-form expects across versions
    resolver: zodResolver(schema) as any,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: options?.defaultValues as any,
    ...(options?.formProps as UseFormProps<FormValues>),
  });

  return { schema, methods } as const;
};
