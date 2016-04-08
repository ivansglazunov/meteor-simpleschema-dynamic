# SimpleSchema.Dynamic

Dynamic SimpleSchema value typing for different documents.

You are all so the same can not use these schemes for generating forms automatically, however you can based on the type to choose the desired schema in `dynamic.types`.

## Install

```
meteor add ivansglazunov:simpleschema-dynamic
```

## Examples

```js
// Dynamic schemas storage
var dynamic = new SimpleSchema.Dynamic();

// You custom types

dynamic.types['abc'] = new SimpleSchema({
	abc: {
		type: Number
	}
});
dynamic.types['cde'] = new SimpleSchema({
	cde: {
		type: Boolean
	}
});

var schema = new SimpleSchema({
	// Field for schema type
	fieldSchemaType: {
		type: String,
		optional: true
	},
	// Your custom field
	field: {
		type: Object,
		blackbox: true,
		custom: dynamic.field('fieldSchemaType')
	}
});

var collection = new Mongo.Collection(null);
collection.attachSchema(schema);
collection.insert({
	fieldSchemaType: 'abc',
	field: { abc: 123 }
});
collection.insert({
	fieldSchemaType: 'cde',
	field: { cde: false }
});
```

You can also use multiple typing. Attention! Avoid conflicts on their own.

```js
// Dynamic schemas storage
var dynamic = new SimpleSchema.Dynamic();

// You custom types

dynamic.types['abc'] = new SimpleSchema({
	abc: {
		type: Number
	}
});
dynamic.types['cde'] = new SimpleSchema({
	cde: {
		type: Boolean
	}
});

var schema = new SimpleSchema({
	// Field for schema type
	fieldSchemaType: {
		type: [String], // HERE! Multiple typing!
		optional: true
	},
	// Your custom field
	field: {
		type: Object,
		blackbox: true,
		custom: dynamic.field('fieldSchemaType')
	}
});

var collection = new Mongo.Collection(null);
collection.attachSchema(schema);
collection.insert({
	fieldSchemaType: ['abc', 'cde'],
	field: { abc: 123, cde: false }
});
```