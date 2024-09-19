# Simple-JsonDB
A simple database made by using json files
NPM page can be found at https://www.npmjs.com/package/@silver-3/simple-jsondb

### Install
```bash
npm install @silver-3/simple-jsondb
```


### Import
```js
const jsonDB = require('@silver-3/simple-jsondb');
const db = new jsonDB('FILE PATH'); // File path is optional, default is ./db.json
```


### Examples
```js
db.set('key', 'value'); // Sets a value to the key
db.get('key'); // Gets the value of the key
db.fetch('key'); // Fetches the value of the key
db.has('key'); // Check if key exists
db.delete('key'); // Delete a key
db.clear(); // Clear the database
db.deleteAll(); // Delete everything from the database
db.all(); // View everything in the database
db.add('key', 1); // Add to a value
db.subtract('key', 1); // Subtract from a value
db.push('key', 'item'); // Add an item to an array
db.unpush('key', 'item'); // Remove an item from an array
```