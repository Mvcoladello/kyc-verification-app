import { describe, it, expect } from 'vitest';
import { personalInfoSchema, addressSchema } from '../src/hooks/useFormValidation';

describe('Validation schemas', () => {
  it('validates personal info: adult, email and cpf', () => {
    const valid = personalInfoSchema.safeParse({
      fullName: 'João da Silva',
      email: 'joao@example.com',
      phone: '11987654321',
      cpf: '529.982.247-25', // known valid CPF example
      birthDate: '1990-01-01',
    });
    expect(valid.success).toBe(true);
  });

  it('rejects invalid personal info data', () => {
    const invalid = personalInfoSchema.safeParse({
      fullName: 'A',
      email: 'bad',
      phone: '123',
      cpf: '000.000.000-00',
      birthDate: '2020-01-01',
    });
    expect(invalid.success).toBe(false);
  });

  it('validates address schema with CEP formats', () => {
    const ok = addressSchema.safeParse({
      country: 'BR',
      zipCode: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      street: 'Av Paulista',
      number: '100',
      complement: 'Ap 1',
    });
    expect(ok.success).toBe(true);

    const bad = addressSchema.safeParse({
      country: 'BR',
      zipCode: '1234',
      state: '',
      city: '',
      street: '',
      number: '',
    });
    expect(bad.success).toBe(false);
  });
});
