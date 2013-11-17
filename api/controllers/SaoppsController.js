/**
 * SaoppsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  user: function(req, res){


    //console.log("looking for user: "+req.param('userName'))

  	Saopps.findBySA(req.param('userName')).limit(15).skip(req.param('page')*15).done( function foundUserOpps(err, opps) {
		
  		res.send(opps);

  	});

  }
  

};
