'use client'
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProps, form } from "@/styles/styles"
import { UserData, createUserFormSchema } from "@/schema/formSchema"

import ErrorMessage from "@/components/ErrorMessage"

export default function Home({  }: FormProps) {

  console.log('render')

  const [user, setUser] = useState('')
  const [state, setState] = useState<FormProps["state"]>()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<UserData>({ resolver: zodResolver(createUserFormSchema) })
  
  const { base, input, button } = form({ state })

  useEffect(() =>{
    if(errors.email && errors.password){
      setState("error")
    }
  }, [errors])

  function createUser(data: UserData){

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
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>

      <button className={button()} onClick={handleSubmit(createUser)}>
        Enviar
      </button>

      <pre>{user}</pre>
    </form>
  )
}
