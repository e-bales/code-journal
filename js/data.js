/* exported data */
window.addEventListener('beforeunload', event => {
  const dataModel = JSON.stringify(data);
  localStorage.setItem('userData', dataModel);
});

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

if (localStorage.getItem('userData') !== null) {
  data = JSON.parse(localStorage.getItem('userData'));
}
