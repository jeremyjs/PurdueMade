if( Meteor.isClient ) {
  Template.navbar.loggedIn = function(){
    return Session.get('loggedIn');
  };
  Template.homePeople.people = function(){
    return People.find({}, {limit: 4});
  };
  Template.homeProjects.projects = function(){
    return Projects.find({}, {limit: 4});
  };
}
