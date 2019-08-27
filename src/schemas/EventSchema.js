export default class EventSchema {
  static schema = {
    name: 'Event',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'int',
        indexed: true,
      },
      disciplina: 'string',
      name: 'string',
      date: 'date',
    },
  };
}
