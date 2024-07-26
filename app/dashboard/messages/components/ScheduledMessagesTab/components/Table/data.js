const columns = [
  {name: 'ID', uid: 'id', sortable: true},
  {name: 'DATA WYSŁANIA', uid: 'date', sortable: true},
  {name: 'ODBIORCY', uid: 'recipients'},
  {name: 'TEMAT', uid: 'subject'},
  {name: 'TREŚĆ', uid: 'content'},
  {name: '', uid: 'actions'},
];

const sentMessages = [
  {
    id: 1,
    date: '2021-10-01, 17:00',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Witaj Janie, witaj Anno! Przykładowa treść wiadomości. Mam niespotykane wieści. Pozdrawiam, Janusz Kowalski',
  },
  {
    id: 2,
    date: '2021-10-02, 12:00',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    date: '2021-10-02, 12:00',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam.',
  },
];

export {columns, sentMessages};
