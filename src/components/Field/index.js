import React from 'react';

import RecordField from './Record'
import { useStore } from 'store'
import { changeName, changeType, removeField } from 'store/actions'

const Field = (props) => {
  const [, dispatch] = useStore()

  const { name, type } = props

  let TypeComponent = null

  switch (type) {
    case 'record': TypeComponent = RecordField; break
    default: break
  }

  return (
    <li>
      {!props.parentId ? null :
        <span className={"remove"} onClick={() => removeField(dispatch, props.id)}>x&nbsp;</span>
      }
      &#123;
        "name": <input type="text" defaultValue={name} onChange={(evt) => changeName(dispatch, props.id, evt.target.value)} />,
        "type": <input type="text" defaultValue={type} onChange={(evt) => changeType(dispatch, props.id, evt.target.value)} />
        {TypeComponent ? <TypeComponent {...props} /> : null}
      &#125;
    </li>
  )
}

export default Field;
