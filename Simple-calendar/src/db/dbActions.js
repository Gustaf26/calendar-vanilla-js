
export async function fetchEvents(db) {

    let events = await db.sql("SELECT * FROM events");
    return events
}


export async function createEvent(db, title, place, date) {

    db.sql(`INSERT INTO events (date, place, title) VALUES ('${date}', '${place}', '${title}')`)

}


export async function deleteEvent(db, id) {

    let result = await db.sql(`DELETE FROM events WHERE id = ${Number(id)}`)

    if (result[0].CHANGES) return 'Event succesfully deleted'
    else return 'Something went wrong'

}

export async function updateEvent(db, title, place, date, id) {

    let result = await db.sql(`UPDATE events SET title = '${title}', place = '${place}', date = '${date}'  WHERE id = ${Number(id)}`)

}
