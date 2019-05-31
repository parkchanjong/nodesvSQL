var db = require('./db');
var template = require('./template.js');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	db.query(`SELECT * FROM topic WHERE title=?`, [queryData.id], function(error, topics) {
		db.query('SELECT * FROM author', function(error2, authors) {
			console.log(topics[0]);
			console.log(authors);
			var title = 'Search';
			var list = template.list(topics);
			var html = template.HTML(
				sanitizeHtml(title),
				list,
				`<h2>${title}</h2>   
                    안됨        
            `,
				`<a href="/create">create</a>`
			);
			response.writeHead(200);
			response.end(html);
		});
	});
};

exports.empty = function(request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	db.query(`SELECT * FROM topic`, function(error, topics) {
		db.query('SELECT * FROM author', function(error2, authors) {
			var title = 'No data';
			var description = 'no data';
			var list = template.list(topics);
			var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
			response.writeHead(200);
			response.end(html);
		});
	});
};
