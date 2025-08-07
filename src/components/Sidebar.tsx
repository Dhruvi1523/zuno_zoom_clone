"use client"
import { sidebarLinks } from '@/const'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Sidebar() {
    const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 h-screen flex w-fit flex-col justify-between bg-[#1C1F2E] p-5 text-white pt-20 max-sm:hidden lg:w-[264px]">
        <div className='flex flex-1 flex-col gap-6'>
            {
              sidebarLinks.map((link) => {
                const isActive = link.route === pathname || (pathname.startsWith(link.route) && link.route.length > 1) ;

                return (
                    <Link href={link.route} 
                    key={link.label} 
                    className={`flex items-center gap-3.5 p-4 justify-start rounded-lg ${isActive && "bg-[#0E78F9]"}`}>
                        <Image 
                        src={link.imgUrl} 
                        alt={link.label} width={24} height={24} />

                       <p className='text-lg font-semibold max-lg:hidden'>
                         {link.label}
                       </p>
                    </Link>
                )       
              })
            }
        </div>
    </section>
  )
}

export default Sidebar