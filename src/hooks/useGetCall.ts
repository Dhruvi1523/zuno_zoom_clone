import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import  { useEffect, useState } from 'react'

export default function useGetCalls() {

    const client = useStreamVideoClient();
    const { user } = useUser();
    const [isCallLoading, setIsCallLoading] = useState(false);
    const [calls, setCalls] = useState<Call[]>([]);
    useEffect(() => {

        const loadCall = async () => {
            if (!client || !user) return;
            setIsCallLoading(true);
            try {
                const response = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ],
                    },
                });


                if (response?.calls?.length > 0) {
                    setCalls(response.calls);
                }
            } catch (error) {
                console.log("Error in geting calls \n", error)
            } finally {
                setIsCallLoading(false);
            }
        }
        loadCall();
    }, [client, user])


    const now = new Date();

    const previousCalls = calls.filter(
        ({ state: { startsAt, endedAt } }: Call) => {
            return (startsAt && new Date(startsAt) < now) || !!endedAt
        }
    )

    const upcomingCalls = calls.filter(
        ({ state: { startsAt } }: Call) => {
            return (startsAt && new Date(startsAt) > now)
        }
    );


    return { isCallLoading, callRecordings: calls, upcomingCalls, previousCalls }
}