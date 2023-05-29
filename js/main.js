const $photoURL = document.querySelector('#url');
const $form = document.querySelector('form');
// let fullURL = '';

// console.log('Current data is: ', data);

$photoURL.addEventListener('input', event => {
  const url = document.querySelector('#url').value;
  document.querySelector('#img-preview').setAttribute('src', url);
  // I get event.data = null when I paste?
});

$form.addEventListener('submit', event => {
  event.preventDefault();
  const newTitle = document.querySelector('#title').value;
  const newUrl = document.querySelector('#url').value;
  const newNotes = document.querySelector('#notes').value;
  const newId = data.nextEntryId;
  const obj = {
    title: newTitle,
    url: newUrl,
    notes: newNotes,
    entryId: newId
  };
  data.nextEntryId++;
  data.entries.push(obj);
  document.querySelector('#img-preview').setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
