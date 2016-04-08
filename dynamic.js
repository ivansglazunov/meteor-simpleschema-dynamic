// new SimpleSchema.Dynamic();
SimpleSchema.Dynamic = class {
	constructor() {
		this.types = [];
	};
	
	// Generate schema based on types.
	// dynamic.schema(types: String|[String]) => SimpleSchema
	schema(types) {
		var _types = [];
		// Array type
		if (lodash.isString(types)) {
			var _types = [types];
		} else if (lodash.isArray(types)) {
			var _types = types;
		} else throw new Meteor.Error('Unexpected types.');
		
		var _schemas = [];
		for (var v in _types) {
			if (!(_types[v] in this.types))
				throw new Meteor.Error('Type is not defined.');
			else {
				_schemas.push(this.types[_types[v]]);
			}
		}
		
		return new SimpleSchema(_schemas);
	};
	
	// dynamic.field(typeKey: String) => custom: Function
	field(typeKey) {
		var dynamic = this;
		return function() {
			var typeField = this.field(typeKey);
			try {
				var schema = this.schema(typeField);
			} catch(error) {
				return 'notAllowed';
			}
			var context = schema.newContext();
			if (!context.validate(this.value)) {
				return 'notAllowed';
			}
		};
	};
}