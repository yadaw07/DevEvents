export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: 'React Summit 2026',
    image: '/images/event1.png',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: '2026-09-14',
    time: '09:00 AM',
  },
  {
    title: 'Next.js Conf',
    image: '/images/event2.png',
    slug: 'nextjs-conf',
    location: 'San Francisco, CA',
    date: '2026-10-22',
    time: '10:00 AM',
  },
  {
    title: 'JSNation Africa',
    image: '/images/event3.png',
    slug: 'jsnation-africa',
    location: 'Addis Ababa, Ethiopia',
    date: '2026-08-05',
    time: '08:30 AM',
  },
  {
    title: 'TypeScript Congress',
    image: '/images/event4.png',
    slug: 'typescript-congress',
    location: 'Berlin, Germany',
    date: '2026-11-03',
    time: '09:30 AM',
  },
  {
    title: 'DevOps Days',
    image: '/images/event5.png',
    slug: 'devops-days',
    location: 'London, UK',
    date: '2026-09-28',
    time: '11:00 AM',
  },
  {
    title: 'AI Builders Meetup',
    image: '/images/event6.png',
    slug: 'ai-builders-meetup',
    location: 'Nairobi, Kenya',
    date: '2026-12-01',
    time: '02:00 PM',
  },
];
