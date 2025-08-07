'use client'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { LayoutList, Users } from 'lucide-react';
import Loader from './Loader';
import EndCallButton from './EndCallButton';

type layoutTypes = 'speaker-left' | 'speaker-right' | 'grid'

function MeetingRoom() {

    const searchParams = useSearchParams();
    const personal = searchParams.get('personal');
    const isPersonalRoom = !!personal

    const [layout, setLayout] = useState('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false)

    const router = useRouter()

    

    const CallLayout = () => {
        switch (layout) {
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={'right'} />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'left'} />
            case 'grid':
                return <PaginatedGridLayout />
            default:
                return 'speaker-left'
        }
    }

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState ();

    if(callingState != CallingState.JOINED) return <Loader />

    return (
        <section className="relative h-[calc(100vh-86px)] w-full overflow-hidden pt-4  text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={`h-[calc(100vh-86px)] ml-2 
                        ${showParticipants ? 'block' : 'hidden'}
                        `}
                >
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap py-5">
                <CallControls onLeave={() => { router.push('/') }} />
                <DropdownMenu>
                    <div className="flex items-center" >
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-[#1C1F2E] bg-[#1C1F2E] ">
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    className='text-white hover:bg-[#4c535b]'
                                    onClick={() =>
                                        setLayout(item.toLowerCase() as layoutTypes)
                                    }
                                >
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#1C1F2E]" />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                        <Users size={20} className="text-white" />
                    </div>
                </button>
                {!isPersonalRoom &&  <EndCallButton/>}
            </div>
            
        </section>
    )
}

export default MeetingRoom