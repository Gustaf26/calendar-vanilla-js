import { loadDb } from './db/db'
import { showMonthCalendar } from './calendarLogik'

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

document.getElementById('app').innerHTML = `<aside>
                                  <h2>My Contacts</h2>
                                  <ul id="contacts-list"></ul>
                                  </aside>
                                  <section>
                                    <h2>${months[new Date().getMonth()]}</h2>
                                    <div id="month-calendar-container">
                                    </div>
                                  <section>`

const db = await loadDb()

const showContacts = async () => {

  // Hämta alla rader
  const result = db.exec("SELECT * FROM persons");

  // Formatera resultatet mer läsbart
  const contacts = result[0].values.map(row =>
    Object.fromEntries(result[0].columns.map((col, i) => [col, row[i]]))
  );

  contacts.forEach(contact => {
    document.getElementById('contacts-list').innerHTML += `<li>${contact.name}</li>`
  })

}

showContacts()

const getEvents = () => {
  // Hämta alla rader
  const result = db.exec("SELECT * FROM events");

  // Formatera resultatet mer läsbart
  const events = result[0].values.map(row =>
    Object.fromEntries(result[0].columns.map((col, i) => [col, row[i]]))
  );

  return events
}


showMonthCalendar(getEvents())
