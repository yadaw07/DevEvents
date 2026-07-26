import EventsList from '@/components/EventsList';
import { Suspense } from 'react';

const Loader = () => (
  <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
    <div className='h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin' />
    <p className='text-lg text-gray-500'>Loading events...</p>
  </div>
);

const Home = async () => {
  return (
    <main>
      {/* Lets you display a fallback until its children have finished loading */}
      <Suspense fallback={<Loader />}>
        <EventsList />
      </Suspense>
    </main>
  );
};

export default Home;
