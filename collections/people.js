
People = new Meteor.Collection('people');

People.helpers({

  update: function(fields) {
    People.update(this._id, { $set: fields });
  }

});

