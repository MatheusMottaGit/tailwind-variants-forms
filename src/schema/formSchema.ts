import { z } from "zod";

export type UserData = z.infer<typeof createUserFormSchema>

export const createUserFormSchema = z.object({

  email: z.string()
    .nonempty('Campo obrigatório...')
    .email('Formato inválido...'),

  password: z.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres...')
})