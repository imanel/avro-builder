import React from 'react';

import RecordField from './Record'

const Field = (props) => {
  const { name, type, default: defaultValue } = props

  const defaultComponent = defaultValue ? <React.Fragment>, "default": {JSON.stringify(defaultValue)}</React.Fragment> : null
  const TypeComponent = type === 'record' ? RecordField : null

  return (
    <li>
      &#123;
        "name": "{name}",
        "type": "{type}"
        {defaultComponent}
        {TypeComponent ? <TypeComponent {...props} /> : null}
      &#125;
    </li>
  )
}

export default Field;
