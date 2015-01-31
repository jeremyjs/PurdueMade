
Template.editPerson.helpers({
  major: function () {
    console.log('this: ', this);
    return this.major;
  }
});

Template.editPerson.events({

  'click #save' : function(e) {
    e.preventDefault();
    var person = People.findOne({id: Session.get('userId')});
    console.log('before: ', person);

    var major = $('#major').val();
    var year = $('#year').val();

    if(!year || !major) {
      $('.notice').html("Major and year are required");
      return false;
    }

    person.update({
      major: major,
      year: year
    });

    Router.go('/people/me');
  }

});

