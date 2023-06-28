'use client'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver} from '@hookform/resolvers/zod'
import { tv } from "tailwind-variants"
import ErrorMessage from "@/components/ErrorMessage"

type UserData = z.infer<typeof createUserFormSchema>

const createUserFormSchema = z.object({

  email: z.string()
    .nonempty('Campo obrigatório...')
    .email('Formato inválido...'),

  password: z.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres...')
})

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const [user, setUser] = useState('')

  function createUser(data: UserData){
    setUser(JSON.stringify(data, null, 2))
  }

  return (
    <form className="flex w-80 flex-col items-center justify-center gap-4 text-white/40">
      <div className="w-full flex flex-col gap-1">
        <input 
          type="text"
          className="w-full p-2 bg-zinc-800"
          placeholder="E-mail..."
          {...register('email')} 
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="w-full flex flex-col gap-1">
        <input 
          type="text"
          className="w-full p-2 bg-zinc-800"
          placeholder="Senha..."
          {...register('password')} 
        />
        
      </div>

      <button className="w-full p-2 bg-green-800 text-white" onClick={handleSubmit(createUser)}>
        Enviar
      </button>

      <pre>{user}</pre>
    </form>
  )
}
