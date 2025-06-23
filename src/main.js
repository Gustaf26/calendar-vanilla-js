import { loadDb } from './db/db'
import { showMonthCalendar } from './calendarLogik'
import { createEvent } from './createEvent'

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const thisMonth = new Date().getMonth()

const closeModal = () => {

  document.getElementById('modal').remove()

}

const showModal = () => {
  document.getElementById('app').innerHTML += `<div id="modal">
  <span id="close-event-on-creation" onclick="closeModal()">X</span>
  <h3>Create Event</h3>
  <form id="create-event-form">
  <label for="title">Title</label>
  <input name="title" type="text" placeholder="Enter a title" required/>
   <label for="title">Place</label>
  <input name="place" type="text" placeholder="Enter a place" required/>
  <label for="date">Date</label>
  <input name="date" type="date" required/>
  <button>Submit</button>
  </form>
  </div>`

  setTimeout(() => {
    document.getElementById('create-event-form').addEventListener('submit', (e) => {
      e.preventDefault()
      let eventTitle = e.target[0].value
      let eventPlace = e.target[1].value
      let eventDate = e.target[2].value

      createEvent(eventTitle, eventPlace, eventDate)
    })
  }, 2000)
}

document.getElementById('app').innerHTML = `<aside>
                                  <h2>This Month´s Events</h2>
                                  <ul id="events-list"></ul>
                                  <button onclick="showModal()">+</button>
                                  </aside>
                                  <section>
                                    <h2>${months[new Date().getMonth()]}</h2>
                                    <div id="month-calendar-container">
                                    </div>
                                  </section>`


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

window.showModal = showModal
window.closeModal = closeModal