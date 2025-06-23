import { loadDb } from './db/db'
import { showMonthCalendar } from './calendarLogik'

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const thisMonth = new Date().getMonth()

document.getElementById('app').innerHTML = `<aside>
                                  <h2>This Month´s Events</h2>
                                  <ul id="events-list"></ul>
                                  </aside>
                                  <section>
                                    <h2>${months[new Date().getMonth()]}</h2>
                                    <div id="month-calendar-container">
                                    </div>
                                  <section>`

const db = await loadDb()

const updateUIEvents = (events) => {
  events.forEach(event => {
    let eventMonth = new Date(event.date).getMonth()
    if (eventMonth === thisMonth) document.getElementById('events-list').innerHTML += `<li><p><i>${event.title}</i><p>${event.place}</li>`
  })
}

// showContacts()

const getEvents = () => {
  // Hämta alla rader
  const result = db.exec("SELECT * FROM events");

  // Formatera resultatet mer läsbart
  const events = result[0].values.map(row =>
    Object.fromEntries(result[0].columns.map((col, i) => [col, row[i]]))
  );

  const monthEvents = events.filter(event => new Date(event.date).getMonth() === thisMonth)

  updateUIEvents(monthEvents)

  return events
}


showMonthCalendar(getEvents())
