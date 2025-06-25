

export async function deleteEvent(db, id) {

    let result = await db.sql(`DELETE FROM events WHERE id = ${Number(id)}`)

    if (result[0].CHANGES) return 'Event succesfully deleted'
    else return 'Something went wrong'

}