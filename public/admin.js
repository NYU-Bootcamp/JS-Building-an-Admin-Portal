// Get List of Books
let bookList = document.getElementById('book-list')

function createList(books){
    bookList.innerHTML = '';
    books.forEach(element => {
        let book = document.createElement('li')
        book.textContent = element.title;
        let input = document.createElement('input')
        input.value = element.quantity
        book.append(input)
        let submit = document.createElement('button')
        submit.innerHTML = 'Save'
        book.append(submit)
        let deleteBook = document.createElement('button')
        deleteBook.innerHTML = 'Remove Book'
        book.append(deleteBook)
        bookList.append(book)
        submit.addEventListener('click', async function(){
            let options = {method: 'PATCH', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({id: element.id, quantity: input.value})}
            let response = await fetch('http://localhost:3001/updateBook', options)
        })
        deleteBook.addEventListener('click', async function(){
            let response = await fetch('http://localhost:3001/removeBook/' + element.id, {method: 'DELETE'})
            book.remove()
        })
    });
}

async function getBooks(){
    let response = await fetch('http://localhost:3001/listBooks');
    let data = await response.json()
    createList(data)
} 

async function createBook() {
    const name = document.getElementById('title')
    const desc = document.getElementById('description')
    const image = document.getElementById('image')
    const year = new Date().getFullYear();

    let newBook = {
        title: name.value,
        description: desc.value,
        imageURL: image.value,
        year: year,
        quantity: 1
    }
    
    let options = {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(newBook)}
    let response = await fetch('http://localhost:3001/addBook', options)
    let data = await response.text()

    name.value = ""
    desc.value = ""
    imageURL = ""
    window.alert("Book Created!")
    getBooks()
}

getBooks()