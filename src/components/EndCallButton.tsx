import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function EndCallButton() {
    const call = useCall();

    if (!call)
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );
        
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipansts = useLocalParticipant();
    const router = useRouter();

    const isMeetingOwner = call?.state.createdBy?.id === localParticipansts?.userId

    const endCall = async () => {
        await call?.endCall();
        router.push('/');
    }

    if (!isMeetingOwner) return null

    return (
        <Button onClick={endCall} className="bg-red-500">
            End call for everyone
        </Button>
    )

}

export default EndCallButton