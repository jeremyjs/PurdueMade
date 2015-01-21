
Projects = new Meteor.Collection('projects');
Feed = new Meteor.Collection('feed');
Skills = new Meteor.Collection('skills');
Interests = new Meteor.Collection('interests');

if (Meteor.isServer) {
  Meteor.startup(function() {
    // Prepopulate users database
    People.remove({});

    People.insert({
      id: '1',
      firstName:'Chris',
      lastName:'MacPherson',
      major:'Finance',
      year: 2014,
      bio:'Chris raised his first round of investment capital when he was nineteen. He is a wizard with a spreadsheet and understands how to make sure money is always flowing to the right place. He happens to be a kick ass graphic designer and has designed products that have grossed thousands in sales.',
      skills: [],
      interests: ['Design', 'Web Apps'],
      projects: ['1', '4'],
      pictureUrl: '/images/photos/team-1.png',
      email: 'cmfake256@purdue.edu',
      created: '2011-12-04'
    });
    People.insert({
      id: '2',
      firstName:'Andrew',
      lastName:'Linfoot',
      major:'Industrial Engineering',
      year: 2014,
      bio:'A passionate entrepreneur, Andrew has experience building businesses in industries spanning everything from biotech to energy supplements to software development. He can do a little bit of everything but nothing that well, hence why he surrounds himself by those who are the best at what they do.',
      skills: ['Building Empires'],
      interests: ['Business', 'Software'],
      projects: ['1', '2', '3', '4'],
      pictureUrl: '/images/photos/team-2.png',
      email: 'alfake256@purdue.edu',
      created: '2012-04-13'
    });
    People.insert({
      id: '3',
      firstName:'Jeremy',
      lastName:'Meyer',
      major:'Computer Science',
      year: 2015,
      bio:'Jeremy has been programming since he was 14 years old. He has a passion for developing quality software and has experience ranging from database design to front-end user experience and everything in between.',
      skills: ['Coding', 'A Little Biz Dev', 'Front-End'],
      interests: ['Software'],
      projects: ['1', '2', '3', '4'],
      pictureUrl: '/images/photos/team-3.png',
      email: 'jmfake256@purdue.edu',
      created: '2012-12-04'
    });
    People.insert({
      id: '4',
      firstName:'Steve',
      lastName:'Webster',
      major:'Sales Management',
      year: 2016,
      bio:'Steve has a vast array of experience from serving on Hobart College’s budget committee to doing a stint as a production manager for the Wendy WIlliams Show. He has a passion for music and can shred on guitar.',
      skills: ['Biz Dev', 'Not Much Else'],
      interests: ['Business'],
      projects: ['3', '4'],
      pictureUrl: '/images/photos/team-4.png',
      email: 'swfake256@purdue.edu',
      created: '2013-12-02'
    });

    // Prepopulate projects database
    Projects.remove({});

    Projects.insert({
      id: '1',
      name: 'Cloudware',
      type: 'Software',
      pictureUrl: '/images/projects/app-1.png',
      pictureUrlList: ['/images/projects/app-1.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: ['1', '2', '3'],
      followers: ['1', '3'],
      created: '2013-10-28'
    });
    Projects.insert({
      id: '2',
      name: 'HomeOffice',
      type: 'Business',
      pictureUrl: '/images/projects/app-2.png',
      pictureUrlList: ['/images/projects/app-2.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: ['2', '3'],
      followers: ['2', '4', '3'],
      created: '2012-12-04'
    });
    Projects.insert({
      id: '3',
      name: 'FruitOrama',
      type: 'Design',
      pictureUrl: '/images/projects/app-3.png',
      pictureUrlList: ['/images/projects/app-3.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: ['2', '3', '4'],
      followers: ['2', '1'],
      created: '2013-05-21'
    });
    Projects.insert({
      id: '4',
      name: 'Prolift',
      type: 'Business',
      pictureUrl: '/images/projects/app-4.png',
      pictureUrlList: ['/images/projects/app-4.png'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptatem porro est adipisci dolor numquam culpa accusamus corrupti fugiat id. Ullam voluptatem aspernatur vel voluptatibus consequuntur reprehenderit praesentium eius animi?',
      team: ['1', '2', '3', '4'],
      followers: ['4'],
      created: '2013-12-04'
    });
  }); // end Meteor.startup
}
