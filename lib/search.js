var db = require('./db');
var template = require('./template.js');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	db.query(`SELECT * FROM topic WHERE title=?`, [queryData.id], function(error, topics) {
		if (error) {
			throw error;
		}
		db.query(
			`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE title=?`,
			[queryData.id],
			function(error2, topic) {
				if (error2) {
					throw error2;
				}
				var title = topic[0].title;
				var description = topic[0].description;
				var list = template.list(topics);
				var html = template.HTML(
					title,
					list,
					`
           <h2>${sanitizeHtml(title)}</h2>
           ${sanitizeHtml(description)}
           <p>by ${sanitizeHtml(topic[0].name)}</p>
           `,
					` <a href="/create">create</a>
               <a href="/update?id=${queryData.id}">update</a>
               <form action="delete_process" method="post">
                 <input type="hidden" name="id" value="${queryData.id}">
                 <input type="submit" value="delete">
               </form>`
				);
				response.writeHead(200);
				response.end(html);
			}
		);
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
