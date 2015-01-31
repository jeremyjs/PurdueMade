
Template.personBlurb.events({
  'click .person-blurb': function (e) {
    Router.go('/people/' + this.id);
  }
});
