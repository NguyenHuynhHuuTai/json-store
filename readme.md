# json-store

> Simple data persistence for your project or module - Save and load user preferences, app state, cache, etc

---

<br>

## Install

```
$ npm install json-store
```

## Usage

```js
const Store = require('json-store');
const option = { 
	cwd: 'your-path', 
	name: 'config' 
}
const store = new Store(option);

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined
```

## API

Changes are written to disk atomically, so if the process crashes during a write, it will not corrupt the existing config.

### Store(options?)

Returns a new instance.

### options

Type: `object`

#### defaults

Type: `object`

Default values for the store items.

**Note:** The values in `defaults` will overwrite the `default` key in the `schema` option.

#### schema

type: `object`

[JSON Schema](https://json-schema.org) to validate your config data.

Under the hood, the JSON Schema validator [ajv](https://github.com/epoberezkin/ajv) is used to validate your config. We use [JSON Schema draft-07](http://json-schema.org/latest/json-schema-validation.html) and support all [validation keywords](https://github.com/epoberezkin/ajv/blob/master/KEYWORDS.md) and [formats](https://github.com/epoberezkin/ajv#formats).

You should define your schema as an object where each key is the name of your data's property and each value is a JSON schema used to validate that property. See more [here](https://json-schema.org/understanding-json-schema/reference/object.html#properties).

Example:

```js
const Store = require('json-store');

const schema = {
	foo: {
		type: 'number',
		maximum: 100,
		minimum: 1,
		default: 50
	},
	bar: {
		type: 'string',
		format: 'url'
	}
};

const option = { 
	cwd: 'your-path', 
	name: 'config',
	schema: schema
};
const store = new Store(option);

console.log(store.get('foo'));
//=> 50

store.set('foo', '1');
// [Error: Config schema violation: `foo` should be number]
```