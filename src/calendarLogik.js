

const weekDays = 35
const today = new Date().getDate()
const thisMonth = new Date().getMonth()

const showWeekCell = (props) => {

    const { day, dayNr, events, dayDate, thisDay, actualMonth, eventElement, setEventElement } = props


    let mondays = [0, 7, 14, 21, 28]
    let tuesdays = mondays.map(day => day + 1)
    let wednesdays = tuesdays.map(day => day + 1)
    let thursdays = wednesdays.map(day => day + 1)
    let fridays = thursdays.map(day => day + 1)
    let saturdays = fridays.map(day => day + 1)
    let sundays = saturdays.map(day => day + 1)

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.month-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }

    document.getElementById('month-calendar-container').innerHTML += `<span class="month-calendar-day">${day}</span>`
}


const showMonthCalendar = (events) => {


    let allWeekdays = []
    let dayNumber = 0

    for (let j = 0; j < weekDays; j++) {

        showWeekCell({
            events: events.length > 0 ? events : [],
            thisDay: today,
            dayNr: (dayNumber >= 1) && (dayNumber <= preliminaryMonthDays) ? dayNumber : '',
            dayDate: 1,
            day: j
        })
    }
}

export { showMonthCalendar }