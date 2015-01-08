
Meteor.startup(function() {
  Session.setDefault('page', 'home');
  Session.setDefault('profileId', '0');
  Session.setDefault('userId', '0');
  Session.setDefault('projectId', '0');
  Session.setDefault('loggedIn', false);
  Session.setDefault('firstLogin', true);
});