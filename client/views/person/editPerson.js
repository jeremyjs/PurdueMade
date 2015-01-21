
Template.editPerson.events({

  'click #save' : function(e) {
    e.preventDefault();
    var person = People.findOne({id: Session.get('userId')});
    console.log('before: ', person);
    person.update({
      major: $('#major').val(),
      year: $('#year').val()
    });

    Router.go('/people/me');
  }

});
