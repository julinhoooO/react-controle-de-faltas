import Realm from 'realm';

import DisciplinaSchema from '../schemas/DisciplinaSchemas';
import GradeSchema from '../schemas/GradeSchemas';
import EventSchema from '../schemas/EventSchema';

export default function getRealm() {
  return Realm.open({
    schema: [DisciplinaSchema, GradeSchema, EventSchema],
  });
}
