if (Meteor.isServer) {
  UI._allowJavascriptUrls()
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
        bio: person.bio,
        interests: person.interests
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
      Projects.update({id: projectId}, {$addToSet: { followers: {id: userId} }});
    },
    unfollowProject : function(projectId, userId) {
      Projects.update({id: projectId}, {$pull: { followers: {id: userId} }});
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup

    // LinkedIn API Authentication
    // API Key (clientId): 774knwz4aoj84b
    // Secret Key (secret): 18Odf7J6JuGn9UaU
    // OAuth User Token: 67cee328-15c9-460e-9f7e-dbe5e527bb34
    // OAuth User Secret: 55b807e9-e05a-4c85-a2d4-fc3c73acba97
    // Accounts.loginServiceConfiguration.remove({
    //   service: "linkedin"
    // });
    // Accounts.loginServiceConfiguration.insert({
    //   service: "linkedin",
    //   clientId: "774knwz4aoj84b",
    //   secret: "18Odf7J6JuGn9UaU"
    // });
  });
}
