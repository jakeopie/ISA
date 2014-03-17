// Models
window.Opp = Backbone.Model.extend({
    urlRoot:'/saopps',


    initialize: function () {
        this.validators = {};

        this.validators.oppID = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a Opp ID"};
        };

        this.validators.SA = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must assign to SA"};
        };

        this.validators.AM = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must assign to AM"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }

    /*defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null

        SA: 				'string',	
	  	AM: 				'string',
	  	clientName: 		'string',	
	  	oppID:          	'string',	
	  	assignedDate:   	'date',	
	  	requestType:    	'string',	
	  	assignedStatus: 	'string',	
	  	reqGathered:        'boolean',	
	  	diagramComplete: 	'boolean',	
	  	toComplete: 		'boolean',	
	  	submittedDate: 		'date',	
	  	iterations:   		'integer',	
	  	comments:       	'string',	
	  	currenthours:   	'integer',	
	  	descrip:        	'string',	
	  	consultingOnly: 	'boolean',	
	  	value:          	'integer',	
	  	solComplex:     	'string',	
	  	priority:       	'string',
	  	predictedHours: 	'integer',	
	  	dueDate:        	'date',	
	  	RFPQI:          	'boolean',	
	  	marketSeg: 			'string',	
	  	region: 			'string',	
	  	deadOpp:        	'boolean',	
	  	duration:   		'integer',	
	  	czLink: 			'string'
    }*/
    
});
 
window.OppCollection = Backbone.Collection.extend({
    model:Opp,
    url: '/saopps'
});

window.UserOppCollection = Backbone.Collection.extend({
    model:Opp,

    url: function() {
        console.log("fetching new list of opps for "+ this.userName + " page: "+ this.page);
        return '/saopps/user?userName=' + this.userName + '&page=' + this.page
    },

    userName: null,
    page: 0
    
});

window.OpenUserOppCollection = Backbone.Collection.extend({
    model:Opp,

    url: function() {
        console.log("fetching new list of open opps for "+ this.userName + " page: "+ this.page);
        return '/saopps/openUser?userName=' + this.userName + '&page=' + this.page
    },

    userName: null,
    page: 0
    
});

window.ClosedUserOppCollection = Backbone.Collection.extend({
    model:Opp,

    url: function() {
        console.log("fetching new list of open opps for "+ this.userName + " page: "+ this.page);
        return '/saopps/closedUser?userName=' + this.userName + '&page=' + this.page
    },

    userName: null,
    page: 0
    
});

window.UserReg = Backbone.Model.extend({
    urlRoot:'/user/signup'

});

window.User = Backbone.Model.extend({
    urlRoot:'/user'
});

window.Session = Backbone.Model.extend({
    urlRoot:'/session/create'



});
