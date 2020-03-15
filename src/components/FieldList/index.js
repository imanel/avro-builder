import React from 'react';

import Field from 'components/Field'
import { useStore } from 'store'
import { addField } from 'store/actions'
import { getFields } from 'store/selectors'

const FieldList = ({ parentId }) => {
  const [store, dispatch] = useStore()
  const fields = getFields(store, parentId)

  return (
    <ul>
      {fields.map(field => <Field {...field} key={field.id} />)}
      {!parentId ? null :
        <li className={"add"} onClick={() => addField(dispatch, parentId)}>&#43; add</li>
      }
    </ul>
  )
}

export default FieldList
