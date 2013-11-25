
People = new Meteor.Collection('people');
Projects = new Meteor.Collection('projects');

if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.setDefault('page', 'home');
  });

  Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
  });
  Router.map(function () {
    this.route('home', {
      path: '/'
    });
    this.route('people', {
      path: '/people'
    });
    this.route('person', {
      path: '/people/:id',
      template: 'person'
    });
    this.route('projects', {
      path: '/projects',
      template: 'projects'
    });
    this.route('project', {
      path: '/projects/:id',
      template: 'person'
    });
  });

  Template.people.people = function(){
    return People.find();
  };
  Template.projects.projects = function(){
    return Projects.find();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
    // Prepopulate users database
    People.remove({});
    People.insert({id: 1, name:'Chris MacPherson', major:'Finance', year: 2014, bio:'Chris raised his first round of investment capital when he was nineteen. He is a wizard with a spreadsheet and understands how to make sure money is always flowing to the right place. He happens to be a kick ass graphic designer and has designed products that have grossed thousands in sales.', interest: 'Design', projects: ['Cloudware']});
    People.insert({id: 2, name:'Andrew Linfoot', major:'Industrial Engineering', year: 2014, bio:'A passionate entrepreneur, Andrew has experience building businesses in industries spanning everything from biotech to energy supplements to software development. He can do a little bit of everything but nothing that well, hence why he surrounds himself by those who are the best at what they do.', interest: 'Business Software', projects: ['Cloudware']});
    People.insert({id: 3, name:'Jeremy Meyer', major:'Computer Science', year: 2015, bio:'Jeremy has been programming since he was 14 years old. He has a passion for developing quality software and has experience ranging from database design to front-end user experience and everything in between.', interest: 'Software', projects: ['Cloudware']});
    People.insert({id: 4, name:'Steve Webster', major:'Sales Management', year: 2016, bio:'Steve has a vast array of experience from serving on Hobart College’s budget committee to doing a stint as a production manager for the Wendy WIlliams Show. He has a passion for music and can shred on guitar.', interest: 'Business', projects: ['Cloudware']});
    
    // Prepopulate projects database
    Projects.remove({});
    Projects.insert({id: 1, name:'Cloudware', type: 'Software'});
    Projects.insert({id: 2, name:'HomeOffice', type: 'Business'});
    Projects.insert({id: 3, name:'FruitOrama', type: 'Design'});
    Projects.insert({id: 4, name:'Prolift', type: 'Business'});
  
  });
}
