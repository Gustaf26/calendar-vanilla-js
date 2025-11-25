import { useState, useEffect } from 'react'

import { loadDb } from '../db/db'
// import { showMonthCalendar } from './calendarLogik'
import { createEvent, deleteEvent, updateEvent, fetchEvents } from '../db/dbActions'

import { Modal } from './Modal'

import type { Event } from '../types/GeneralTypes'

import { Database } from '@sqlitecloud/drivers'

// Some global variables of use in the functions
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']


// Function to get the db object from SQLite cloud
const db: Database = await loadDb()

const thisMonth: number = new Date().getMonth()

export default function App() {

    const [openModal, setOpenModal] = useState(false)
    const [events, setEvents] = useState([] as Event[])


    // Main functions to interact with db from dbActions module
    const dbAction = async (action: string, eventInfo: { db: Database, eventTitle: string, eventPlace: string, eventDate: string, id: number }) => {

        const { db, eventTitle, eventPlace, eventDate, id } = eventInfo

        switch (action) {
            case ('fetch'):
                return await fetchEvents(db)
            case ('create'):
                await createEvent(db, eventTitle, eventPlace, eventDate)
                break
            case ('update'):
                await updateEvent(db, eventTitle, eventPlace, eventDate, id)
                break
            case ('delete'):
                await deleteEvent(db, id)
        }
    }

    useEffect(() => {
        // Main function to fetch events from db
        const getEvents = async () => {

            const events = await dbAction('fetch', { db, eventTitle: '', eventPlace: '', eventDate: '', id: 0 })

            let monthEvents
            if (events && events instanceof Array) {
                monthEvents = events.filter((event: Event) => new Date(event.date).getMonth() === thisMonth)
                setEvents(monthEvents)
            }
        }

        getEvents()

    }, [])

    // Close modal function
    const closeModal = async () => {

        setOpenModal(false)

    }



    // Function to delete from db
    // const deleteFromDb = async (id) => {



    // Function to render the UI after every change
    // const updateUIEvents = (events) => {


    //     // Eevent listeners for the update / delete icons
    //     setTimeout(() => {
    //         let allDeleteIcons = document.querySelectorAll('.icon-delete')

    //         allDeleteIcons.forEach(icon => {
    //             icon.addEventListener('click', (e) => {
    //                 let id = e.target.parentElement.id
    //                 let eventToDeleteId = id.slice(0, id.indexOf('-'))
    //                 deleteFromDb(eventToDeleteId)
    //             })
    //         })
    //     }, 2000)

    //     setTimeout(() => {

    //         let allUpdateIcons = document.querySelectorAll('.icon-update')

    //         allUpdateIcons.forEach(icon => {
    //             icon.addEventListener('click', (e) => {

    //                 let id = e.target.parentElement.id
    //                 let eventToUpdateId = id.slice(0, id.indexOf('-'))

    //                 showModal(eventToUpdateId)
    //             }, { once: false })
    //         }, 2000)
    //     })
    // }


    // Rendering code that just adds a main component to the UI
    return (<aside>
        <h2>This Month´s Events</h2>
        <ul id="events-list">{events && events.map((event: Event) => <li>
            <p>
                <em>{event.title}</em>
            </p>
            {event.place}
            <p id="dayEvent">
                <span className="icon-delete" id="${event.id}-delete">
                    <i className="fa-solid fa-trash"></i>
                </span>
                <span className="icon-update" id="${event.id}-update">
                    <i className="fa-solid fa-pen"></i>
                </span>
            </p>
        </li>)}
        </ul>
        <button onClick={() => setOpenModal(true)}>+</button>
        <section>
            <h2>{months[new Date().getMonth()]}</h2>
            <div id="month-calendar-container">
            </div>
        </section>
        {openModal && <Modal openModal={openModal} db={db} events={events} closeModal={closeModal} />}
    </aside>)
}