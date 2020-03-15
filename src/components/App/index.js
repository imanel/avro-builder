import React from 'react';
import Field from 'components/Field'
import './App.css';

// Source: https://docs.oracle.com/database/nosql-12.1.3.0/GettingStartedGuide/avroschemas.html
const example = {
  "type": "record",
  "name": "userInfo",
  "namespace": "my.example",
  "fields": [
    { "name": "username", "type": "string", "default": "NONE" },
    { "name": "age", "type": "int", "default": -1 },
    { "name": "phone", "type": "string", "default": "NONE" },
    { "name": "housenum", "type": "string", "default": "NONE" },
    { "name": "address", "default": {}, "type": { "type": "record", "name": "mailing_address", "fields": [
      { "name": "street", "type": "string", "default": "NONE" },
      { "name": "city", "type": "string", "default": "NONE" },
      { "name": "state_prov", "type": "string", "default": "NONE" },
      { "name": "country", "type": "string", "default": "NONE" },
      { "name": "zip", "type": "string", "default": "NONE" }
    ]}}
  ]
}

function App() {
  return (
    <ul>
      <Field field={example} />
    </ul>
  );
}

export default App;
