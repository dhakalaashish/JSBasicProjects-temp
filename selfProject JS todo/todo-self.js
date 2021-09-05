//selecting 
const submitBtn = document.getElementById('submit-btn')
const textBox = document.getElementById('text-box')
const itemContainer = document.querySelector('.item-container')
const container = document.querySelector('.container')
const message = document.querySelector('.message')
const clearBtn = document.querySelector('.clear-btn')

let editFlag = false;
let editID;
let editValue;
let list = [];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = new Date().getTime().toString();
    const value = textBox.value;

    if (value && !editFlag) {
        const element = document.createElement('article');
        element.classList.add('item')
        element.setAttribute('data-id', id);
        element.innerHTML = `<div class="item-text">
                            <p class="item-name"> ${value}</p>
                        </div>
                        <div class="item-button">
                            <button class="edit-btn"><i class="far fa-edit"></i></button>
                            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                        </div>`
        itemContainer.appendChild(element);
        const editBtn = element.querySelector('.edit-btn')
        const deleteBtn = element.querySelector('.delete-btn')
        editBtn.addEventListener('click', (e) => {
            editFlag = true;
            editID = e.currentTarget.parentElement.parentElement.dataset.id;
            submitBtn.textContent = 'Edit'
            console.log(e.currentTarget.parentElement.parentElement)
            editValue = e.currentTarget.parentElement.parentElement.querySelector('.item-name').textContent
            textBox.value = editValue;
        })
        deleteBtn.addEventListener('click', (e) => {
            let deleteID = e.currentTarget.parentElement.parentElement.dataset.id;
            console.log(deleteID);
            e.currentTarget.parentElement.parentElement.remove();
            if (document.querySelector('.item-container').innerHTML === '') {
                container.classList.remove('show-container')
            }
            deleteFromLocalStorage(deleteID)
        })
        container.classList.add('show-container')
        displayMessage('You successfully added an item', 'success')
        addToLocalStorage(id, value)
        setBackToDefault()
    }

    else if (value && editFlag) {
        const elements = document.querySelectorAll('.item');
        elements.forEach((element) => {
            if (element.dataset.id === editID) {
                const itemName = element.querySelector('.item-name')
                editValue = textBox.value
                itemName.textContent = editValue;
            }
        })
        submitBtn.textContent = 'Submit'
        editFromLocalStorage(editID, editValue)
        setBackToDefault()
    }

    else {
        displayMessage('Please enter an item first!', 'warn')
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    itemContainer.innerHTML = ''
    container.classList.remove('show-container')
})

// *****************All functions are defined below********************
function displayMessage(messageText, messageType) {
    message.textContent = messageText
    message.classList.add(messageType)
    setTimeout(() => {
        message.classList.remove(messageType)
        message.textContent = '';
    }, 1000)
}
function setBackToDefault() {
    value = '';
    editFlag = false;
    textBox.value = '';
    let editID = undefined;
    let editValue = '';
}
function addToLocalStorage(id, value) {
    let grocery = { id: id, value: value }
    let items = getLocalStorage()
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
}
function deleteFromLocalStorage(deleteID) {
    let items = getLocalStorage()
    let remainingItems = items.filter((item) => {
        if (item.id !== deleteID) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(remainingItems))
}
function editFromLocalStorage(editID, editValue) {
    let items = getLocalStorage()
    const editedItems = items.map((item) => {
        if (item.id === editID) {
            item.value = editValue;
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(editedItems))
}
function getLocalStorage() {
    if (localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}
//do this before beginning the program
window.addEventListener('DOMContentLoaded', () => {
    const items = getLocalStorage();
    if (items.length > 0) {
        console.log(items);
        items.forEach((item) => {
            let id = item.id;
            let value = item.value;
            const element = document.createElement('article');
            element.classList.add('item')
            element.setAttribute('data-id', id);
            element.innerHTML = `<div class="item-text">
                            <p class="item-name"> ${value}</p>
                        </div>
                        <div class="item-button">
                            <button class="edit-btn"><i class="far fa-edit"></i></button>
                            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                        </div>`
            itemContainer.appendChild(element);
        })
        container.classList.add('show-container')
        const editBtn = element.querySelector('.edit-btn')
        const deleteBtn = element.querySelector('.delete-btn')
        editBtn.addEventListener('click', (e) => {
            editFlag = true;
            editID = e.currentTarget.parentElement.parentElement.dataset.id;
            submitBtn.textContent = 'Edit'
            console.log(e.currentTarget.parentElement.parentElement)
            editValue = e.currentTarget.parentElement.parentElement.querySelector('.item-name').textContent
            textBox.value = editValue;
        })
        deleteBtn.addEventListener('click', (e) => {
            let deleteID = e.currentTarget.parentElement.parentElement.dataset.id;
            console.log(deleteID);
            e.currentTarget.parentElement.parentElement.remove();
            if (document.querySelector('.item-container').innerHTML === '') {
                container.classList.remove('show-container')
            }
            deleteFromLocalStorage(deleteID)
        })
    }
})