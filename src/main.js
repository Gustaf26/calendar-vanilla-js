import { loadDb } from './db/db'
import { showMonthCalendar } from './calendarLogik'
import { createEvent } from './createEvent'
import { deleteEvent } from './deleteEvent'
import { updateEvent } from './updateEvent'

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const thisMonth = new Date().getMonth()
const today = `2025-${thisMonth.length > 1 ? thisMonth : '0' + thisMonth}-${new Date().getDate()}`

// Function to get the db object from SQLite cloud
const db = await loadDb()


// Close modal function
const closeModal = async () => {

  document.getElementById('modal').innerHTML = ""
  document.getElementById('modal').classList.add('invisible')

}

// Functkon to show modal with create / update functionality
const showModal = async (id = 'none') => {

  let title, date, place = ""

  let events

  if (id !== 'none') {

    events = await db.sql("SELECT * FROM events");

    let eventToUpdateData = events.filter(event => event.id === Number(id))

    title = eventToUpdateData[0].title
    date = eventToUpdateData[0].date
    place = eventToUpdateData[0].place

  }

  document.getElementById('modal').classList.remove('invisible')

  document.getElementById('modal').innerHTML += `
      <span id="close-event-on-creation" onclick="closeModal()">X</span>
      <h3>Create Event</h3>
      <form id="create-event-form">
        <label for="title">Title</label>
        <input name="title" type="text" placeholder="Enter a title" required value='${title ?? " "}' />
        <label for="title">Place</label>
        <input name="place" type="text" placeholder="Enter a place" value='${place ?? " "}' required />
        <label for="date">Date</label>
        <input name="date" type="date" required value='${date ?? today}' />
        <button>Submit</button>
      </form>`

  setTimeout(() => {
    document.getElementById('create-event-form').addEventListener('submit', async (e) => {
      e.preventDefault()

      let eventTitle = e.target[0].value
      let eventPlace = e.target[1].value
      let eventDate = e.target[2].value

      if (id === 'none') await createEvent(db, eventTitle, eventPlace, eventDate)
      else await updateEvent(db, eventTitle, eventPlace, eventDate, id)
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
                                  </section>
                                  <div id="modal" class="invisible"></div>`


// Function to delete from db
const deleteFromDb = async (id) => {

  let deleteMsg = await deleteEvent(db, id)

  showMonthCalendar(await getEvents())

}

// Function to render the UI after every change
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
  }, 2000)

  setTimeout(() => {

    console.log('UI updated')
    let allUpdateIcons = document.querySelectorAll('.icon-update')

    allUpdateIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {

        let id = e.target.parentElement.id
        let eventToUpdateId = id.slice(0, id.indexOf('-'))

        showModal(eventToUpdateId)
      }, { once: false })
    }, 2000)
  })
}



// Main function to fetch events from db
const getEvents = async () => {

  const events = await db.sql("SELECT * FROM events");

  const monthEvents = events.filter(event => new Date(event.date).getMonth() === thisMonth)

  updateUIEvents(monthEvents)

  return monthEvents
}


showMonthCalendar(await getEvents())

// Theses two declarations attach the functions to the window object so they are to be reached by the html file
window.showModal = showModal
window.closeModal = closeModal