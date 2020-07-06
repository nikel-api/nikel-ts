# Nikel API for Node.js

[![npm](https://img.shields.io/npm/v/nikel)](https://www.npmjs.com/package/nikel)

Please consult the [official Nikel API docs](https://docs.nikel.ml/) for information on query values, and response values.

### Install:
```
npm install nikel
```

### Example Usage:

```typescript
// TypeScript (highly encouraged)
import {Nikel} from 'nikel';

// JavaScript
const {Nikel} = require('nikel');

// Initialize Nikel API client
const client = new Nikel();

// Get courses for id=mat135
client.getCourses({id: "mat135"})
    .then(resp => console.log(JSON.stringify(resp.data.response, null, 4)));
```

### Methods:

Each method uses the following format:

`get<titled_endpoint_name>(params)`

`params` is a key-value object used to filter results.

Please consult the official documentation for all available endpoints.

##### Examples:

`getCourses`

`getTextbooks`

`getExams`
