export default class GradeSchema {
  static schema = {
    name: 'Grade',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'int',
        indexed: true,
      },
      id_disciplina: 'int',
      name: 'string',
      grade: 'string',
      maximum_grade: 'string',
    },
  };
}
