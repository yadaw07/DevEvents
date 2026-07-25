'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';

interface props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: props) => {
  return (
    <Link
      href={`/events/${slug}`}
      id='event-card'
      onClick={() =>
        posthog.capture('event_selected', {
          event_slug: slug,
          event_date: date,
          source: 'featured_events',
        })
      }
    >
      <Image
        src={image}
        alt={title}
        className='poster'
        height={300}
        width={410}
        style={{ height: 'auto' }}
      />
      <div className='flex flex-row gap-2'>
        <Image
          src='/icons/pin.svg'
          alt='location'
          width={14}
          height={14}
          style={{ height: 'auto' }}
        />
        <p>{location}</p>
      </div>

      <p className='title'>{title}</p>

      <div className='datetime'>
        <div>
          <Image
            src='/icons/calendar.svg'
            alt='date'
            width={14}
            height={14}
            style={{ height: 'auto' }}
          />
          <p>{date}</p>
        </div>

        <div>
          <Image
            src='/icons/clock.svg'
            alt='date'
            width={14}
            height={14}
            style={{ height: 'auto' }}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
