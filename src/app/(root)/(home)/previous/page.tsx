import CallList from '@/components/CallList'
import React from 'react'

function Previous() {
  return (
    <section className='flex flex-col size-full text-white gap-10'>
      <h1 className='text-3xl font-bold'> Previous Page</h1>
      <CallList type='previous'/>
    </section>
  )
}

export default Previous