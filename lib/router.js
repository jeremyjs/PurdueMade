
Router.configure({
  layoutTemplate: 'layout'
  //  notFoundTemplate: 'notFound'
});

Router.route('/', function() {
  this.render('home');
}, { name: 'home' });

Router.route('/feed');

Router.route('/people');

Router.route('/people/me', function() {
  Session.set('profileId', Session.get('userId'));
  this.render('person');
});

Router.route('/people/:id', function() {
  Session.set('profileId', this.params.id);
  this.render('person');
});

Router.route('/people/me/edit', function() {
  console.log('Session.get("userId"): ', Session.get("userId"));
  this.render('editPerson', {
    data: function() {
      return People.findOne(Session.get('userId'));
    }
  });
});

Router.route('/projects');

Router.route('/projects/:id', function() {
  Session.set('profileId', this.params.id);
  this.render('project');
});

Router.route('/projects/:id/edit', function() {
  var projectId = this.params.id;
  this.render('editProject', {
    data: function() {
      return Projects.findOne(projectId);
    }
  });
});

Router.route('/projects/new', function() {
  this.render('newProject');
});

Router.route('/contact');

