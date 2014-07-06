if (Meteor.isClient) {
  // Project Template Helpers
  Template.project.project = function(){
    return Projects.findOne({id: Session.get('profileId')});
  };
  Template.project.team = function(){
    project = Projects.findOne({id: Session.get('profileId')});
    return People.find({id: {$in: project.team}});
  };
  Template.project.following = function(){
    followers =  Projects.findOne({id: Session.get('profileId')}).followers;
    console.log(followers.indexOf({id: Session.get('userId')}));
    if(followers.indexOf({id: Session.get('userId')}) >= 0){
      return true;
    }
    else{
      return false;
    }
  };
  Template.project.numFollowers = function(){
    return Projects.findOne({id: Session.get('profileId')}).followers.length;
  };
  Template.project.events({
    'click #follow' : function(){
      Meteor.call('followProject', Session.get('profileId'), Session.get('userId'));
    },
    'click #unfollow' : function(){
      project = Projects.findOne({id: Session.get('profileId')});
      userId = Session.get('userId');
      Meteor.call('unfollowProject', project._id, userId);
    }
  });

  // Edit Project Template Helpers
  Template.editProject.events({
    'click #save' : function(){
      project = {};
      project._id = Projects.findOne({id: Session.get('projectId')})._id;
      project.name = $('#name').value();
      project.type = $('#type').value();
      project.pictureUrl = $('#pictureUrl').value();
      project.description = $('#description').value();
      team = [];
      // for each team member, team.push(person);
      project.team = team;
      Meteor.call('saveProject', project);
      Router.go('project', {id: Session.get('projectId')});
    }
  });

  // Projects Template Helpers
  Template.projects.projects = function(){
    return Projects.find();
  };

  onLinkedInLoad = function() {
      IN.Event.on(IN, 'auth', onLinkedInAuth);
  };

  onLinkedInAuth = function() {
    Session.set('loggedIn', true);
    IN.API.Profile('me').fields(['firstName', 'lastName', 'industry', 'pictureUrl', 'skills', 'id', 'siteStandardProfileRequest'])
                  .result(onLinkedInProfile)
                  .error(function(err) { console.log(err); });
    IN.API.Raw("/people/~/email-address")
          .result(function(result) { console.log(result); })
          .error(function(err) { console.log(err); });
    // IN.API.Connections('me').fields('firstName', 'lastName', 'industry', 'pictureUrl', 'skills')
    //              .params({'start': 0, 'count': 25})
    //              .result(displayProfiles)
    //              .error(function(err) { console.log(err); });
  };

  onLinkedInProfile = function(profile) {
    profile = profile.values[0];
    console.log(profile);
    Session.set('userId', profile.id);
    skills = [];
    for(var i=0; i < profile.skills.values.length; i++){
      skills[skills.length] = profile.skills.values[i].skill.name;
    }
    p = {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      skills: skills,
      industry: profile.industry,
      pictureUrl: profile.pictureUrl,
      profileUrl: profile.siteStandardProfileRequest.url
    };
    if(People.find({id: p.id}).count() === 0){
      People.insert(p);
      Router.go('editProfile');
    }
    else{
      Session.set('firstLogin', false);
      Router.go('home');
    }
  };

  onLinkedInProfileError = function(err) {
    console.log(err);
  };

  onMessageSent = function(result) {
    console.log(result);
    // Update page to reflect invitation sent
  };
}
