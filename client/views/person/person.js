// People Template Helpers
Template.people.people = function(){
  return People.find();
};

// Person Template Helpers
Template.person.person = function(){
  return People.findOne({id: Session.get('profileId')});
};
Template.person.projects = function(){
  person = People.findOne({id: Session.get('profileId')});
  if(person.projects){
    return Projects.find({id: {$in: person.projects}});
  }
  else{
    return [];
  }
};
Template.editProfile.events({
  'click #save' : function(){
    person = {};
    person._id = People.findOne({id: Session.get('profileId')})._id;
    person.major = $('#major').value();
    person.year = $('#year').value();
    person.bio = $('#bio').value();
    interests = [];
    // for each interest, interests.push(interest);
    for(var i=0; i < 6; i++){
      // loop
    }
    person.interests = interests;
    Meteor.call('savePerson', person);
    if(Session.get('firstLogin')){
      Session.set('firstLogin', false);
      Router.go('feed');
    }
    else{
      Router.go('person', {id: Session.get('userId')});
    }
  },
  'click #sendMessage' : function(){
    person = People.findOne({id: Session.get('profileId')});
    jsonString = JSON.stringify({
      "recipients": {
        "values": [{
          "person": {
            "_path": "/people/email=" + person.email,
            "first-name": person.firstName,
            "last-name": person.lastName
          }
        }]
      },
      "subject": $('#subject').value(), // "Invitation to Connect"
      "body": $('#body').value(), // "I'd like to connect on LinkedIn through PurdueMade."
      "item-content": {
        "invitation-request": {
          "connect-type": "friend"
        }
      }
    });
    // REST call to send message
    IN.API.Raw("/people/~/mailbox")
          .method("POST")
          .body(jsonString)
          .result(onMessageSent)
          .error(function error(e) { alert(e); });
  }

});
