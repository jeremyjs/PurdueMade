
Template.project.helpers({

  project: function(){
    return Projects.findOne({id: Session.get('profileId')});
  },

  team: function(){
    project = Projects.findOne({id: Session.get('profileId')});
    return People.find({id: {$in: project.team}});
  },

  following: function(){
    followers = Projects.findOne({id: Session.get('profileId')}).followers;
    var ret = followers.indexOf(Session.get('userId')) > 0;
    console.log('following: ', ret);
    return ret;
  },

  numFollowers: function () {
    return Projects.findOne({id: Session.get('profileId')}).followers.length;
  }

});

Template.project.events({

  'click #follow' : function(){
    Meteor.call('followProject', Session.get('profileId'), Session.get('userId'));
  },

  'click #unfollow' : function(){
    Meteor.call('unfollowProject', Session.get('profileId'), Session.get('userId'));
  }

});

