import React, { useState, useEffect } from "react"

import { Database } from "@sqlitecloud/drivers"
import type { Event } from "./GeneralTypes"

type ModalProps = { db: Database, openModal: boolean, events: Event[], closeModal: () => void }

// const thisMonth: number = new Date().getMonth()
// const today = `2025-${thisMonth}-${new Date().getDate()}`

export function Modal(props: ModalProps): React.ReactElement {

    const [eventData, setEventData] = useState({ id: 0, title: '', place: '', date: '' })

    useEffect(() => {
        const showModal = async (id = 0) => {

            let title, date, place = ""

            let events

            if (id !== 0) {

                events = await props.db.sql("SELECT * FROM events");

                const eventToUpdateData = events.filter((ev: Event) => ev.id === Number(id))

                title = eventToUpdateData[0].title
                date = eventToUpdateData[0].date
                place = eventToUpdateData[0].place

                setEventData({ id, title, place, date })
            }
        }
        showModal()

    }, [])


    // const form = document.getElementById('create-event-form') as HTMLFormElement

    // setTimeout(() => {
    //     form.addEventListener('submit', async (e: SubmitEvent) => {
    //         e.preventDefault()

    //         const target = e.target as EventTarget


    //         const eventTitle = target[0]?.value
    //         const eventPlace = target[1]?.value
    //         const eventDate = target[2]?.value

    //         // Update db according to action
    //         if (id === 0) dbAction('create', { db, eventTitle, eventPlace, eventDate, id: 0 })
    //         else dbAction('update', { db, eventTitle, eventPlace, eventDate, id })

    //         // Update the UI after every change in db
    //         closeModal()
    //         showMonthCalendar(await getEvents())
    //     })
    // }, 2000


    return (
        <div id="modal" {...props} >
            {props.openModal && (<><span id="close-event-on-creation" onClick={props.closeModal}>X</span>
                <h3>Create Event</h3>
                <form id="create-event-form">
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" placeholder="Enter a title" required value={eventData.title} />
                    <label htmlFor="title">Place</label>
                    <input id="place" name="place" type="text" placeholder="Enter a place" value={eventData.place} required />
                    <label htmlFor="date">Date</label>
                    <input id="date" name="date" type="date" required value={eventData.date} />
                    <button>Submit</button>
                </form></>)}
        </div>
    )

}