const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

function toggleSidebar() {
    sidebar.classList.toggle('show-sidebar')
    console.log('clicked')
}

// menuBtn.addEventListener('click', () => {
//     sidebar.classList.toggle('show-sidebar')
// });
menuBtn.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);
