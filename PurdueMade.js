
Users = new Meteor.Collection("users");

if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "Welcome to PurdueMade.";
  // };

  // Template.hello.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });

  Template.profilesView.people = function () {
    return Users.find();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
    // Prepopulate users database
    Users.insert({id: 1, name:"Joe", major:"Industrial Engineering", year: 2013, bio:"My name is Joe. I like to work on stuff.", interests: ["Apps", "Business Development"], projects: ["PGE"]});
    Users.insert({id: 2, name:"Joe", major:"Industrial Engineering", year: 2013, bio:"My name is Joe. I like to work on stuff.", interests: ["Apps", "Business Development"], projects: ["PGE"]});
    Users.insert({id: 3, name:"Joe", major:"Industrial Engineering", year: 2013, bio:"My name is Joe. I like to work on stuff.", interests: ["Apps", "Business Development"], projects: ["PGE"]});
  });
}
