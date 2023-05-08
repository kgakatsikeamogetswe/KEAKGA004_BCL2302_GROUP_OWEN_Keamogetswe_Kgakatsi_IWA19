import { books, genres, authors, BOOKS_PER_PAGE } from "./data.js";

const matches = books
let page = 1;

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}



//Buttons
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})



//Setting
const settingButton = document.querySelector("[data-header-settings]")
settingButton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})



//Theme to dark and light
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector('[form="settings"]')
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )



//Search function to store more options to chose in genres and authors selects
const authorFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorFragment.appendChild(element);
for (let [id, name] of Object.entries(authors)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  authorFragment.appendChild(element);
}
document.querySelector('[data-search-authors]').appendChild(authorFragment);
const genresFragment = document.createDocumentFragment();
let element2 = document.createElement('option');
element2.value = 'any';
element2.innerText = 'All Genres';
genresFragment.appendChild(element2);
for (let [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  genresFragment.appendChild(element);
}
document.querySelector('[data-search-genres]').appendChild(genresFragment);



// Search specific books using options
const searchFilter = document.querySelector('[data-search-form]')
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();
   document.querySelector('[data-list-items]').style.display = 'none'
   document.querySelector('[data-list-message]').innerHTML = ''
    const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');
const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(book);
    }
   }
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   if (filteredBooks.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
}
document.querySelector('[class="list__message"]').style.display = 'block'
document.querySelector('[data-list-button]').innerHTML =  `Show more (${filteredBooks.length})`
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description

        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment2.appendChild(preview)
        }
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").style.display = "none";
    })


//create a html fragment to hold the books
const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)


/**
 * This is the button used to add more books to the page as you scroll
 * down.
 */
const SHOW_MORE_BTN = document.querySelector('[data-list-button]');
SHOW_MORE_BTN.setAttribute("style", "color: rgba(255, 255, 255, 0.6)");



/**
 * This function updates the number of books left and then prints
 * that number on the button used to show more books.
 * @returns { number } the number of books left that haven't been
 * loaded to the page
 */
const updateBooksLeft = () => {
const booksOnPage = document.querySelectorAll('preview');
const booksOnPageCount = booksOnPage.length;
const booksLeft = books.length - booksOnPageCount;
//add the text to the button element
return booksLeft
   }


/**
 * This function loads the home page of the website with 
 * the books shown in a list of 36 at a time.
 * @param {imported object} books 
 */
const appendBooks = (books) => {
    /* use imported variable that stored the number of books that
    can be on the page at a time in a for loop to loop through the books
    and add only 36 at time*/
    for (let i = 0; i < BOOKS_PER_PAGE; i++) {
        const book = books[i];
        const button = document.createElement('button');
        button.classList.add('preview');
        button.dataset.preview = book.id;
      // Set the button's inner HTML to the book's title and author.
      button.innerHTML =/* HTML markup for the book cards */
      `
       <img class="preview__image" src="${book.image}" />
       <div class="preview__info">
         <h3 class="preview__title">${book.title}</h3>
         <div class="preview__author">${authors[book.author]}</div>
       </div>
     `;
     
    // Append the button to the fragment.
    fragment.appendChild(button);
}

     // Append the fragment to the data-list-items div.
     document.querySelector('[data-list-items]').appendChild(fragment);

SHOW_MORE_BTN.innerHTML = `Show more (${updateBooksLeft()})`
    }



    /**
     * This function will add more books to the page and update
     * the number in the show more button everytime it is clicked 
     * until there are no more books left in the books object.
     */
const showMoreAction = (event) => {
    event.preventDefault()
    const booksOnPage = document.querySelectorAll('.preview');
    const booksOnPageCount = booksOnPage.length;
    //subtract books on page from total books in object
    const booksLeft = books.length - booksOnPageCount;
    
    //check if there are still books left in the books object
    if(booksLeft > 0) {
        appendBooks(books.slice(booksOnPageCount, booksOnPageCount + 36))
    }   
        SHOW_MORE_BTN.innerHTML = `Show more (${booksLeft})`

        /* make the summary overlay show when a book is clicked
 Used a for loop to iterate over all the book buttons so that
 each one can be clicked on
 NOTE - added here too so it can still work after the first 
 36 books are added*/
 const bookList = document.querySelectorAll('.preview')
 for (let z = booksOnPageCount; z < books.length; z++ ) {
    bookList[z].addEventListener("click", descritionOverlay )
 }
    };

const descritionOverlay = (event) => {
    //fetch the dialog box where the overlay will be appended
    const bookSummary = document.querySelector('[data-list-active]')

    //get the book that is clicked
    const book = event.target.closest('.preview');
    //get a book id to use to fetch book information
    const bookId = book.getAttribute('data-preview');

    //for loop to iterate over the book object lloking for matchind ids
    for (let i = 0; i < books.length; i++) {
        //check if the id in the books object matches that of the clicked book
        if (books[i].id === bookId) {
        //create the overlaay div html
        bookSummary.innerHTML = /*html*/
        `<div class="overlay__preview">
        <img class="overlay__blur" data-list-blur="" src="${books[i].image}">
        <img class="overlay__image" data-list-image="" src="${books[i].image}">
        </div>
        <div class="overlay__content">
        <h3 class="overlay__title" data-list-title="">${books[i].title} (${new Date(books[i].published).getFullYear()})</h3>
        <div class="overlay__data" data-list-subtitle="">${authors[books[i].author]}</div>
        <p class="overlay__data overlay__data_secondary" data-list-description="">${books[i].description}</p>
        </div>
        <div class="overlay__row">
        <button class="overlay__button overlay__button_primary" data-list-close="">Close</button>
        </div>`
        }
    }

        //show the book summary overlay when its done being created
        bookSummary.showModal()

        //when the close button is clicked, the overlay should be removed
        document.querySelector('[data-list-close]').addEventListener("click", () => {
            bookSummary.close()
        })

        
  
}

// Function to display an overlay of each book's information when each book is clicked
const detailsToggle = (event) => {
  const overlay1 = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
const description = document.querySelector('[data-list-description]')
  const image1 = document.querySelector('[data-list-image]')
  const imageblur = document.querySelector('[data-list-blur]')
  event.target.dataset.id ? overlay1.style.display = "block" : undefined;
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)
const bookclickInSearch = document.querySelector('[data-list-message]')
bookclickInSearch.addEventListener('click', detailsToggle)



/** 
 * calling the function to load page with book list using an event
 * listener for when the page first loads  
 */

document.addEventListener("click", appendBooks(books))

/*use event listener to make button load more books with the
showMoreAction function*/
document.querySelector('[data-list-button]').addEventListener("click", showMoreAction) 

/* make the summary overlay show when a book is clicked
 Used a for loop to iterate over all the book buttons so that
 each one can be clicked on*/
 const bookList = document.querySelectorAll('.preview')
 for (let z = 0; z < books.length; z++ ) {
    bookList[z].addEventListener("click", descritionOverlay )
 }





