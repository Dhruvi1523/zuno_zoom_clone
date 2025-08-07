import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

function useGetCallById(id: string | string[]) {

    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();
    useEffect(() => {

        if(!client) return ;

        const loadCall = async () => {
            try {
                const response = await client?.queryCalls({ filter_conditions: { id } })

                if (response?.calls && response.calls.length > 0) {
                    setCall(response.calls[0]);
                }
            } catch (error) {
                console.log("Error in gettin call by id\n", error)
            } finally {
                setIsCallLoading(false);
            }


        }

        loadCall();


    }, [client , id])

    return { call, isCallLoading }

}

export default useGetCallById