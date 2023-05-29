const $photoURL = document.querySelector('#url');
const $form = document.querySelector('form');
let dataHolder = '';

$photoURL.addEventListener('input', event => {
  const url = event.data;
  if (event.inputType === 'deleteContentBackward') {
    dataHolder = dataHolder.slice(0, -1);
  } else {
    dataHolder += url;
  }
  // console.log('data-holder: ', dataHolder);
  document.querySelector('#img-preview').setAttribute('src', dataHolder);
  // I get event.data = null when I paste?
});

$photoURL.addEventListener('paste', event => {
  // console.log('window data', window);
  // console.log('paste event: ', event);
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
