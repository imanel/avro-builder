import React from 'react'

import FieldList from 'components/FieldList'

const RecordType = ({ id, recordName }) => {
  const recordNameComponent = recordName ? <React.Fragment>, "recordName": "{recordName}"</React.Fragment> : null

  return (
    <React.Fragment>
      {recordNameComponent}
      , "fields": [
        <FieldList parentId={id} />
      ]
    </React.Fragment>
  )
}

export default RecordType;
