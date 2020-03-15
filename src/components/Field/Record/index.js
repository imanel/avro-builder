import React from 'react';
import Field from '../'

const RecordType = ({ type, fields = [] }) => {
  let recordName = null

  if (typeof type === 'object') {
    fields = type.fields || []
    recordName = type.name
    type = 'record'
  }

  const recordNameComponent = recordName ? <React.Fragment>, "recordName": "{recordName}"</React.Fragment> : null

  const fieldsComponent = fields.length === 0 ? <React.Fragment>&nbsp;</React.Fragment> : (
    <React.Fragment>
      , "fields": [
        <ul>
          { fields.map((field,index) => (<Field key={index} {...field} />)) }
        </ul>
      ]
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {recordNameComponent}
      {fieldsComponent}
    </React.Fragment>
  )
}

export default RecordType;
