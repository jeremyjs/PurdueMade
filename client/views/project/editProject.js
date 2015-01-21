
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

