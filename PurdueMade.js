
People = new Meteor.Collection('people');
Projects = new Meteor.Collection('projects');
Feed = new Meteor.Collection('feed');
Pictures = new Meteor.Collection('pictures');

if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.setDefault('page', 'home');
    Session.setDefault('profileId', '0');
    Session.setDefault('userId', '0');
    Session.setDefault('projectId', '0');
    Session.setDefault('loggedIn', false);
  });

  Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
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
      before: function() {
        Session.set('profileId', parseInt(this.params.id));
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
      before: function() {
        Session.set('profileId', parseInt(this.params.id));
      }
    });
  });

  // Home Template Helpers
  Template.navbar.loggedIn = function(){
    return Session.get('loggedIn');
  };
  Template.homePeople.people = function(){
    return People.find({id: {$lte: 4}}, {limit: 4});
  };
  Template.homeProjects.projects = function(){
    return Projects.find({}, {limit: 4});
  };

  // Person Template Helpers
  Template.feed.feed = function(){
    // Clear feed
    Meteor.call('clearFeed');

    // Insert recent people
    People.find().forEach(function(person){
      // Can this be done better?
      person.isPerson = true;
      Meteor.call('insertFeedItem', person);
    });

    // Insert recent projects
    Projects.find().forEach(function(project){
      // Can this be done better?
      project.isPerson = false;
      Meteor.call('insertFeedItem', project);
    });

    // Return feed items by recency
    return Feed.find({}, {sort: [['created', 'desc']], limit: 6});
  };

  // Person Template Helpers
  Template.person.person = function(){
    return People.findOne({id: Session.get('profileId')});
  };
  Template.editProfile.events({
    'click #save' : function(){
      person = {};
      person._id = People.findOne({id: Session.get('profileId')})._id;
      person.major = $('#major').value();
      person.year = $('#year').value();
      person.bio = $('#bio').value();
      interests = [];
      // for each interest, interests.push(interest);
      person.interests = interests;
      Meteor.call('savePerson', person);
      Router.go('person', {id: Session.get('userId')});
    },
    'click #sendMessage' : function(){
      person = People.findOne({id: Session.get('profileId')});
      jsonString = JSON.stringify({
        "recipients": {
          "values": [{
            "person": {
              "_path": "/people/email=" + person.email,
              "first-name": person.firstName,
              "last-name": person.lastName
            }
          }]
        },
        "subject": $('#subject').value(), // "Invitation to Connect"
        "body": $('#body').value(), // "I'd like to connect on LinkedIn through PurdueMade."
        "item-content": {
          "invitation-request": {
            "connect-type": "friend"
          }
        }
      });
      // REST call to send message
      IN.API.Raw("/people/~/mailbox")
            .method("POST")
            .body(jsonString)
            .result(onMessageSent)
            .error(function error(e) { alert(e); });
    }

  });

  // Project Template Helpers
  Template.project.project = function(){
    return Projects.findOne({id: Session.get('profileId')});
  };
  Template.project.pictures = function(){
    Meteor.call('clearPictures');
    Projects.findOne({id: Session.get('profileId')}).pictureUrlList.forEach(function(pictureUrl, index, array){
      picture = {
        pictureUrl: pictureUrl
      }
      if(index == 0){
        picture.firstItem = true;
      }
      else{
        picture.firstItem = false;
      }
      Meteor.call('insertPicture', picture);
    });
    return Pictures.find();
  };
  Template.project.team = function(){
    project = Projects.findOne({id: Session.get('profileId')});
    return People.find({id: {$in: project.team}});
  };
  Template.project.events({
    'click #follow' : function(){
      project = Projects.findOne({id: Session.get('profileId')});
      userId = Session.get('userId');
      Meteor.call('followProject', project._id, userId);
    }
  });

  // Edit Project Template Helpers
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

  // People Template Helpers
  Template.people.people = function(){
    return People.find();
  };

  // Projects Template Helpers
  Template.projects.projects = function(){
    return Projects.find();
  };

  onLinkedInLoad = function() {
      IN.Event.on(IN, 'auth', onLinkedInAuth);
  };

  onLinkedInAuth = function() {
    Session.set('loggedIn', true);
    IN.API.Profile('me').fields(['firstName', 'lastName', 'industry', 'pictureUrl', 'skills', 'id', 'siteStandardProfileRequest'])
                  .result(onLinkedInProfile)
                  .error(function(err) { console.log(err); });
    IN.API.Raw("/people/~/email-address")
          .result(function(result) { console.log(result); })
          .error(function(err) { console.log(err); });
    // IN.API.Connections('me').fields('firstName', 'lastName', 'industry', 'pictureUrl', 'skills')
    //              .params({'start': 0, 'count': 25})
    //              .result(displayProfiles)
    //              .error(function(err) { console.log(err); });
  };

  onLinkedInProfile = function(profile) {
    Session.set('userId', profile.id);
    console.log(profile);
    profile = profile.values[0];
    skills = [];
    for(var i=0; i < profile.skills.values.length; i++){
      skills[skills.length] = profile.skills.values[i].skill.name;
    }
    p = {
      id: profile.id,
      firstName: profile.firstName, 
      lastName: profile.lastName,
      skills: skills,
      industry: profile.industry,
      pictureUrl: profile.pictureUrl,
      profileUrl: profile.siteStandardProfileRequest.url
    };
    if(People.find({id: profile.id}).count() === 0){
      People.insert(p);
      Router.go('editProfile');
    }
    else{
      Router.go('feed');
    }
  };

  onLinkedInProfileError = function(err) {
    console.log(err);
  };

  onMessageSent = function(result) {
    console.log(result);
    // Update page to reflect invitation sent
  };
}

if (Meteor.isServer) {

  Meteor.methods({
    clearFeed : function() {
      Feed.remove({});
    },
    insertFeedItem : function(item) {
      Feed.insert(item);
    },
    savePerson : function(person) {
      People.update(person._id, {
        major: person.major,
        year: person.year,
        bio: person.bio,
        interests: person.interests
      });
    },
    saveProject : function(project) {
      Projects.update(project._id, {
        name: project.name,
        type: project.type,
        pictureUrl: project.pictureUrl,
        description: project.description,
        team: project.team
      });
    },
    clearPictures : function() {
      Pictures.remove({});
    },
    insertPicture : function(item) {
      Pictures.insert(item);
    },
    followProject : function(projectId, userId) {
      Projects.update(projectId, {$push: {$each: [{followers: userId}], $sort: 1}});
    }
  });

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

    People.insert({
      id: 1,
      firstName:'Chris',
      lastName:'MacPherson',
			major:'Finance',
			year: 2014,
			bio:'Chris raised his first round of investment capital when he was nineteen. He is a wizard with a spreadsheet and understands how to make sure money is always flowing to the right place. He happens to be a kick ass graphic designer and has designed products that have grossed thousands in sales.',
			interests: ['Design'],
			projects: ['Cloudware'],
			pictureUrl: '/images/photos/team-1.png',
      email: 'cmfake256@purdue.edu',
      created: '2011-12-04'
    });
    People.insert({
			id: 2,
      firstName:'Andrew',
      lastName:'Linfoot',
			major:'Industrial Engineering',
			year: 2014,
			bio:'A passionate entrepreneur, Andrew has experience building businesses in industries spanning everything from biotech to energy supplements to software development. He can do a little bit of everything but nothing that well, hence why he surrounds himself by those who are the best at what they do.',
			interest: 'Business Software',
			projects: ['Cloudware'],
			pictureUrl: '/images/photos/team-2.png',
      email: 'alfake256@purdue.edu',
      created: '2012-04-13'
    });
    People.insert({
			id: 3,
      firstName:'Jeremy',
      lastName:'Meyer',
			major:'Computer Science',
			year: 2015,
			bio:'Jeremy has been programming since he was 14 years old. He has a passion for developing quality software and has experience ranging from database design to front-end user experience and everything in between.',
			interests: ['Software'],
			projects: ['Cloudware'],
			pictureUrl: '/images/photos/team-3.png',
      email: 'jmfake256@purdue.edu',
      created: '2012-12-04'
    });
    People.insert({
			id: 4,
      firstName:'Steve',
      lastName:'Webster',
			major:'Sales Management',
			year: 2016,
			bio:'Steve has a vast array of experience from serving on Hobart College’s budget committee to doing a stint as a production manager for the Wendy WIlliams Show. He has a passion for music and can shred on guitar.',
			interests: ['Business'],
			projects: ['Cloudware'],
			pictureUrl: '/images/photos/team-4.png',
      email: 'swfake256@purdue.edu',
      created: '2013-12-02'
    });
    
    // Prepopulate projects database
    Projects.remove({});

    Projects.insert({
			id: 1,
			name: 'Cloudware',
			type: 'Software',
			pictureUrl: '/images/projects/app-1.png',
      pictureUrlList: ['/images/projects/app-1.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: [1, 2, 3],
      followers: [2, 3],
      created: '2013-10-28'
    });
    Projects.insert({
			id: 2,
			name: 'HomeOffice',
			type: 'Business',
			pictureUrl: '/images/projects/app-2.png',
      pictureUrlList: ['/images/projects/app-2.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: [2, 3],
      followers: [1, 3],
      created: '2012-12-04'
    });
    Projects.insert({
			id: 3,
			name: 'FruitOrama',
			type: 'Design',
			pictureUrl: '/images/projects/app-3.png',
      pictureUrlList: ['/images/projects/app-3.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: [2, 3, 4],
      followers: [1, 2, 3, 4],
      created: '2013-05-21'
    });
    Projects.insert({
			id: 4,
			name: 'Prolift',
			type: 'Business',
      pictureUrl: '/images/projects/app-4.png',
      pictureUrlList: ['/images/projects/app-4.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: [1, 2, 3, 4],
      followers: [4],
      created: '2013-12-04'
    });
  
  });
}
