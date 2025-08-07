'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import useGetCalls from '@/hooks/useGetCall';
import { format, toZonedTime  } from 'date-fns-tz';

const Home = () => {
  const now = new Date();
  const { upcomingCalls } = useGetCalls();
  const timeZone = 'Asia/Kolkata';

  const time = format(now, 'hh:mm a');      
  const date = format(now, 'PPPP');

  const startsAt = upcomingCalls[0]?.state?.startsAt;
  const formattedStartsAT =
    startsAt &&
    format(
      toZonedTime(new Date(startsAt), timeZone),
      'PPP · hh:mm a',
      { timeZone }
    );

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-[url('/assets/hero-background.png')] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[430px] rounded py-2 text-center text-base font-normal sm:text-wrap">
            Upcoming Meeting at: &nbsp;
            <span className="font-bold text-white">
              {formattedStartsAT}
            </span>
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-[#C9DDFF] lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;