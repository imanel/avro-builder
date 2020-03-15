import React from 'react';

import RecordField from './Record'
import { useStore } from 'store'
import { changeName, changeType } from 'store/actions'

const Field = (props) => {
  const [, dispatch] = useStore()

  const { name, type, default: defaultValue } = props

  const defaultComponent = defaultValue ? <React.Fragment>, "default": {JSON.stringify(defaultValue)}</React.Fragment> : null
  const TypeComponent = type === 'record' ? RecordField : null

  return (
    <li>
      &#123;
        "name": <input type="text" defaultValue={name} onChange={(evt) => changeName(dispatch, props.id, evt.target.value)} />,
        "type": <input type="text" defaultValue={type} onChange={(evt) => changeType(dispatch, props.id, evt.target.value)} />
        {defaultComponent}
        {TypeComponent ? <TypeComponent {...props} /> : null}
      &#125;
    </li>
  )
}

export default Field;
