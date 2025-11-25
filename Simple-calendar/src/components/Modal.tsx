import React, { useState, useEffect } from "react"

import { Database } from "@sqlitecloud/drivers"
import type { Event } from "../types/GeneralTypes.ts"

import { createEvent } from "../db/hooks/dbActions.ts"

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


    const saveEvent = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        // Update db according to action
        const result = await createEvent(props.db, eventData.title, eventData.place, eventData.date)
        console.log(result)

        // Update the UI after every change in db
        props.closeModal()
    }

    return (
        <div id="modal" {...props} >
            {props.openModal && (<><span id="close-event-on-creation" onClick={props.closeModal}>X</span>
                <h3>Create Event</h3>
                <form onSubmit={saveEvent} id="create-event-form">
                    <label htmlFor="title">Title</label>
                    <input id="title" onChange={(e) => { setEventData({ ...eventData, title: e.target.value }) }} name="title" type="text" placeholder="Enter a title" required value={eventData.title} />
                    <label htmlFor="title">Place</label>
                    <input id="place" onChange={(e) => { setEventData({ ...eventData, place: e.target.value }) }} name="place" type="text" placeholder="Enter a place" value={eventData.place} required />
                    <label htmlFor="date">Date</label>
                    <input id="date" onChange={(e) => { setEventData({ ...eventData, date: e.target.value }) }} name="date" type="date" required value={eventData.date} />
                    <button>Submit</button>
                </form></>)}
        </div>
    )

}