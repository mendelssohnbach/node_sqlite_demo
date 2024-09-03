# Node.js on Sqlite

## Docs

- Sqlite: 
https://nodejs.org/docs/latest/api/sqlite.html?utm_source

- .env 
https://nodejs.org/docs/latest/api/process.html#processenv

- test runner
https://nodejs.org/docs/latest/api/test.html

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

### Use test runner

package.json

```json
  "scripts": {
    "node:test": "node --test --watch",
    "node:coverage": "node --test --experimental-test-coverage"
  },
```

src/example.test.mjs

```JavaScript

import {describe, test} from 'node:test'
import assert from "node:assert/strict"

function compare(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Not a number')
    }

    if (a > b) return 1;
    if (a < b) return -1
    return 0
}

// The test suite
describe('compare() 関数のテストを行う', () => {
    test('a が b より大きい場合、1 を返す', () => {
        const result = compare(2, 1)
        assert.equal(result, 1)
    })
})

```

console

```terminal
$ npm run node:test

> node_sqlite_demo@1.0.0 node:test
> node --test --watch

▶ compare() 関数のテストを行う
  ✔ a が b より大きい場合、1 を返す (1.068673ms)
▶ compare() 関数のテストを行う (2.53577ms)
ℹ tests 1
ℹ suites 1
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 103.432043
^C
```

```
$ npm run node:coverage

> node_sqlite_demo@1.0.0 node:coverage
> node --test --experimental-test-coverage

▶ compare() 関数のテストを行う
  ✔ a が b より大きい場合、1 を返す (1.553704ms)
▶ compare() 関数のテストを行う (3.54724ms)
ℹ tests 1
ℹ suites 1
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 136.958122
ℹ start of coverage report
ℹ ---------------------------------------------------------------------
ℹ file                 | line % | branch % | funcs % | uncovered lines
ℹ ---------------------------------------------------------------------
ℹ src/example.test.mjs |  80.95 |    66.67 |  100.00 | 7-8 11-12
ℹ ---------------------------------------------------------------------
ℹ all files            |  80.95 |    66.67 |  100.00 |
ℹ ---------------------------------------------------------------------
ℹ end of coverage report
```
