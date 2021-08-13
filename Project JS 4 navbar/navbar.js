const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('mouseenter', function () {
    // if (!links.classList.contains('show-links')) {
    //     links.classList.add('show-links');
    // } else {
    //     links.classList.remove('show-links');
    // }
    links.classList.toggle('show-links');
})