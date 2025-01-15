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

const groupOptions = [
  {name: 'Kickboxing Dinusie', uid: 'Kickboxing Dinusie', color: '#FFC107'},
  {name: 'Kickboxing Juniorzy', uid: 'Kickboxing Juniorzy', color: '#FF5722'},
  {name: 'Kickboxing Seniorzy', uid: 'Kickboxing Seniorzy', color: '#4CAF50'},
  {name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci', color: '#2196F3'},
  {name: 'Yoga', uid: 'Yoga', color: '#9C27B0'},
  {name: 'Pilates', uid: 'Pilates', color: '#E91E63'},
];

const users = [];

export {columns, groupOptions, users};
