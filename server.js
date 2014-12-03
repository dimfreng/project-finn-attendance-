var express = require( "express" );
	talk    = express();

	talk.use( express.static( __dirname + '/client' ));


	talk.listen( 8082,function(request, response){
		console.log("listing");
	});
