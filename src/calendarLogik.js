


const today = new Date().getDate()
const thisMonth = new Date().getMonth()
const monthDays = thisMonth % 2 === 0 ? 30 : 31

const showWeekCell = (props) => {

    const { day, events, dayDate } = props


    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.month-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }

    let dayEvent = events.filter(event => event.date === dayDate)

    if (dayEvent?.length > 0) document.getElementById('month-calendar-container').innerHTML += `<span class="month-calendar-day">${day}<p>${dayEvent[0].title}</p></span>`
    else { document.getElementById('month-calendar-container').innerHTML += `<span class="month-calendar-day">${day}</span>` }
}


const showMonthCalendar = (events) => {

    document.getElementById('month-calendar-container').innerHTML = ""

    for (let j = 1; j < monthDays; j++) {

        let monthDate = thisMonth < 10 ? '0' + `${(thisMonth + 1)}` : thisMonth + 1

        let dayDate = j < 10 ? '0' + j : j

        showWeekCell({
            events: events.length > 0 ? events : [],
            thisDay: today,
            dayDate: `2025-${monthDate}-${dayDate}`,
            day: j
        })
    }
}

export { showMonthCalendar }