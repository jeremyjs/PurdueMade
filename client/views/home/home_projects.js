
Template.homeProjects.helpers({
  projects : function() {
    return Projects.find({}, {limit: 4});
  }
});

