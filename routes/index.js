var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('views/index.html');

});

/* POST vote. */
router.post('/vote', function(req, res, next) {
    var userAgentString = req.headers['user-agent'];
    var email = req.body.email;

    var options = {
        url: 'http://datamovement.co.uk/wp-admin/admin-ajax.php',
        method: 'POST',
        form: {
        action: 'voteme_addvote',
        postid: '227'
        },
        headers: {
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate",
            "Accept-Language":"en-US,en;q=0.8,en-GB;q=0.6",
            "Cache-Control":"no-cache",
            "Connection":"keep-alive",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "Host":"datamovement.co.uk",
            "Origin":"http://datamovement.co.uk",
            "Pragma":"no-cache",
            "Referer":"http://datamovement.co.uk/entries/",
            "User-Agent":userAgentString,
            "X-Requested-With":"XMLHttpRequest"
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // :D
            console.log(response.statusCode);
            console.log(body);
            //console.log(response);

            var emailPostOptions = {
                url: 'http://datamovement.co.uk/wp-admin/admin-ajax.php',
                method: 'POST',
                form: {
                action: 'voteme_enteremail',
                email: email,
                entryid: '227'
                },
                headers: {
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate",
                    "Accept-Language":"en-US,en;q=0.8,en-GB;q=0.6",
                    "Cache-Control":"no-cache",
                    "Connection":"keep-alive",
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                    "Host":"datamovement.co.uk",
                    "Origin":"http://datamovement.co.uk",
                    "Pragma":"no-cache",
                    "Referer":"http://datamovement.co.uk/entries/",
                    "User-Agent":userAgentString,
                    "X-Requested-With":"XMLHttpRequest"
                }
            };

            function emailCallback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // :D
                    console.log(response.statusCode);
                    console.log(body);
                    res.sendStatus(200);


                } else {
                    console.log(response.statusCode);
                    console.log(error);
                    res.sendStatus(400);
                }
            }

            request(emailPostOptions, emailCallback);

        } else {
            console.log(response.statusCode);
            console.log(error);
            res.sendStatus(400);
        }
    }

    request(options, callback);

});



module.exports = router;
