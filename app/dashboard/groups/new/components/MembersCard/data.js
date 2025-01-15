const columns = [
  {name: 'ZAWODNIK', uid: 'name', sortable: true},
  {name: 'DATA URODZENIA  ', uid: 'birthdate', sortable: true},
  {name: 'BADANIA LEKARSKIE', uid: 'medical_checkups', sortable: true},
  {name: 'ROLE', uid: 'role', sortable: true},
  {name: 'TEAM', uid: 'team'},
  {name: 'EMAIL', uid: 'email'},
  {name: 'STATUS', uid: 'status', sortable: true},
  {name: '', uid: 'actions'},
];

const statusOptions = [
  {name: 'Zrealizowane', uid: 'Zrealizowane'},
  {name: 'Opłacone', uid: 'Opłacone'},
  {name: 'Nieopłacone', uid: 'Nieopłacone'},
];

const users = [];

export {columns, statusOptions, users};
