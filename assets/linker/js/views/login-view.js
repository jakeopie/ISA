

window.LoginView= Backbone.View.extend({

    initialize:function () {
        this.template = _.template(JST['assets/linker/templates/tpl-main-view.html']());
        this.model = new Session();
         _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.render();
    },

    render:function () {
        
        $(this.el).html(this.template);
        return this;
    },

    events: {

        "click .login"    : "login", 
        "click .signup"   : "signup"
    },

    signup: function(e){

        app.navigate('#signup', true);

    },

    login: function(e) {

        var self = this,
        el = $(this.el);

        e.preventDefault();

        this.model.set({email: $("#email").val(), password: $("#password").val()});

        this.model.save(null, {
          success: function(response) {

            console.log("BB user found with ID: " + response.id);


            app.navigate('#home/'+ response.id, true);

            //el.find('input.btn-primary').button('reset');
            //BD.currentUser = new BD.Models.User(response);
            //BD.vent.trigger("authentication:logged_in");
          },
          error: function(response) {

            console.log($.parseJSON(response));
            //el.find('form').prepend(BD.Helpers.Notifications.error(result.error));
            //el.find('input.btn-primary').button('reset');
          }
        });

    } 

});