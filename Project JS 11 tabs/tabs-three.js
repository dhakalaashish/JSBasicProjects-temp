const abouts = document.querySelectorAll('.about')


//adding event listener to the whole about section!
abouts.forEach((about) => {
    about.addEventListener('click', (e) => {
        const btns = about.querySelectorAll('.tab-btn')
        console.log(btns)
        const articles = about.querySelectorAll('.content')
        //currentTarget refere to the event on the which the listener is, so refers to about
        //targer refers to the event where the user clicked
        const id = e.target.dataset.id;
        if (id) {
            //remove active class from all buttons
            btns.forEach((btn) => {
                btn.classList.remove('active');
            })
            //while we add the active to the target button
            e.target.classList.add('active')
            //similarly remove active from all articles
            articles.forEach((article) => {
                article.classList.remove('active')
            })
            //while we add the active class to the article that has the same dataset-id as target
            const displayArticle = document.getElementById(id)
            displayArticle.classList.add('active')
        }
    })
})
