import { loadDb } from './db/db'
import { showMonthCalendar } from './calendarLogik'
import { createEvent } from './createEvent'
import { deleteEvent } from './deleteEvent'

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
    document.getElementById('create-event-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      let eventTitle = e.target[0].value
      let eventPlace = e.target[1].value
      let eventDate = e.target[2].value

      await createEvent(db, eventTitle, eventPlace, eventDate)
      closeModal()
      showMonthCalendar(await getEvents())
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

const deleteFromDb = async (id) => {

  let deleteMsg = await deleteEvent(db, id)

  console.log(deleteMsg)

  showMonthCalendar(await getEvents())

}


const updateUIEvents = (events) => {

  document.getElementById('events-list').innerHTML = ""

  events.forEach(event => {
    let eventMonth = new Date(event.date).getMonth()
    if (eventMonth === thisMonth) document.getElementById('events-list').innerHTML += `<li>
                                                                            <p><em>${event.title}</em></p>
                                                                            ${event.place}
                                                                            <p id="dayEvent">
                                                                                <span class="icon-delete" id="${event.id}-delete"><i class="fa-solid fa-trash"></i></span>
                                                                                <span class="icon-update" id="${event.id}-update"><i class="fa-solid fa-pen"></i></span>
                                                                             </p>
                                                                             </li>`
  })

  setTimeout(() => {
    let allDeleteIcons = document.querySelectorAll('.icon-delete')

    allDeleteIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        let id = e.target.parentElement.id
        let eventToDeleteId = id.slice(0, id.indexOf('-'))
        deleteFromDb(eventToDeleteId)
      })
    })
  }, 1000);
}

// showContacts()

const getEvents = async () => {
  // Hämta alla rader
  const events = await db.sql("SELECT * FROM events");

  const monthEvents = events.filter(event => new Date(event.date).getMonth() === thisMonth)

  updateUIEvents(monthEvents)

  return monthEvents
}


showMonthCalendar(await getEvents())

window.showModal = showModal
window.closeModal = closeModal