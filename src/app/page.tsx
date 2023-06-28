'use client'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { InputProps, form } from "@/styles/styles"

import ErrorMessage from "@/components/ErrorMessage"

type UserData = z.infer<typeof createUserFormSchema>

const createUserFormSchema = z.object({

  email: z.string()
    .nonempty('Campo obrigatório...')
    .email('Formato inválido...'),

  password: z.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres...')
})

export default function Home({ state }: InputProps) {

  const [user, setUser] = useState('')
  const [className, setClassName] = useState<InputProps["state"]>()

  const { 
    base, 
    input, 
    button 
  } = form({ className })

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<UserData>({ resolver: zodResolver(createUserFormSchema) })

  function createUser(data: UserData){
    if(errors.email && errors.password){
      setClassName("error")
    }

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
