import React from 'react';

import Field from 'components/Field'
import { useStore } from 'store'
import { getFields } from 'store/selectors'

const FieldList = ({ parentId }) => {
  const [store] = useStore()
  const fields = getFields(store, parentId)

  return (
    <ul>
      {fields.map(field => <Field {...field} key={field.id} />)}
    </ul>
  )
}

export default FieldList
