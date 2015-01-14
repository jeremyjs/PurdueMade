
Template.person.helpers({

  person: function(){
    return People.findOne({id: Session.get('profileId')});
  },

  projects: function(){
    person = People.findOne({id: Session.get('profileId')});
    if(person.projects){
      return Projects.find({id: {$in: person.projects}});
    }
    else{
      return [];
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

