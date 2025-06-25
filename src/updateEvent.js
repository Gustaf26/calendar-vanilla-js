

export async function updateEvent(db, title, place, date, id) {

    let result = await db.sql(`UPDATE events SET title = '${title}', place = '${place}', date = '${date}'  WHERE id = ${Number(id)}`)

}