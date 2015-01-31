
Template.newProject.helpers({
  people: function () {
    return People.find();
  }
});

Template.newProject.events({
  'click #save' : function() {
    project = {};
    project.name = $('#name').value();
    // project.type = $('#type').value();
    project.pictureUrl = $('#pictureUrl').value();
    project.description = $('#description').value();
    team = [];
    // for each team member, team.push(person);
    project.team = team;
    Meteor.call('saveProject', project);
    Router.go('/projects/' + Session.get('projectId'));
  }
});
