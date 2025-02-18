const columns = [
  {name: 'ZAWODNIK', uid: 'name', sortable: true},
  {name: 'FORMUŁY', uid: 'formulas'},
  {name: 'DATA URODZENIA  ', uid: 'birthdate', sortable: true},
  {name: 'ZGODA', uid: 'consent', sortable: true},
  {name: 'OPŁATA', uid: 'payment', sortable: true},
  {name: 'WAGA', uid: 'weight', sortable: true},
  {name: 'WZROST', uid: 'height', sortable: true},
  {name: 'BADANIA LEKARSKIE', uid: 'medical_checkups', sortable: true},
  {name: 'STOPIEŃ', uid: 'level', sortable: true},
  {name: 'GRUPY  ', uid: 'groups'},
  {name: 'KATEGORIE', uid: 'categories'},
  {name: '', uid: 'actions'},
];

const users = [];

export {columns, groupOptions, users};
