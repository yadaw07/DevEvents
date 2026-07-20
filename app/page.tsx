import Hello from '@/app/components/Hello';

const Home = () => {
  console.log('Server or Client side?');
  return (
    <main>
      <div className='text-4xl underline uppercase'>
        Welcome to home the page
      </div>
      <Hello />
    </main>
  );
};

export default Home;
