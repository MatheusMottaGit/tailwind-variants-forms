'use client'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { VariantProps, tv } from "tailwind-variants"

import ErrorMessage from "@/components/ErrorMessage"

type UserData = z.infer<typeof createUserFormSchema>

const createUserFormSchema = z.object({

  email: z.string()
    .nonempty('Campo obrigatório...')
    .email('Formato inválido...'),

  password: z.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres...')
})

interface FormProps extends VariantProps<typeof form>{}

const form = tv({
  slots: {
    base: "flex w-80 flex-col items-center justify-center gap-4 text-white/40",
    input: "w-full p-2 bg-zinc-800 outline-none",
    button: "w-full p-2 bg-green-800 text-white cursor-pointer hover:bg-green-900"
  },

  variants: {
    state: {
      error: {
        input: "border-2 border-red-800",
        button: "bg-green-900 text-white/50 cursor-not-allowed"
      },

      success: {
        input: "border-2 border-green-800"
      }
    }
  }
})

export default function Home({ state }: FormProps) {

  const [user, setUser] = useState('')

  const { 
    base, 
    input, 
    button 
  } = form({ state })

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<UserData>({ resolver: zodResolver(createUserFormSchema) })

  function createUser(data: UserData){

    console.log(data)

    setUser(JSON.stringify(data, null, 2))

    reset({
      email: "",
      password: ""
    })
  }

  return (
    <form className={base()}>
      <div className="w-full flex flex-col gap-1">
        <input 
          type="text"
          className={input()}
          placeholder="E-mail..."
          {...register('email')} 
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="w-full flex flex-col gap-1">
        <input 
          type="text"
          className={input()}
          placeholder="Senha..."
          {...register('password')} 
        />
        
      </div>

      <button className={button()} onClick={handleSubmit(createUser)}>
        Enviar
      </button>

      <pre>{user}</pre>
    </form>
  )
}
