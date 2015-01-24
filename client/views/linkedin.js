
function stylizeLinkedinButton() {
  $('.linkedin-button > a').css('height', '50px');
  $('.IN-widget, .IN-widget span').css('height', '20px');
  $link = $('.IN-widget > span > span > a');
  $link.html('sign in with linkedin')
       .css('font-size', '13px')
       .css('color', '#9d9d9d')
       .css('line-height', '20px')
       .hover(function() {
          $(this).css('color', '#fff');
        }, function() {
          $(this).css('color', '#9d9d9d');
        });
  $('.linkedin-button').css('display', '');
};

onLinkedInLoad = function() {
  IN.Event.on(IN, 'auth', onLinkedInAuth);
  stylizeLinkedinButton();
};

onLinkedInAuth = function() {
  Session.set('loggedIn', true);
  IN.API.Profile('me').fields(['firstName', 'lastName', 'summary', 'industry', 'pictureUrl', 'skills', 'id', 'siteStandardProfileRequest', 'picture-urls::(original)'])
    .result(onLinkedInProfile)
    .error(function(err) { console.log(err); });
  IN.API.Connections('me').fields('firstName', 'lastName', 'industry', 'pictureUrl', 'skills')
    .params({'start': 0, 'count': 25})
    .result(function(result) { console.log(result); })
    .error(function(err) { console.log(err); });
};

onLinkedInProfile = function(res) {
  var profile = res.values[0];
  profile.pictureUrl = profile.pictureUrls.values[0];
  var id = profile.id;
  Session.set('userId', id);

  console.log(profile);

  if(People.findOne({ id: id })) return;

  // else first time logging in
  var skills = profile.skills.values.map(function(item, index) {
    return item.skill.name;
  });

  var p = {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    skills: skills,
    bio: profile.summary,
    industry: profile.industry,
    pictureUrl: profile.pictureUrl,
    profileUrl: profile.siteStandardProfileRequest.url
  };

  People.insert(p);
  Router.go('/people/me/edit');
};

