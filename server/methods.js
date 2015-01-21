
Meteor.methods({

  clearFeed : function() {
    Feed.remove({});
  },

  insertFeedItem : function(item) {
    Feed.insert(item);
  },

  savePerson : function(person) {
    People.update(person._id, {
      major: person.major,
      year: person.year,
      bio: person.bio
    });
  },

  saveProject : function(project) {
    Projects.update(project._id, {
      name: project.name,
      type: project.type,
      pictureUrl: project.pictureUrl,
      description: project.description,
      team: project.team
    });
  },

  clearSkills : function() {
    Skills.remove({});
  },

  insertSkill : function(item) {
    Skills.insert({skill: item});
  },

  clearInterests : function() {
    Interests.remove({});
  },

  insertInterest : function(item) {
    Interests.insert({interest: item});
  },

  clearPictures : function() {
    Pictures.remove({});
  },

  insertPicture : function(item) {
    Pictures.insert(item);
  },

  followProject : function(projectId, userId) {
    Projects.update({id: projectId}, {$addToSet: { followers: userId }});
  },

  unfollowProject : function(projectId, userId) {
    Projects.update({id: projectId}, {$pull: { followers: userId }});
  }

});

