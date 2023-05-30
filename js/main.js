const $photoURL = document.querySelector('#url');
const $form = document.querySelector('form');
const $image = document.querySelector('#img-preview');
const $unorderedList = document.querySelector('ul');

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
  const $rowDiv = document.createElement('div').setAttribute('class', 'row');
  $li.appendChild($rowDiv);

  // first column
  const $imgCol = document.createElement('div').setAttribute('class', 'column-half');
  $rowDiv.appendChild($imgCol);

  const $imgWrap = document.createElement('div').setAttribute('class', 'img-wrapper');
  $imgCol.appendChild($imgWrap);

  const $img = document.createElement('img').setAttribute('src', url);
  $imgCol.appendChild($img);

  // second column
  const $infoCol = document.createElement('div').setAttribute('class', 'column-half');
  $rowDiv.appendChild($infoCol);

  const $title = document.createElement('h2').setAttribute('class', 'entry-title');
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
