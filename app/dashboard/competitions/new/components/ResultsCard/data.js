const columns = [
  {name: 'ZAWODNIK', uid: 'name', sortable: true},
  {name: 'GRUPY  ', uid: 'groups'},
  {name: 'KAT. WIEKOWA', uid: 'age_category', sortable: true},
  {name: 'FORMUŁA', uid: 'formula', sortable: true},
  {name: 'KAT. WAGOWA/WZROSTOWA', uid: 'weight_or_height_category', sortable: true},
  {name: 'WYNIK', uid: 'result', sortable: true},
  {name: '', uid: 'actions'},
];

const groupsOptions = [
  {name: 'Kickboxing Dinusie', uid: 'Kickboxing Dinusie', color: '#FFC107'},
  {name: 'Kickboxing Juniorzy', uid: 'Kickboxing Juniorzy', color: '#FF5722'},
  {name: 'Kickboxing Seniorzy', uid: 'Kickboxing Seniorzy', color: '#4CAF50'},
  {name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci', color: '#2196F3'},
  {name: 'Yoga', uid: 'Yoga', color: '#9C27B0'},
  {name: 'Pilates', uid: 'Pilates', color: '#E91E63'},
];

const ageCategoryOptions = [
  {name: 'Senior', uid: 'Senior'},
  {name: 'Junior', uid: 'Junior'},
  {name: 'Kadet starszy', uid: 'Kadet starszy'},
  {name: 'Kadet młodszy', uid: 'Kadet młodszy'},
  {name: 'Dziecko', uid: 'Dziecko'},
];

const formulaOptions = [
  {name: 'Pointfighting', uid: 'Pointfighting'},
  {name: 'Light Contact', uid: 'Light Contact'},
  {name: 'Full Contact', uid: 'Full Contact'},
  {name: 'Low Kick', uid: 'Low Kick'},
  {name: 'K-1', uid: 'K-1'},
];

const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    groups: [
      {name: 'Kickboxing Dinusie', uid: 'Kickboxing Dinusie'},
      {name: 'Kickboxing Juniorzy', uid: 'Kickboxing Juniorzy'},
    ],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Senior',
    formula: 'Pointfighting',
    weight_or_height_category: '-79kg',
    result: 1,
  },
  {
    id: 2,
    name: 'Zoey Lang',
    groups: [{name: 'Kickboxing Seniorzy', uid: 'Kickboxing Seniorzy'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-74kg',
    result: 2,
  },
  {
    id: 3,
    name: 'Sarah Connor',
    groups: [{name: 'Yoga', uid: 'Yoga'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Senior',
    formula: 'Full Contact',
    weight_or_height_category: '-79kg',
    result: 3,
  },
  {
    id: 4,
    name: 'John Smith',
    groups: [{name: 'Kickboxing Juniorzy', uid: 'Kickboxing Juniorzy'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-74kg',
    result: null,
  },
  {
    id: 5,
    name: 'John Doe',
    groups: [{name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-74kg',
    result: null,
  },
  {
    id: 6,
    name: 'Karol Nowak',
    groups: [{name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-63kg',
    result: null,
  },
  {
    id: 7,
    name: 'Karol Nowak',
    groups: [{name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-63kg',
    result: 1,
  },
  {
    id: 8,
    name: 'Karol Nowak',
    groups: [{name: 'Kickboxing Kadeci', uid: 'Kickboxing Kadeci'}],
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    age_category: 'Junior',
    formula: 'Light Contact',
    weight_or_height_category: '-63kg',
    result: null,
  },
];

export {ageCategoryOptions, columns, formulaOptions, groupsOptions, users};
