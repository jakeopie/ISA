var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "loginpage",
        "home/:id"          : "home",
        "signup"            : "signup",
        "opps/page/:page"	: "list",
        "opps/add"         : "addOpp",
        "opps/:id"         : "oppDetails",
        "about"             : "about"
    },

    home: function (id) {

        var user = new User({id: id});
        user.fetch({success: function(){
        this.headerView = new HeaderView({model : user});
            $('#header').html(this.headerView.el);
            $("#content").html(new OppListView({page: 1, user: user}).el);

            this.headerView.selectMenuItem('home-menu');
        }});    
    },

    header: function () {
        $('#header').html(new HeaderView().el);
    },

    signup: function () {
        $('#content').html(new SignupView().el);
    },

    loginpage: function () {    
        $('#content').html(new LoginView().el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var oppsList = new OppCollection();
        oppsList.fetch({success: function(){
            $("#content").html(new OppListView({model: oppsList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    oppDetails: function (id) {
        var opp = new Opp({id: id});
        opp.fetch({success: function(){
            $("#content").html(new OppView({model: opp}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addOpp: function() {
        var opp = new Opp();
        $('#content').html(new OppView({model: opp}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

//utils.loadTemplate(['HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
//});