import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <span className='text-red-800'>
      {children}
    </span>
  )
}

export default ErrorMessage