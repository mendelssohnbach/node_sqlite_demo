# Node.js on Sqlite

## Docs

https://nodejs.org/docs/latest/api/sqlite.html?utm_source=bhdouglass.com

## Experimental environment

```text
$ node -v
v22.7.0
```

## Code and log

### Use SQLite.

package.json

```json
"scripts": {
  "node:sql": "node --experimental-sqlite"
},
```

src/index.mjs

```JavaScript
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');

database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);

const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');

insert.run(1, 'hello');
insert.run(2, 'world');
insert.run(3, '!');

const query = database.prepare('SELECT * FROM data ORDER BY key DESC');

console.log(query.all());

```

console

```terminal
$ npm run node:sql src/index.mjs

> node_sqlite_demo@1.0.0 node:sql
> node --experimental-sqlite src/index.mjs

[
  { key: 3, value: '!' },
  { key: 2, value: 'world' },
  { key: 1, value: 'hello' }
]
(node:2153301) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
```
### USe .env

package.json

```json
"scripts": {
  "node:env": "node --env-file=.env"
},
```

src/sample.mjs

```JavaScript
const password = process.env.DB_PASSWORD
console.log(password)

```

console

```terminal
 $ npm run node:env src/sample.mjs 

> node_sqlite_demo@1.0.0 node:env
> node --env-file=.env src/sample.mjs

SECRET_WORD
```
