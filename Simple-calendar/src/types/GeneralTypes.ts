// import { Database } from '@sqlitecloud/drivers'

export interface Event { id: number, title: string, place: string, date: string }
// export interface Db {
//     loadDb: () => Promise<[{ id: number, title: string, place: string, date: string }]>;
//     createEvent: (title: string, place: string, date: string) => Promise<string>;
//     deleteEvent: (id: number) => Promise<string>;
//     updateEvent: (id: number, title: string, place: string, date: string) => Promise<string>;
//     fetchEvents: () => Promise<Event[]>;
//     sql: Database['sql'];
// }