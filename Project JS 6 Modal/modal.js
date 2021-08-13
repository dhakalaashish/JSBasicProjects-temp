const modalOverlay = document.querySelector('.modal-overlay');
const modalBtn = document.querySelector('.modal-btn');
const closeBtn = document.querySelector('.close-btn');

function toggleOverlay() {
    modalOverlay.classList.toggle('open-modal');
}

modalBtn.addEventListener('click', toggleOverlay);
closeBtn.addEventListener('click', toggleOverlay);
