
Router.configure({
  layoutTemplate: 'layout'
  //  notFoundTemplate: 'notFound'
});

Router.route('/', function() {
  if(Session.get('loggedIn')) {
    this.redirect('/people/' + Session.get('userId'));
  } else {
    this.render('home');
  }
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
  this.render('editPerson');
});

Router.route('/projects');

Router.route('/projects/:id', function() {
  Session.set('profileId', this.params.id);
  this.render('project');
});

Router.route('/contact');

