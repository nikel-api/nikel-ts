# Nikel API for Node.js

[![npm](https://img.shields.io/npm/v/nikel)](https://www.npmjs.com/package/nikel)

Please consult the [official Nikel API docs](https://docs.nikel.ml/) for additional information on query values, and response values.

### Install:
```
npm install nikel
```

### Example Usage:

```typescript
// TypeScript (highly encouraged)
import {Courses} from 'nikel';

// JavaScript
const {Courses} = require('nikel');

// MongoDB-like syntax (highly encouraged)
new Courses().where({id: {'$in': 'mat135'}}).get()
    .then(res => console.log(JSON.stringify(res, null, 4)));

// Legacy syntax
new Courses().where({id: 'mat135'}).get()
    .then(res => console.log(JSON.stringify(res, null, 4)));
```