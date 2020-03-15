import React from 'react';

import RecordField from './Record'
import { useStore } from 'store'
import { changeName, changeNullable, changeType, removeField } from 'store/actions'

const supportedTypes = ['boolean', 'int', 'long', 'float', 'double', 'bytes', 'string', 'record', 'enum', 'array', 'map']

const Field = (props) => {
  const [, dispatch] = useStore()

  const { name, nullable, type } = props

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
        "name": <input type="text" value={name} onChange={(evt) => changeName(dispatch, props.id, evt.target.value)} />,
        "type":
        <select value={type} onChange={(evt) => changeType(dispatch, props.id, evt.target.value)}>
          {supportedTypes.map(st => <option key={st} value={st}>{st}</option>)}
        </select>
        {!props.parentId ? null :
          <React.Fragment>, "nullable": <input type="checkbox" checked={nullable} onChange={(evt) => changeNullable(dispatch, props.id)} /></React.Fragment>
        }
        {TypeComponent ? <TypeComponent {...props} /> : null}
      &#125;
    </li>
  )
}

export default Field;
