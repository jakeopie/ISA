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
		console.log("find ALL opps ");
  		res.send(opps);

  	});

  },

  openUser: function(req, res){

  	Saopps.find({
  		SA: req.param('userName'), toComplete: false }).limit(15).skip(req.param('page')*15).done( function foundUserOpps(err, opps) {
		
		console.log("find OPEN opps ");
  		res.send(opps);

  	});
  	

  },
  
  closedUser: function(req, res){

  	Saopps.find({
  		SA: req.param('userName'), toComplete: true }).limit(15).skip(req.param('page')*15).done( function foundUserOpps(err, opps) {
		
		console.log("find CLOSED opps ");
  		res.send(opps);

  	});
  	

  }

};
