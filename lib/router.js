Router.configure({
  layoutTemplate: 'layout'
  //  notFoundTemplate: 'notFound'
});

Router.route('/', function() {
  this.render('home');
}, { name: 'home' });

Router.route('/feed');

Router.route('/people');

Router.route('/people/:id', function() {
  Session.set('profileId', this.params.id);
  this.render('person');
});

Router.route('/editProfile');

Router.route('/projects');

Router.route('/projects/:id', function() {
  Session.set('profileId', this.params.id);
  this.render('project');
});

Router.route('/contact');
