// // my solution

// const questionsNodeList = document.querySelectorAll('.question');
// const questions = [...questionsNodeList];

// const questionBtn = document.querySelectorAll('button');

// questions.forEach(function (question) {
//     const button = question.querySelector('.question-btn');
//     const questionText = question.querySelector('.question-text');
//     const plusIcon = button.querySelector('.plus-icon');
//     const minusIcon = button.querySelector('.minus-icon');
//     button.addEventListener('click', () => {
//         questionText.classList.toggle('show-text');
//         plusIcon.classList.toggle('plus-icon-js');
//         minusIcon.classList.toggle('minus-icon-js');
//     })
// })

// solution from coding addict

//using selectors inside the element
const questions = document.querySelectorAll('.question');

questions.forEach(function (question) {
    const btn = question.querySelector('.question-btn');

    btn.addEventListener('click', function () {

        questions.forEach(function (item) {
            if (item !== question) {
                item.classList.remove('show-text');
            }
        });

        question.classList.toggle('show-text');
    });
});





