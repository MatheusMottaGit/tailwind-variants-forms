'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"

interface User {
  email: string,
  password: string
}

export default function Home() {

  const { register, handleSubmit } = useForm<User>()

  const [user, setUser] = useState('')

  function createUser(data: User){
    setUser(JSON.stringify(data))
  }

  return (
    <form className="flex w-80 flex-col items-center justify-center gap-4 text-white/40">
      <input 
        type="text"
        className="w-full p-2 bg-zinc-800"
        placeholder="E-mail..."
        {...register('email')} 
      />

      <input 
        type="text"
        className="w-full p-2 bg-zinc-800"
        placeholder="Senha..."
        {...register('password')} 
      />

      <button className="w-full p-2 bg-green-800 text-white" onClick={handleSubmit(createUser)}>
        Enviar
      </button>

      <pre>{user}</pre>
    </form>
  )
}
