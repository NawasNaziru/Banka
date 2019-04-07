var saveToken = function (token) {
  localStorage.setItem("banka-token", token);
};

var getToken = function () {
  return localStorage.getItem("banka-token");
};

var isLoggedIn = function() {
  var token = getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

var currentUser = function() {
  if(isLoggedIn()){
    var token = getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return {
      email : payload.email,
      name : payload.name
    };
  }
};

var logout = function() {
  localStorage.removeItem('banka-token');
};


document.forms['signupFormId'].addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO do something here to show user that form is being submitted
 fetch(event.target.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target)) // event.target is the form
  }).then(resp => resp.json()).then(function(json){
    saveToken(json.token);
    //console.log(json);
    document.getElementById('signup-msg').innerHTML = "Wow! You have Successfully registered!";
    
    //alert(json);
  }).catch(error =>
      // TODO handle error 
      //console.log(error);
      alert("there was a problem")
 );
 // alert("stopped");
});