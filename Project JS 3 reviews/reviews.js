//local reviews data
const reviews = [
    {
        id: 1,
        name: 'shweta dhakal',
        job: 'trainer',
        img: 'user1.jpg',
        text: "I'm selfish, impatient and a little insecure.I make mistakes, I am out of control and at times hard to handle.But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    },
    {
        id: 2,
        name: 'maitreya dhungana',
        job: 'architect',
        img: 'user2.jpg',
        text: "It is not enough that we do our best; sometimes we must do what is required.",
    },
    {
        id: 3,
        name: 'louis mainwaring foster',
        job: 'philosopher',
        img: 'user3.jpg',
        text: "Drunken men give some of the best pep talks.",
    },
    {
        id: 4,
        name: 'saujanya wagle',
        job: 'digital marketing expert',
        img: 'user4.jpg',
        text: "To a hungry person, every bitter food is sweet. When the preferable is not available, the available becomes preferable!",
    },
    {
        id: 5,
        name: 'aashish dhakal',
        job: 'aspiring computer programmer',
        img: 'user5.jpg',
        text: "If I only had three words of advice, they would be, Tell the Truth. If got three more words, I'd add, all the time.",
    },
    {
        id: 6,
        name: 'darcy bohlin',
        job: 'aspiring lawyer',
        img: 'user6.jpg',
        text: "Do your best and let God do the rest.",
    },
];

//select items
const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');

//set starting item
let currentItem = 0;

//load initial item
window.addEventListener('DOMContentLoaded', function () {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
});

//show person based on item
function showPerson(person) {
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show next person
nextBtn.addEventListener('click', function () {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson(currentItem);
});

//show previous person
prevBtn.addEventListener('click', function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});

//show random person
randomBtn.addEventListener('click', function () {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);
});