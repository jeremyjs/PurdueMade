
Template.navbar.helpers({

  loggedIn: function(){
    return Session.get('loggedIn');
  }

});

Template.navbar.events({

  'click #logoutButton': function(e) {
    e.preventDefault();
    IN.User.logout();
    Session.set('userId', null);
    Session.set('loggedIn', false);
    Router.go('/');
  }

});

