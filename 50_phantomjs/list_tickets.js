var page = require('webpage').create();
page.open('https://coconet2.capgemini.com/sf/projects/fr_ad_t30_drupal_factory/', function () {
    var title = page.evaluate(function () {
		console.log('Title: ' + title);
        return document.title;

    });
});


phantom.exit();