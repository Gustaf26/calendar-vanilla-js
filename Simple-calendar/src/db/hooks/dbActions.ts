import { Database } from '@sqlitecloud/drivers'
import type { Event } from '../../types/GeneralTypes'

export async function fetchEvents(db: Database) {

    try {
        const result: Event[] = await db.sql("SELECT * FROM events");
        if (result) return result
        else throw Error('Something went wrong')
    }
    catch (error) {
        return error
    }
}


export async function createEvent(db: Database, title: string, place: string, date: string,) {

    try {
        const result = await db.sql(`INSERT INTO events (date, place, title) VALUES ('${date}', '${place}', '${title}')`)


        console.log(result)
        if (result[0]?.lastID) return 'Event succesfully created'
        else throw Error('Something went wrong')

    } catch (error) {

        return error
    }

}


export async function deleteEvent(db: Database, id: number) {

    try {
        const result = await db.sql(`DELETE FROM events WHERE id = ${Number(id)}`)

        if (result[0].CHANGES) return 'Event succesfully deleted'
        else throw Error('Something went wrong')
    }
    catch (error) {
        return error
    }

}

export async function updateEvent(db: Database, title: string, place: string, date: string, id: number) {

    try {
        const result = await db.sql(`UPDATE events SET title = '${title}', place = '${place}', date = '${date}'  WHERE id = ${Number(id)}`)

        if (result[0].CHANGES) return 'Event succesfully updated'
        else throw Error('Something went wrong')
    }

    catch (error) {
        return error
    }

}
