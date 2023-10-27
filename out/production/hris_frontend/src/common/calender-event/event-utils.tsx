import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export const INITIAL_EVENTS: EventInput[] = [
   // {
   //    id: createEventId(),
   //    title: 'All-day event',
   //    start: '2023-04-18',
   // },
   // BG events
   // {
   //    start: ym + '-24',
   //    end: ym + '-28',
   //    overlap: false,
   //    display: 'background'
   //  },
   //  {
   //    title: 'Two days event',
   //    start: ym + '-06',
   //    end: ym + '-08',
   //    // overlap: false,
   //    // display: 'background'
   //  },
];

export function createEventId() {
   return String(eventGuid++);
}
