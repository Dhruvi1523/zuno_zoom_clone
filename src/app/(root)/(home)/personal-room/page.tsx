'use client'
import { Button } from '@/components/ui/button';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import Image from 'next/image';

const Table = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-[#C9DDFF] lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  )
}
function PersonalRoom() {

  const { user } = useUser();
  const meetingId = user?.id
  const client = useStreamVideoClient();
  const router = useRouter();

  const { call, isCallLoading } = useGetCallById(user?.id!);

  const startRoom = async () => {
    if (!user || !client) return;

    if (!call) {
      try{
          const newCall = client.call('default', meetingId!);
         await newCall.getOrCreate({
                data: {
                    starts_at: new Date(Date.now()).toISOString(),
                    custom: {
                        description : 'personal room'
                    }
                }
            })
      }catch(error){
        console.log(error)
      }
    }

   
    router.push(`/meeting/${meetingId}?personal=true`)

  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`

  return (
    <section className='flex flex-col size-full text-white gap-10'>
      <h1 className='text-3xl font-bold'> Personal Room Page</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-10">
        <Button className="bg-[#0E78F9] px-5" onClick={startRoom}>
          <Image src='/assets/join-meeting.svg' alt="feature" width={15} height={15} />
          &nbsp; Start Meeting
        </Button>
        <Button
          className="bg-[#252A41] px-5"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.info("Link Copied");
          }}
        >
          <Image
            src="/assets/copy.svg"
            alt="feature"
            width={20}
            height={20}
          />
          &nbsp; Copy Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
