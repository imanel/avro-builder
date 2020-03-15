import React from 'react';

import RecordField from './Record'

const getType = (type) => {
  if (typeof type === 'object') {
    return [ "record", RecordField ]
  }

  switch (type) {
    case 'record':
      return [ "record", RecordField ]
    default:
      return [ "type", React.Fragment ]
  }
}

const Field = (params) => {
  const defaultComponent = params.default ? <React.Fragment>, "default": {JSON.stringify(params.default)}</React.Fragment> : null
  const [type, TypeComponent] = getType(params.type)

  return (
    <li>
      &#123;
        "name": "{params.name}",
        "type": "{type}"
        {defaultComponent}
        <TypeComponent {...params} />
      &#125;
    </li>
  )
}

export default Field;
