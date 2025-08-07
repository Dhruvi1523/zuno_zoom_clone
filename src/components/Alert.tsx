import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface PermissionCardProps {
    title: string;
    iconUrl?: string;
    callTimeNotArrived: boolean;
    callStartsAt?: Date
}

const Alert = ({ title, iconUrl, callTimeNotArrived, callStartsAt }: PermissionCardProps) => {
    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
             <p className="text-center text-2xl font-semibold text-white">Meeting has been started</p>
            window.location.reload()
        } else {
            return (
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-3xl font-bold text-white">{days}</p>
                        <p className="text-sm text-white">Days</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">{hours}</p>
                        <p className="text-sm text-white">Hours</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">{minutes}</p>
                        <p className="text-sm text-white">Minutes</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">{seconds}</p>
                        <p className="text-sm text-white">Seconds</p>
                    </div>
                </div>
            );
        }
    }
    return (
        <section className="flex justify-center items-center h-screen w-full">
            <Card className="w-full max-w-[520px] border-none bg-[#1C1F2E] p-6 py-9 text-white">
                <CardContent>
                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            {iconUrl && (
                                <div className="flex justify-center items-center">
                                    <Image src={iconUrl} width={72} height={72} alt="icon" />
                                </div>
                            )}

                            <p className="text-center text-2xl font-semibold text-white">{title}</p>
                            {
                                callTimeNotArrived && (
                                    <div className="flex flex-col items-center justify-center p-4 bg-[#1C1F2E] max-w-md mx-auto animate-fade-in">
                                     
                                        <Countdown
                                            date={callStartsAt}
                                            renderer={renderer}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <Button asChild className="bg-[#0E78F9]">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default Alert;