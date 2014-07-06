Router.configure({
  layoutTemplate: 'layout'
  //  notFoundTemplate: 'notFound'
});
Router.map(function () {
  this.route('home', {
    path: '/'
  });
  this.route('feed', {
    path: '/feed'
  });
  this.route('people', {
    path: '/people'
  });
  this.route('person', {
    path: '/people/:id',
    template: 'person',
    onBeforeAction: function() {
      Session.set('profileId', this.params.id);
    }
  });
  this.route('editProfile', {
    path: '/editProfile'
  });
  this.route('projects', {
    path: '/projects',
    template: 'projects'
  });
  this.route('project', {
    path: '/projects/:id',
    template: 'project',
    onBeforeAction: function() {
      Session.set('profileId', this.params.id);
    }
  });
  this.route('contact', {
    path: '/contact'
  });
});
