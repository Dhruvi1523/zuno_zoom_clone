'use client'
import useGetCalls from '@/hooks/useGetCall'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

import MeetingCard from './MeetingCard';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function CallList({ type }: { type: 'upcoming' | 'previous' | 'recordings' }) {

    const { upcomingCalls, previousCalls, callRecordings, isCallLoading } = useGetCalls();


    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case 'upcoming':
                return upcomingCalls
            case 'previous':
                return previousCalls
            case 'recordings':
                return recordings
            default:
                return []
        }
    }

    const getNoCallMessage = () => {
        switch (type) {
            case 'upcoming':
                return 'No Upcoming Calls'
            case 'previous':
                return 'No Previous Calls'
            case 'recordings':
                return 'No Recordings'
            default:
                return ''
        }
    }

    useEffect(() => {

        const getRecordings = async () => {

            try {



                const callData = await Promise.all(
                    callRecordings?.map(
                        (meeting) => {
                            return meeting.queryRecordings()
                        }) ?? [])

                const allRecordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);


                setRecordings(allRecordings)

            } catch (error) {
                toast.error('Try again Later')
                console.log("Error in fetching recordings\n", error)
            }
        }

        if (type === 'recordings') {
            getRecordings();
        }
    }, [type, callRecordings])

    if (isCallLoading) return <Loader />

    const call = getCalls();
    const noCallMessage = getNoCallMessage();

  

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {
                call.length > 0 ?
                    call.map((meeting) => (
                        <MeetingCard
                            key={(meeting as Call).id || (meeting as CallRecording).session_id}
                            icon={
                                type == 'upcoming' ?
                                    `/assets/upcoming.svg` :
                                    type == 'previous' ?
                                        `/assets/previous.svg` :
                                        `/assets/recordings.svg`
                            }
                            title={
                                (meeting as Call).state?.custom.description ||
                                (meeting as CallRecording).filename?.substring(0, 20) ||
                                'No description'
                            }
                            date={(meeting as Call).state?.startsAt?.toLocaleString() ||
                                new Date((meeting as CallRecording).start_time).toLocaleString() ||
                                'No date'}
                            isPreviousMeeting={
                                type === 'previous' ? true : false
                            }
                            buttonIcon1={
                                type == 'recordings' ? '/assets/play.svg' : '/assets/join-meeting.svg'
                            }
                            handleClick={
                                type == 'recordings' ?
                                    () => { router.push((meeting as CallRecording).url) }
                                    : () => {
                                        router.push(`/meeting/${(meeting as Call).id}`)
                                    }
                            }
                            link={
                                type == 'recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                            }
                            buttonText={
                                type == 'recordings' ? 'Play' : 'Start'
                            }
                        />))
                    : noCallMessage
            }
        </div>
    )
}

export default CallList