const API_URL_NOTES = 'https://secret-plains-79535.herokuapp.com/notes'
const API_URL_USERS = 'https://secret-plains-79535.herokuapp.com/users'

function getNotes() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
  fetch(API_URL_NOTES, options)
    .then(result => result.json())
    .then(data => {
      renderTable(data)})
    .catch(error => console.log(error))
}

function searchNotes() {
  const q = document.getElementById('note-search').value
  const isArchived = document.getElementById('isArchived').checked
  fetch(`${API_URL_NOTES}/search?word=${q}&isArchived=${isArchived}`)
    .then(result => result.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error))
}

function getNoteById() {
  const id = document.getElementById('note-id').value
  fetch(`${API_URL_NOTES}/${id}`)
  .then(result => result.json())
  .then(data => renderTable([data]))
  .catch(error => console.log(error))
}

function addNote() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: document.getElementById('note-title').value,
      body: document.getElementById('note-body').value,
      isArchived: false
    })
  }
  fetch(API_URL_NOTES, options)
  .then(result => {
    if (!result.ok) {
      return alert('cant add new note...')
    } else {
      return result.json()
    }
  })
  .then(data => renderTable(data))
  .catch(error => console.log(error))
}

function deleteNote(noteId) {
  fetch(`${API_URL_NOTES}/${noteId}`, {
    method: 'DELETE'
  })
  .then(result => result.json())
  .then(data => renderTable(data))
  .catch(error => console.log(error))
}

function renderTable(array) {
  let table = '<table class="table"><thead><tr>'
  for (let header in array[0]) {
    table += `<th>${header}</th>`
  }
  table += '</tr></thead><tbody>'
  for (let item of array) {
    table += '<tr>'
    for (let key in item) {
      table += `<td>${item[key]}</td>`
    }
    table += `<td><button type="button" class="btn btn-danger" onclick="deleteNote('${item._id}')">DELETE</button></td>`
    table += '</tbody></tr>'
  } 
  table += '</table>'
  const tableContainer = document.getElementById("table-container")
  tableContainer.innerHTML = table
}

async function signUp() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    })
  }
  try {
    const result = await fetch(`${API_URL_USERS}/signup`, options)
      if (!result.ok) {
        return alert('cant add new user...')
      } else {
        console.log('USER ADDED')
        window.location.href = "./notes.html"
      }
  } catch (error) {
    
  }
}

async function signIn() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: document.getElementById('email-signin').value,
      password: document.getElementById('password-signin').value,
    })
  }
  try {
    const result = await fetch(`${API_URL_USERS}/signin`, options)
      if (!result.ok) {
        console.log('error', result)
        return alert('cant login user...')
      } else {
        const data = await result.json()
        console.log('USER SIGNED IN', data)
        saveToLocalStorage(data.token)
        window.location.href = "./notes.html"
      }
  } catch (error) {
    console.error('USER  NOT SIGNED IN', error)
  }
}

function saveToLocalStorage(token) {
  localStorage.setItem('token', token)
}
