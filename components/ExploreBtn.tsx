'use client';

import Image from 'next/image';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  return (
    <button
      type='button'
      id='explore-btn'
      className='mt-7 mx-auto'
      onClick={() =>
        posthog.capture('events_explored', {
          source: 'home_hero',
          destination: 'featured_events',
        })
      }
    >
      <a href='#events'>
        Explore Events
        <Image
          src='/icons/arrow-down.svg'
          alt='arrow-down'
          width={24}
          height={24}
          style={{ height: 'auto' }}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;
