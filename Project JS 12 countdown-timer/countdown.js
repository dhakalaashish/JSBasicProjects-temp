const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector('.giveaway');
const items = document.querySelectorAll('.deadline-format h4');

let temporaryDate = new Date();
let tempYear = temporaryDate.getFullYear();
let tempMonth = temporaryDate.getMonth()
let tempDate = temporaryDate.getDate()

// let futureDate = new Date(2021, 9, 15, 11, 30, 0);
//months are zero-index based ---> so 00=Jan,01=feb,02=march,03=april,04=may
let futureDate = new Date(tempYear, tempMonth, tempDate + 10, 24, 00, 00)

//extracting values from future date

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

let month = futureDate.getMonth()
month = months[month];

const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];


giveaway.textContent = `giveaway Ends on ${weekday}, ${date} ${month} ${year} ${hours}:${mins}am`

//future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const currentTime = new Date().getTime();
    const t = futureTime - currentTime;
    console.log(t)
    // 1s = 1000ms
    //1min = 60s
    //1hr =60min
    //1day = 24hr

    //values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;
    const numDays = Math.floor(t / oneDay);
    const numHours = Math.floor((t - (numDays * oneDay)) / oneHour)
    const numMins = Math.floor((t - (numDays * oneDay + numHours * oneHour)) / oneMinute)
    const numSecs = Math.floor((t - (numDays * oneDay + numHours * oneHour + numMins * oneMinute)) / oneSecond)

    items.forEach((item) => {
        if (item.classList.contains('days')) {
            item.textContent = `${numDays}`
        }
        if (item.classList.contains('hours')) {
            item.textContent = `${numHours}`
        }
        if (item.classList.contains('minutes')) {
            item.textContent = `${numMins}`
        }
        if (item.classList.contains('seconds')) {
            item.textContent = `${numSecs}`
        }
    })
}
setInterval(getRemainingTime, 1000)



//bascially I need to know the new Date(), function and getTime()