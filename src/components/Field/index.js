import React from 'react';

const Field = ({ field: { type, name, default: defaultValue, fields = [] }}) => {
  let recordName = null

  if (typeof type === 'object') {
    fields = type.fields || []
    recordName = type.name
    type = 'record'
  }

  const defaultComponent = defaultValue ? <React.Fragment>, "default": {JSON.stringify(defaultValue)}</React.Fragment> : null
  const recordNameComponent = recordName ? <React.Fragment>, "recordName": "{recordName}"</React.Fragment> : null

  const fieldsComponent = fields.length === 0 ? <React.Fragment>&nbsp;</React.Fragment> : (
    <React.Fragment>
      , "fields": [
        <ul>
          { fields.map((field,index) => (<Field key={index} field={field} />)) }
        </ul>
      ]
    </React.Fragment>
  )

  return (
    <li>
      &#123;
        "name": "{name}",
        "type": "{type}"
        {recordNameComponent}
        {defaultComponent}
        {fieldsComponent}
      &#125;
    </li>
  )
}

export default Field;
