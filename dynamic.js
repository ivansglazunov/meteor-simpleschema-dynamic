SimpleSchema.Dynamic = class {
	constructor() {
		this.types = [];
	};
	// (typeKey: String) => Function
	field(typeKey) {
		var dynamic = this;
		return function() {
			var typeField = this.field(typeKey);
			
			// Array type
			if (lodash.isString(typeField.value)) {
				var typeValue = [typeField.value];
			} else if (lodash.isArray(typeField.value)) {
				var typeValue = typeField.value;
			} else return 'notAllowed';
			
			var _schemas = [];
			for (var v in typeValue) {
				if (!(typeValue[v] in dynamic.types))
					return 'notAllowed';
				else {
					_schemas.push(dynamic.types[typeValue[v]]);
				}
			}
			
			var schema = new SimpleSchema(_schemas);
			var context = schema.newContext();
			if (!context.validate(this.value)) {
				return 'notAllowed';
			}
		};
	};
}