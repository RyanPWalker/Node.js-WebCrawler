var Crawler = require("crawler");

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 0,

    // This will be called for each crawled page 
    callback: function(error, res, done) {
        if (error) {
            console.log('ERROR: ' + error + '\n' + 'Status Code: ' + res.statusCode + '\n');
        } else {
            var $ = res.$;
            var link;

            $('a').each(function(i, elem) {
                link = $(this).attr('href');
                console.log(link);
                c.queue(link);
            });
            console.log('\n' + 'END OF PAGE -- ' + res.options.uri + ' -- Status Code: ' + res.statusCode + '\n');
        }
        done();
    }
});

c.queue('http://www.google.com');