// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

const openRequest = window.indexedDB.open('notes_db', 1);
openRequest.addEventListener('error', () => console.error('Database failed to open'));

openRequest.addEventListener('success', () =>  {console.log('Database opened succesful')

db = openRequest.result;

displayData();
});


openRequest.addEventListener('upgradeneeded', e => 
{
    db = e.target.result;

    const objectStore = db.createObjectStore('notes_os', {keypath: 'id', autoIncrement: true});

    objectStore.createIndex('title', 'title', {unique: false});
    objectStore.createIndex('body', 'body', {unique: false});

    console.log('Database setup complete');
}
);

form.addEventListener('submit', addData);

function addData(e) {
    e.preventDefault();

    const newIten = {title: titleInput.ariaValueMax, body: bodyInput.value};

    const transaction = db.transaction(['notes_os'], 'readwrite');

    const objectStore = transaction.objectStore('notes_os');

    const addRequest = objectStore.add(newIten);

    addRequest.addEventListener('success', () => {
        titleInput.value = '';
        bodyInput.value = '';
    });

    transaction.addEventListener('complete', () => {
        console.log('Transaction completed: database modification finished.');
    displayData();
    })

    transaction.addEventListener('error', () => console.log('Transaction not opened, due to error'));
}

// Define the displayData() function
function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  
    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    const objectStore = db.transaction('notes_os').objectStore('notes_os');
    objectStore.openCursor().addEventListener('success', e => {
      // Get a reference to the cursor
      const cursor = e.target.result;
  
      // If there is still another data item to iterate through, keep running this code
      if(cursor) {
        // Create a list item, h3, and p to put each data item inside when displaying it
        // structure the HTML fragment, and append it inside the list
        const listItem = document.createElement('li');
        const h3 = document.createElement('h3');
        const para = document.createElement('p');
  
        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);
  
        // Put the data from the cursor inside the h3 and para
        h3.textContent = cursor.value.title;
        para.textContent = cursor.value.body;
  
        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        listItem.setAttribute('data-note-id', cursor.value.id);
  
        // Create a button and place it inside each listItem
        const deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Delete';
  
        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteBtn.addEventListener('click', deleteItem);
  
        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if list item is empty, display a 'No notes stored' message
        if(!list.firstChild) {
          const listItem = document.createElement('li');
          listItem.textContent = 'No notes stored.'
          list.appendChild(listItem);
        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');
      }
    });
  }

  // Define the deleteItem() function
function deleteItem(e) {
    // retrieve the name of the task we want to delete. We need
    // to convert it to a number before trying to use it with IDB; IDB key
    // values are type-sensitive.
    const noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
  
    // open a database transaction and delete the task, finding it using the id we retrieved above
    const transaction = db.transaction(['notes_os'], 'readwrite');
    const objectStore = transaction.objectStore('notes_os');
    const deleteRequest = objectStore.delete(noteId);
  
    // report that the data item has been deleted
    transaction.addEventListener('complete', () => {
      // delete the parent of the button
      // which is the list item, so it is no longer displayed
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log(`Note ${noteId} deleted.`);
  
      // Again, if list item is empty, display a 'No notes stored' message
      if(!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.';
        list.appendChild(listItem);
      }
    });
  }