var db = require('./db');
var template = require('./template.js');

exports.up = function(request, response) {
	db.query(`SELECT * FROM topic ORDER BY id ASC`, function(error, topics) {
		var title = 'Welcome';
		var description = 'Hello, Node.js';
		var list = template.list(topics);
		var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
		response.writeHead(200);
		response.end(html);
	});
};

exports.down = function(request, response) {
	db.query(`SELECT * FROM topic ORDER BY id DESC`, function(error, topics) {
		var title = 'Welcome';
		var description = 'Hello, Node.js';
		var list = template.list(topics);
		var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
		response.writeHead(200);
		response.end(html);
	});
};
