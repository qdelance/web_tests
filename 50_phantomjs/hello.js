var page = require('webpage').create();
page.open('http://www.bing.com', function () {

	var input = page.evaluate(function () {
		return document.getElementById('sb_form_q');
	});
	console.log('input: ' + input);
	input.value = 'toulouse'
	
	/*var button = page.evaluate(function () {
		return document.getElementById('sb_form_go');
	});
	console.log('button: ' + button);
	button.click();*/
	
	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
            $('#sb_form_go').click();
        });
		page.render('bing.png');
		console.log('bing.png should have been created, exiting...');
		phantom.exit();

	});
	

});