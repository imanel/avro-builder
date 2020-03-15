import React from 'react'

import FieldList from 'components/FieldList'
import { useStore } from 'store'
import { changeDefaultValue } from 'store/actions'

const RecordType = ({ id, parentId, default: defaultValue }) => {
  const [, dispatch] = useStore()
  const DefaultField = <React.Fragment>, "default": <input type="text" value={defaultValue} onChange={(evt) => changeDefaultValue(dispatch, id, evt.target.value)} /></React.Fragment>

  return (
    <React.Fragment>
      {parentId ? DefaultField : null}
      , "fields": [
        <FieldList parentId={id} />
      ]
    </React.Fragment>
  )
}

export default RecordType;
