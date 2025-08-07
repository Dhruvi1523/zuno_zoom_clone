'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import useGetCallById from '@/hooks/useGetCallById'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function Meeting({ params }: { params: Promise<{ id: string }> }) {
  const {id} =   useParams()

 if(!id){
    throw Error("Id is required")
 }

  const [isSetupComplete , SetIsSetupComplete] = useState(false);
  const {call , isCallLoading} = useGetCallById(id)
  console.log(call)
  
  if(isCallLoading) return <Loader/>
  // if(!call) return console.log('callnotdefinepage')

  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
        {
          !isSetupComplete ? <MeetingSetup SetIsSetupComplete={SetIsSetupComplete}/> : <MeetingRoom/>
        }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting