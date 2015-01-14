
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
  }

});

