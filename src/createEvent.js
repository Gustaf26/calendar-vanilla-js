

export async function createEvent(db, title, place, date) {

    console.log(title, place, date)

    db.run("INSERT INTO events (id, date, place, title) VALUES (?, ?, ?, ?)", [Math.floor(Math.random(0, 10000)), date, place, title]);;

}