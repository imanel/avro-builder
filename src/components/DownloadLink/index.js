import React from 'react';

import { useStore } from 'store'
import { getFields } from 'store/selectors'

const convertField = (store, field) => {
  const convertedField = { ...field }
  const parentId = convertedField.parentId

  switch (convertedField.type) {
    case 'record':
      convertedField.fields = convertForParent(store, convertedField.id)
      if (!parentId) {
        delete convertedField.default
        delete convertedField.recordName
        break
      }
      convertedField.default = JSON.parse(convertedField.default)
      convertedField.type = {
        type: 'record',
        name: convertedField.recordName,
        fields: convertedField.fields
      }
      delete convertedField.recordName
      delete convertedField.fields
      break
    default:
      break
  }

  const nullable = convertedField.nullable
  if (nullable && parentId) {
    convertedField.type = ["null", convertedField.type]
    convertedField.default = null
  }

  delete convertedField.id
  delete convertedField.parentId
  delete convertedField.nullable

  return convertedField
}

const convertForParent = (store, parentId) => {
  const children = getFields(store, parentId)
  return children.map(field => convertField(store, field))
}

const storeToAvro = (store) => convertForParent(store)[0]

const FieldList = ({ parentId }) => {
  const [store] = useStore()
  const avro = storeToAvro(store)
  const serializedAvro = JSON.stringify(avro, undefined, 2)
  const prefix = "data:text/plain;charset=utf-8,"
  const url = prefix + encodeURIComponent(serializedAvro)

  return (
    <a download={"schema.avsc"} href={url}>Export</a>
  )
}

export default FieldList
