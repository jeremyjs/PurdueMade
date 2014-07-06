if( Meteor.isClient ) {
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
}
