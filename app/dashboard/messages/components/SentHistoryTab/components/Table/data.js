const columns = [
  {name: 'ID', uid: 'id', sortable: true},
  {name: 'DATA', uid: 'date', sortable: true},
  {name: 'ODBIORCY', uid: 'recipients'},
  {name: 'TEMAT', uid: 'subject'},
  {name: 'TREŚĆ', uid: 'content'},
  {name: '', uid: 'actions'},
];

const sentMessages = [
  {
    id: 1,
    date: '2021-10-01',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Witaj Janie, witaj Anno! Przykładowa treść wiadomości. Mam niespotykane wieści. Pozdrawiam, Janusz Kowalski',
  },
  {
    id: 2,
    date: '2021-10-02',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    date: '2021-10-02',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam.',
  },
  {
    id: 4,
    date: '2021-10-02',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Dzisiejsze zajęcia zostają odwołane z powodu złego samopoczucia prowadzącego. Przepraszamy za wszelkie niedogodności.',
  },
  {
    id: 5,
    date: '2021-10-02',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 6,
    date: '2021-10-02',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 7,
    date: '2021-10-03',
    recipients:
      'Jan Kowalski, Anna Nowak, Szymon Nowak, Katarzyna Kowalska, Paweł Kowalski, Jan Kowalski, Anna Nowak, Szymon Nowak, Katarzyna Kowalska, Paweł Kowalski',
    subject: 'Przykładowy temat',
    content: 'Przykładowa treść wiadomości',
  },
  {
    id: 8,
    date: '2021-10-04',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content: 'Przykładowa treść wiadomości',
  },
  {
    id: 9,
    date: '2021-10-05',
    recipients: 'Jan Kowalski, Anna Nowak',
    subject: 'Przykładowy temat',
    content: 'Przykładowa treść wiadomości',
  },
];

export {columns, sentMessages};
