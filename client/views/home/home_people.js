
Template.homePeople.people = function(){
  return People.find({}, {limit: 4});
};

