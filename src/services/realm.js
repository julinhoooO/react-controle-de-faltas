import Realm from 'realm';

import DisciplinaSchema from '../schemas/DisciplinaSchemas';
import GradeSchema from '../schemas/GradeSchemas';

export default function getRealm() {
  return Realm.open({
    schema: [DisciplinaSchema, GradeSchema],
  });
}
