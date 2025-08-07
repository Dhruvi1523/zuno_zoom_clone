'use client'
import { DeviceSettings, useCall, useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import Alert from './Alert';

function MeetingSetup({ SetIsSetupComplete }: { SetIsSetupComplete: (value: boolean) => void }) {

    const { useCallStartsAt, useCallEndedAt } = useCallStateHooks();
    const callStartsAt = useCallStartsAt();
    const callEndedAt = useCallEndedAt();

    const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date()
    const callHasEnded = callEndedAt && new Date(callEndedAt) < new Date()

    const [isMicCamOff, setIsMicCamToggled] = useState(false)
    const call = useCall();

    useEffect(() => {
          if (!call) return console.log("call undefine");
        if (isMicCamOff) {
            call?.camera?.disable();
            call?.microphone?.disable();
        } else {
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isMicCamOff, call?.camera, call?.microphone])

    if (callHasEnded) {
        return <Alert
            title="The call has been ended by the host"
            iconUrl="/assets/call-ended.svg"
            callTimeNotArrived = {false}
        />
    }

    if (callTimeNotArrived) {
        return <Alert
              title={`Meeting will be started in`}
              callTimeNotArrived = {true}
              callStartsAt={callStartsAt}
        />
    }

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white '>
            <h1 className="text-center text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamOff}
                        onChange={(e) => setIsMicCamToggled(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call?.join();
                    SetIsSetupComplete(true);
                }}>
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup