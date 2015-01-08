
var p = {};

function displayMyProfile(profile){
  profile = profile.values[0];
    console.log("My Profile: " + profile);
    myProfileDiv = document.getElementById('myProfile');
    myProfileDiv.innerHTML = myProfileDiv.innerHTML +
      '<div class="media"><a class="pull-left" href="#"><img class="media-object" src="' +
      profile.pictureUrl +
      '"/></a><div class="media-body"><h4 class="media-heading">' +
      profile.firstName + ' ' + profile.lastName + '</h4><p><i>' +
      profile.industry + '</i><br/>';
    skills = profile.skills.values;
    console.log(skills);
    for(var j=0; j < skills.length; j++){
      allSkills[allSkills.length] = skills[j].skill.name;
      // Skills.insert({name: skills[j].skill.name});
      myProfileDiv.innerHTML = myProfileDiv.innerHTML + skills[j].skill.name + ', ';
    }
    myProfileDiv.innerHTML = myProfileDiv.innerHTML + '</p></div></div>';
    hackerScore(profile);
}

function displayMyProfileError(error) {
  myProfileDiv = document.getElementById('myProfile');
  myProfileDiv.innerHTML = '<p>Error fetching profile</p>';
  console.log(error);
}

function displayProfiles(profiles) {
    members = People.find({});
    console.log(members);
    profilesDiv = document.getElementById('profiles');
    members.forEach(function(member){
      profilesDiv.innerHTML = profilesDiv.innerHTML +
        '<div class="media" id="connection' + member.memberId + '"><a class="pull-left" href="#"><img class="media-object" src="' + member.pictureUrl +
        '"/></a><div class="media-body"><h4 class="media-heading">' +
        member.name + '</h4><p><i>' +
        member.industry + '</i><br/><div id="hackerScore">' +
        member.hackerScore + '</div><div id="hipsterScore">' +
        member.hipsterScore + '</div><div id="hustlerScore">' +
        member.hustlerScore + '</div><br/>';
      skills = member.skills;
      console.log(skills);
      // for(var j=0; j < skills.length; j++){
      //  // profilesDiv.innerHTML = profilesDiv.innerHTML + skills[j].skill.name + '<br/>';
      // }
      profilesDiv.innerHTML = profilesDiv.innerHTML + '</p></div></div>';
    });
}

function displayProfilesErrors(error) {
  profilesDiv = document.getElementById('profiles');
  profilesDiv.innerHTML = '<p>Error fetching profiles</p>';
  console.log(error);
}
