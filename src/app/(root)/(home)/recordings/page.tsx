import CallList from '@/components/CallList'
import React from 'react'

function Recording() {
  return (
   <section className='flex flex-col size-full text-white gap-10'>
      <h1 className='text-3xl font-bold'> Recording Page</h1>
      <CallList  type='recordings'/>
    </section>
  )
}

export default Recording