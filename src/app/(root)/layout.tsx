import { StreamVideoClientProvider } from '@/provider/streamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ZUNO",
  description: "Video Calling App",
  icons:'/assets/icon.png'
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoClientProvider>
        {children}
      </StreamVideoClientProvider>
    </main>
  )
}

export default RootLayout