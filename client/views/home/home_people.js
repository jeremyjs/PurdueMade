
Template.homePeople.helpers({
  people:function(){
    return People.find({}, {limit: 4});
  }
});

