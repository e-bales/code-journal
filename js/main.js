const $photoURL = document.querySelector('#url');
const $form = document.querySelector('form');
const $image = document.querySelector('#img-preview');
const $unorderedList = document.querySelector('ul');
const $entriesMsg = document.querySelector('.no-entries');

const $entryFormDiv = document.querySelector('[data-view="entry-form"]');
const $entriesDiv = document.querySelector('[data-view="entries"]');
const $entriesAnchor = document.querySelector('.entries-anchor');
const $entryFormAnchor = document.querySelector('.entry-form-anchor');

const $entryTitle = document.querySelector('#entry-title');
const $deleteEntry = document.querySelector('.delete-entry');
const $deleteText = document.querySelector('.delete-button');

$photoURL.addEventListener('input', event => {
  const url = $photoURL.value;
  $image.setAttribute('src', url);
});

$form.addEventListener('submit', event => {
  event.preventDefault();
  const newTitle = $form.elements[0].value;
  const newUrl = $form.elements[1].value;
  const newNotes = $form.elements[2].value;
  const obj = {
    title: newTitle,
    url: newUrl,
    notes: newNotes
  };
  if (data.editing !== null) { // if we are editing an entry
    obj.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = obj;
        break;
      }
    }
    const $newEntryLi = renderEntry(obj);
    const $oldLi = document.querySelector('[data-entry-id=' + CSS.escape(obj.entryId) + ']');
    $oldLi.replaceWith($newEntryLi);
    $entryTitle.textContent = 'New Entry';
    data.editing = null;
    $deleteEntry.classList.add('invisible');
  } else { // else we are entering a new entry
    obj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(obj);
    $unorderedList.prepend(renderEntry(obj));
  }
  viewSwap('entries');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  const title = entry.title;
  const notes = entry.notes;
  const url = entry.url;
  const id = entry.entryId;
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', id);
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
  $img.setAttribute('alt', 'entry image');
  $imgWrap.appendChild($img);

  // second column
  const $infoCol = document.createElement('div');
  $infoCol.setAttribute('class', 'column-half');
  $rowDiv.appendChild($infoCol);

  const $infoTitleRow = document.createElement('div');
  $infoTitleRow.setAttribute('class', 'row');
  $infoCol.appendChild($infoTitleRow);

  const $threeQuarters = document.createElement('div');
  $threeQuarters.setAttribute('class', 'column-three-quarter');
  $infoTitleRow.appendChild($threeQuarters);

  const $title = document.createElement('h2');
  $title.setAttribute('class', 'entry-title');
  $title.textContent = title;
  $threeQuarters.appendChild($title);

  const $colIcon = document.createElement('div');
  $colIcon.setAttribute('class', 'column-icon');
  $infoTitleRow.appendChild($colIcon);

  const $iconWrap = document.createElement('div');
  $iconWrap.setAttribute('class', 'icon-wrapper');
  $colIcon.appendChild($iconWrap);

  const $icon = document.createElement('i');
  $icon.classList.add('fa-solid', 'fa-pencil', 'fa-2x');
  $iconWrap.appendChild($icon);

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
  viewSwap(data.view);
});

function hideNoEntries() {
  $entriesMsg.classList.add('hidden');
}

function viewSwap(view) {
  data.view = view;
  if (view === 'entries') {
    $entriesDiv.classList.remove('hidden');
    $entryFormDiv.classList.add('hidden');
    if (data.entries.length > 0) {
      hideNoEntries();
    }
    if (data.editing !== null) { // if the user doesn't save their edit, don't want data.editing to still be filled
      data.editing = null;
    }
  } else if (view === 'entry-form') {
    if (data.editing !== null) { // need to show delete entry if we are editing an entry
      $deleteEntry.classList.remove('invisible');
    } else {
      $deleteEntry.classList.add('invisible');
    }
    $entryFormDiv.classList.remove('hidden');
    $entriesDiv.classList.add('hidden');
  }
}

$entriesAnchor.addEventListener('click', () => {
  viewSwap('entries');
  $form.reset();
  $entryTitle.textContent = 'New Entry';
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});
$entryFormAnchor.addEventListener('click', () => {
  viewSwap('entry-form');
});

$unorderedList.addEventListener('click', event => {
  if (event.target.tagName === 'I') {
    const $currLI = event.target.closest('li');
    const listId = Number($currLI.dataset.entryId);
    for (let i = 0; i < data.entries.length; i++) {
      const retrievedEntry = data.entries[i];
      if (retrievedEntry.entryId === listId) {
        data.editing = retrievedEntry;
        break;
      }
    }
    $form.elements[0].value = data.editing.title;
    $form.elements[1].value = data.editing.url;
    $form.elements[2].value = data.editing.notes;
    $image.setAttribute('src', data.editing.url);
    $entryTitle.textContent = 'Edit Entry';
    viewSwap('entry-form');
  }
});

$deleteText.addEventListener('click', event => {
  // console.log('You would like to delete :)');
});
