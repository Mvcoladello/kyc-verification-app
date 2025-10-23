import { useMemo } from 'react';
import { useForm, type UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Helpers
const onlyDigits = (v: string) => v.replace(/\D/g, '');

const isValidCPF = (cpfRaw: string) => {
  const cpf = onlyDigits(cpfRaw);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // all same digits
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(cpf.charAt(10));
};

const isAdult = (dateStr: string) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 18;
};

const cepRegex = /^\d{5}-?\d{3}$/; // 00000-000 or 00000000

// Shared file schema and rules
const acceptedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

const fileSchema = z
  .instanceof(File, { message: 'Arquivo é obrigatório' })
  .refine((f) => acceptedMimes.includes(f.type), 'Tipo de arquivo não permitido')
  .refine((f) => f.size <= maxSizeBytes, 'O arquivo deve ter no máximo 5MB');

// Passo 1: Dados Pessoais
export const personalInfoSchema = z.object({
  fullName: z.string().trim().min(3, 'Informe seu nome completo'),
  email: z.string().trim().email('E-mail inválido'),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = onlyDigits(v);
      return digits.length === 10 || digits.length === 11; // Brasil: fixo 10, móvel 11
    }, 'Telefone inválido'),
  cpf: z.string().trim().refine(isValidCPF, 'CPF inválido'),
  birthDate: z.string().refine(isAdult, 'É necessário ser maior de 18 anos'),
});

// Passo 2: Endereço
export const addressSchema = z.object({
  country: z.string().min(1, 'País é obrigatório'),
  zipCode: z.string().trim().regex(cepRegex, 'CEP inválido'),
  state: z.string().trim().min(1, 'Estado é obrigatório'),
  city: z.string().trim().min(1, 'Cidade é obrigatória'),
  street: z.string().trim().min(1, 'Endereço é obrigatório'),
  number: z.string().trim().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
});

// Passo 3: Documento (dados textuais + arquivos)
export const documentSchema = z.object({
  documentType: z.enum(['rg', 'cnh', 'passport']),
  documentNumber: z.string().trim().min(5, 'Número do documento inválido'),
  issuingCountry: z.string().min(1, 'País emissor é obrigatório'),
  documentFront: fileSchema,
  documentBack: fileSchema,
});

// Passo 4: Selfie (opcional por enquanto)
export const selfieSchema = z.object({
  selfie: fileSchema.optional(),
});

export const stepSchemas = {
  personal: personalInfoSchema,
  address: addressSchema,
  document: documentSchema,
  selfie: selfieSchema,
} as const;

export type StepKey = keyof typeof stepSchemas;

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type AddressInfo = z.infer<typeof addressSchema>;
export type DocumentInfo = z.infer<typeof documentSchema>;

// Combined schema for whole form
export const fullFormSchema = personalInfoSchema.merge(addressSchema).merge(documentSchema).merge(selfieSchema);
export type FullFormValues = z.infer<typeof fullFormSchema>;

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
