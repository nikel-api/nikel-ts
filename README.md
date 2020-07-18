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

// Traditional syntax
new Courses().where({id: 'mat135'}).get()
    .then(res => console.log(JSON.stringify(res, null, 4)));
```

### Current list of endpoints

* Courses
* Textbooks
* Exams
* Evals
* Food
* Services
* Buildings
* Parking

### Methods

Each endpoint has the same set of methods.

`where(query)`: Adds `query` to the list of existing queries.

`limit(integer)`: Sets the number of items returned to `integer`.

`offset(integer)`: Sets the offset of the items returned to `integer`.

`get()`: Returns a Promise wrapped with the queried items.

`reset()`: Resets query and also sets meta-data (limit and offset) to defaults.

### MongoDB-like Queries

| Operator | String        | Numerical / Boolean      |
|----------|---------------|--------------------------|
| `$eq`    | Equality      | Equality                 |
| `$ne`    | Inequality    | Inequality               |
| `$in`    | Fuzzy Search  | N/A                      |
| `$lt`    | N/A           | Less than                |
| `$lte`   | N/A           | Less than or equal to    |
| `$gt`    | N/A           | Greater than             |
| `$gte`   | N/A           | Greater than or equal to |
| `$sw`    | Starts with   | N/A                      |
| `$ew`    | Ends with     | N/A                      |
| `$sr`    | Serialization | N/A                      |

Example:
```typescript
// Fuzzy search for "mat135" in id for "St. George" campus
{
    id: {'$in': 'mat135'},
    campus: {'$eq': 'St. George'}
}
```

### Traditional Queries

https://docs.nikel.ml/docs/query_guide

Example:
```typescript
// Fuzzy search for "mat135" in id for "St. George" campus
{
    id: 'mat135',
    campus: '=St. George'
}
```