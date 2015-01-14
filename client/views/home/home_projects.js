
Template.homeProjects.projects = function(){
  return Projects.find({}, {limit: 4});
};

