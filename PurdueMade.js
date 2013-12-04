
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
      template: 'person',
      data: function() {
        person = People.find({id: parseInt(this.params.id, 10)}).fetch();
        return {
          id: person.id,
          name: person.name,
          major: person.major,
          year: person.year,
          bio: person.bio,
          interest: person.interest,
          projects: person.projects,
          pictureUrl: person.pictureUrl,
          profileUrl: person.profileUrl
        };
      }
    });
    this.route('projects', {
      path: '/projects',
      template: 'projects'
    });
    this.route('project', {
      path: '/projects/:id',
      template: 'project'
    });
  });

  Template.homePeople.people = function(){
    return People.find({id: {$lte: 4}}, {limit: 4});
  };
  Template.homeProjects.projects = function(){
    return Projects.find({}, {limit: 4});
  };

  Template.people.people = function(){
    return People.find();
  };
  Template.projects.projects = function(){
    return Projects.find();
  };

  onLinkedInLoad = function() {
      IN.Event.on(IN, 'auth', onLinkedInAuth);
  };

  onLinkedInAuth = function() {
    IN.API.Profile('me').fields(['firstName', 'lastName', 'industry', 'pictureUrl', 'skills', 'id', 'siteStandardProfileRequest'])
                  // .params({'start': 10, 'count': 5})
                  .result(onLinkedInProfile)
                  .error(onLinkedInProfileError);
    // IN.API.Connections('me').fields('firstName', 'lastName', 'industry', 'pictureUrl', 'skills')
    //              .params({'start': 0, 'count': 25})
    //              .result(displayProfiles)
    //              .error(displayProfilesErrors);
    // IN.API.MemberUpdates("me").result(onLinkedInUpdate);
  };

  onLinkedInProfile = function(profile) {
    profile = profile.values[0];
    console.log(profile);
    skills = [];
    for(var i=0; i < profile.skills.values.length; i++){
      skills[skills.length] = profile.skills.values[i].skill.name;
    }
    p = {
      id: profile.id,
      name: profile.firstName + ' ' + profile.lastName,
      skills: skills,
      industry: profile.industry,
      pictureUrl: profile.pictureUrl,
      profileUrl: profile.siteStandardProfileRequest.url
    };
    if(People.find({memberId: profile.id}).count() === 0){
      People.insert(p);
    }
  };

  onLinkedInProfileError = function(err) {
    console.log(err);
  };

  onLinkedInUpdate = function(result) {
    alert(result);
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // LinkedIn API Authentication
    // API Key (clientId): 774knwz4aoj84b
    // Secret Key (secret): 18Odf7J6JuGn9UaU
    // OAuth User Token: 67cee328-15c9-460e-9f7e-dbe5e527bb34
    // OAuth User Secret: 55b807e9-e05a-4c85-a2d4-fc3c73acba97
    Accounts.loginServiceConfiguration.remove({
      service: "linkedin"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "linkedin",
      clientId: "774knwz4aoj84b",
      secret: "18Odf7J6JuGn9UaU"
    });
    
    // Prepopulate users database
    People.remove({});
    People.insert({id: 1, name:'Chris MacPherson', major:'Finance', year: 2014, bio:'Chris raised his first round of investment capital when he was nineteen. He is a wizard with a spreadsheet and understands how to make sure money is always flowing to the right place. He happens to be a kick ass graphic designer and has designed products that have grossed thousands in sales.', interest: 'Design', projects: ['Cloudware'], pictureUrl: "images/photos/team-1.png"});
    People.insert({id: 2, name:'Andrew Linfoot', major:'Industrial Engineering', year: 2014, bio:'A passionate entrepreneur, Andrew has experience building businesses in industries spanning everything from biotech to energy supplements to software development. He can do a little bit of everything but nothing that well, hence why he surrounds himself by those who are the best at what they do.', interest: 'Business Software', projects: ['Cloudware'], pictureUrl: "images/photos/team-2.png"});
    People.insert({id: 3, name:'Jeremy Meyer', major:'Computer Science', year: 2015, bio:'Jeremy has been programming since he was 14 years old. He has a passion for developing quality software and has experience ranging from database design to front-end user experience and everything in between.', interest: 'Software', projects: ['Cloudware'], pictureUrl: "images/photos/team-3.png"});
    People.insert({id: 4, name:'Steve Webster', major:'Sales Management', year: 2016, bio:'Steve has a vast array of experience from serving on Hobart College’s budget committee to doing a stint as a production manager for the Wendy WIlliams Show. He has a passion for music and can shred on guitar.', interest: 'Business', projects: ['Cloudware'], pictureUrl: "images/photos/team-4.png"});
    
    // Prepopulate projects database
    Projects.remove({});
    Projects.insert({id: 1, name: 'Cloudware', type: 'Software', pictureUrl: 'images/projects/app-1.png',
                     description: ''});
    Projects.insert({id: 2, name: 'HomeOffice', type: 'Business', pictureUrl: 'images/projects/app-2.png'});
    Projects.insert({id: 3, name: 'FruitOrama', type: 'Design', pictureUrl: 'images/projects/app-3.png'});
    Projects.insert({id: 4, name: 'Prolift', type: 'Business', pictureUrl: 'images/projects/app-4.png'});
  
  });
}
