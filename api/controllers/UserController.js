/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  login: function (req, res) {
    
  },

  signup: function (req, res) {
  		
      console.log('signup');

      var userObj = {
        //name: req.param('name'),
        //title: req.param('title'),
        email: req.param('email'),
        password: req.param('password'),
        confirmation: req.param('confirmation')
      }

      User.create(userObj, function userCreated(err, user) {

        // // If there's an error
        // if (err) return next(err);

        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }

          // If error redirect back to sign-up page
          return res.redirect('/');
        }

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;



        // Change status to online
        user.online = true;
        user.save(function(err, user) {
          if (err) return next(err);

        // add the action attribute to the user object for the flash message.
        user.action = " signed-up and logged-in."

        // Let other subscribed sockets know that the user was created.
        //User.publishCreate(user);

          // After successfully creating the user
          // redirect to the show action
          // From ep1-6: //res.json(user); 

          console.log("usercreated with ID: " + user.id);

          res.send(req.session.User);
          //res.redirect('/user/show/' + user.id);
        });
    });

}
  

};
