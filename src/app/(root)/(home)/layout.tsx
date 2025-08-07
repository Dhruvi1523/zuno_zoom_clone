import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "ZUNO",
  description: "Video Calling App",
  icons:'/assets/icon.png'
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative'>

      <Navbar />

      <div className='flex'>
        <Sidebar />

        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:px-14 sm:px-14'>
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>

    </main>
  )
}

export default HomeLayout