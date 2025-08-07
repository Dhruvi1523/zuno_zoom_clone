'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import Loader from './Loader';

import { Textarea } from './ui/textarea';
import DatePicker from 'react-datepicker';
import { Input } from './ui/input';

const intialValues = {
    datetime: new Date(),
    description: '',
    link: ''
}

function MeetingTypeList() {

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined);

    const router = useRouter();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const [values, setValues] = useState(intialValues)
    const [callDetails, SetCallDetails] = useState<Call>();

    const createMeeting = async () => {
        if (!client || !user) {
            toast("client or user missing")
            return;
        }
        try {

            if (!values.datetime) {
                toast.error('Please select a date and time')
            }

            const callId = crypto.randomUUID();
            const call = client.call('default', callId)

            const startAt = values.datetime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting'


            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })

            SetCallDetails(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
                toast.success('Meeting Created Successfully...')
            }
        } catch (error) {
            console.log("Error In Creating Meeting", error)
        }
    }

    if (!client || !user) return <Loader />;

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                className='bg-[#FF742E]'
                img='/assets/add-meeting.svg'
                title='New Meeting'
                description='start instant meeting'
                handleClick={() => { setMeetingState('isInstantMeeting') }}
            ></HomeCard>
            <HomeCard
                className='bg-[#0E78F9]'
                img='/assets/join-meeting.svg'
                title='Join Meeting'
                description='via invitation link'
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
            ></HomeCard>
            <HomeCard
                className='bg-[#830EF9]'
                img='/assets/schedule.svg'
                title='Schedule Meeting'
                description='Plan Your Meeting'
                handleClick={() => { setMeetingState('isScheduleMeeting') }}
            />
            <HomeCard
                className='bg-[#F9A90E]'
                img='/assets/recordings.svg'
                title='View Recordings'
                description='Meeting Recordings'
                handleClick={() => { router.push('/recordings') }}
            ></HomeCard>

            {
                !callDetails ?
                    (<MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Create Meeting"
                        className="text-center"
                        buttonText="Schedule Meeting"
                        handleClick={createMeeting}
                    >
                        <div className="flex w-full flex-col gap-2.5">
                            <label className="text-base font-normal leading-[22.4px] text-[#ECF0FF]">
                                Add a description
                            </label>
                            <Textarea
                                className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
                                onChange={(e) =>
                                    setValues({ ...values, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2.5">
                            <label className="text-base font-normal leading-[22.4px] text-[#ECF0FF]">
                                Select Date and Time
                            </label>
                            <DatePicker
                                selected={values.datetime}
                                onChange={(date) => setValues({ ...values, datetime: date! })}
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeCaption='time'
                                timeIntervals={15}
                                dateFormat={'MMMM d, yyyy h:mm aa'}
                                className="w-full rounded bg-[#252A41] p-2 focus:outline-none"
                            />
                        </div>
                    </MeetingModal>)
                    :
                    (<MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        className="text-center"
                        buttonText="Copy Meeting Link"
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink)
                            toast.success('Copied to clipboard')
                        }}
                        buttonIcon='/assets/copy.svg'
                        image='/assets/checked.svg'
                    ></MeetingModal>)
            }

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            ></MeetingModal>

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Paste Meeting Link to Join"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={() => { router.push(values.link) }}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>

        </section >



    )
}

export default MeetingTypeList