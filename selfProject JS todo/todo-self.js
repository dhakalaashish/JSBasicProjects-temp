//selecting 
const submitBtn = document.getElementById('submit-btn')
const textBox = document.getElementById('text-box')
const itemContainer = document.querySelector('.item-container')
const container = document.querySelector('.container')
const message = document.querySelector('.message')
const clearBtn = document.querySelector('.clear-btn')

//setting up useful variables!
let editFlag = false;
let editID;
let editValue;
let list = [];

//event listeners!
submitBtn.addEventListener('click', addItem)
clearBtn.addEventListener('click', clearAllItems)
window.addEventListener('DOMContentLoaded', localStorageInitialSetup)

// *****************All functions are defined below********************
//function to add an item, need to pass in the event from submitButton
function addItem(e) {
    e.preventDefault();
    const id = new Date().getTime().toString();
    const value = textBox.value;

    if (value && !editFlag) {
        createListItem(id, value);
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
}
//this will create a new <article> will be created, and eventListeners will be set up!
function createListItem(id, value) {
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
    editBtn.addEventListener('click', editItem)
    deleteBtn.addEventListener('click', deleteItem)
    container.classList.add('show-container')
}
//display message!
function displayMessage(messageText, messageType) {
    message.textContent = messageText
    message.classList.add(messageType)
    setTimeout(() => {
        message.classList.remove(messageType)
        message.textContent = '';
    }, 1000)
}
//this function sets everthing, button, textBox.value will all be set to default!
function setBackToDefault() {
    value = '';
    editFlag = false;
    textBox.value = '';
    let editID = undefined;
    let editValue = '';
}
//when we click delete
function deleteItem(e) {
    let deleteID = e.currentTarget.parentElement.parentElement.dataset.id;
    console.log(deleteID);
    e.currentTarget.parentElement.parentElement.remove();
    if (document.querySelector('.item-container').innerHTML === '') {
        container.classList.remove('show-container')
    }
    deleteFromLocalStorage(deleteID)
}
//when we click edit
function editItem(e) {
    editFlag = true;
    editID = e.currentTarget.parentElement.parentElement.dataset.id;
    submitBtn.textContent = 'Edit'
    console.log(e.currentTarget.parentElement.parentElement)
    editValue = e.currentTarget.parentElement.parentElement.querySelector('.item-name').textContent
    textBox.value = editValue;
}
//this happes when we click "clear" button!
function clearAllItems() {
    localStorage.clear()
    itemContainer.innerHTML = ''
    container.classList.remove('show-container')
}
//this is how we get the data from local storage
function getLocalStorage() {
    if (localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}
//here's how we add to local storage
function addToLocalStorage(id, value) {
    let grocery = { id: id, value: value }
    let items = getLocalStorage()
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
}
//edit from local storage
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
//delete from local storage
function deleteFromLocalStorage(deleteID) {
    let items = getLocalStorage()
    let remainingItems = items.filter((item) => {
        if (item.id !== deleteID) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(remainingItems))
}
//do this before beginning the program
function localStorageInitialSetup() {
    const items = getLocalStorage();
    if (items.length > 0) {
        console.log(items);
        items.forEach((item) => {
            let id = item.id;
            let value = item.value;
            createListItem(id, value)
        })
    }
}
