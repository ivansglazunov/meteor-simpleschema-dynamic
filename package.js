Package.describe({
	name: 'ivansglazunov:simpleschema-dynamic',
	version: '0.0.3',
	summary: 'Dynamic SimpleSchema value typing for different documents.',
	git: 'https://github.com/ivansglazunov/meteor-simpleschema-dynamic',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	
	api.use('ecmascript');
	api.use('check');
	
	api.use('aldeed:collection2@2.9.0');
	api.use('stevezhu:lodash@4.5.6');
	
	api.addFiles('dynamic.js');
});