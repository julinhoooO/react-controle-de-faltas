export default class DisciplinaSchema {
  static schema = {
    name: 'Disciplina',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'int',
        indexed: true,
      },
      name: 'string',
      miss_quantity: 'int',
      maximum_miss: 'int',
    },
  };
}
