

export async function createEvent(db, title, place, date) {

    db.sql(`INSERT INTO events (date, place, title) VALUES ('${date}', '${place}', '${title}')`)

}