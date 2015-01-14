
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
  profile = profile.values[0];
  console.log(profile);
  Session.set('userId', profile.id);
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
  if(People.find({id: p.id}).count() === 0){
    People.insert(p);
    Router.go('editProfile');
  }
  else{
    Session.set('firstLogin', false);
    Router.go('home');
  }
};

onLinkedInProfileError = function(err) {
  console.log(err);
};

onMessageSent = function(result) {
  console.log(result);
  // Update page to reflect invitation sent
};

