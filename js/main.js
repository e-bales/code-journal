const $photoURL = document.querySelector('#url');
const $form = document.querySelector('form');
const $image = document.querySelector('#img-preview');
const $unorderedList = document.querySelector('ul');
// const $entriesMsg = document.querySelector('.no-entries');

const $entryFormDiv = document.querySelector('[data-view="entry-form"]');
const $entriesDiv = document.querySelector('[data-view="entries"]');
const $entriesAnchor = document.querySelector('.entries-anchor');

$photoURL.addEventListener('input', event => {
  const url = $photoURL.value;
  $image.setAttribute('src', url);
});

$form.addEventListener('submit', event => {
  event.preventDefault();
  const newTitle = $form.elements[0].value;
  const newUrl = $form.elements[1].value;
  const newNotes = $form.elements[2].value;
  const newId = data.nextEntryId;
  const obj = {
    title: newTitle,
    url: newUrl,
    notes: newNotes,
    entryId: newId
  };
  data.nextEntryId++;
  data.entries.unshift(obj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  const title = entry.title;
  const notes = entry.notes;
  const url = entry.url;
  const $li = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  $li.appendChild($rowDiv);

  // first column
  const $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-half');
  $rowDiv.appendChild($imgCol);

  const $imgWrap = document.createElement('div');
  $imgWrap.setAttribute('class', 'img-wrapper');
  $imgCol.appendChild($imgWrap);

  const $img = document.createElement('img');
  $img.setAttribute('src', url);
  $imgWrap.appendChild($img);

  // second column
  const $infoCol = document.createElement('div');
  $infoCol.setAttribute('class', 'column-half');
  $rowDiv.appendChild($infoCol);

  const $title = document.createElement('h2');
  $title.setAttribute('class', 'entry-title');
  $title.textContent = title;
  $infoCol.appendChild($title);

  const $notes = document.createElement('p');
  $notes.textContent = notes;
  $infoCol.appendChild($notes);

  return $li;
}

document.addEventListener('DOMContentLoaded', event => {
  for (let i = 0; i < data.entries.length; i++) {
    const currEntry = data.entries[i];
    $unorderedList.appendChild(renderEntry(currEntry));
  }
});

// function toggleNoEntries() {
//   $entriesMsg.classList.toggle('hidden');
// }

function viewSwap(view) {
  data.view = view;
  if (view === 'entries') {
    $entriesDiv.classList.remove('hidden');
    $entryFormDiv.classList.add('hidden');
  } else if (view === 'entry-form') {
    $entryFormDiv.classList.remove('hidden');
    $entriesDiv.classList.add('hidden');
  }
}

$entriesAnchor.addEventListener('click', viewSwap('entries'));
