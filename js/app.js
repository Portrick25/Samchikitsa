
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB2MAuoYNwlnfE7D3DUFF0ksTq52inDdmY",
    authDomain: "samchikitsa-8ae9a.firebaseapp.com",
    databaseURL: "https://samchikitsa-8ae9a.firebaseio.com",
    projectId: "samchikitsa-8ae9a",
    storageBucket: "samchikitsa-8ae9a.appspot.com",
    messagingSenderId: "151461880341",
    appId: "1:151461880341:web:3a6fbdaa6d75229d9ee41c",
    measurementId: "G-XGTMGR77Z4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    const db = firebase.firestore();
    const auth = firebase.auth();
  document.cookie = 'cross-site-cookie=bar; SameSite=None and Secure';
 


  auth.onAuthStateChanged(function(user){
    if(user){ 
        if(user.email){
            document.getElementById("myprofile").innerHTML = user.email;
        }
        if(user.phone){
            document.getElementById("myprofile").innerHTML = user.phone;
        }
    }
    })

function ifuser(){
    
    auth.onAuthStateChanged(function(user){
    if(user){ 
        window.location.replace("profile.html")
    }else{
        window.location.replace("login.html")
    }
}) 

}

/*
  auth.onAuthStateChanged(function(user){
    if(user){
        document.getElementById("mdh").disabled = true;  
    }
})
*/

function signUp(){
   var email =  document.getElementById("email");
   var password =  document.getElementById("password");
   var cpassword = document.getElementById("cpassword");

   if(cpassword.value != password.value){
     alert("two passwords doesn't match")
   }else{

   const promise = auth.createUserWithEmailAndPassword(email.value, password.value).then(cred =>{
      return db.collection("users").doc(cred.user.uid).set({
        email : cred.user.email
      }).then(function(){
        alert('signed UP successfully');
      })
      
   });
   promise.catch(e =>alert(e.message));


  }
}


function signIn(){
    var email =  document.getElementById("email");
    var password =  document.getElementById("password");
 
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(function(){
      window.location.replace("userVerify.html")
    }).catch(e =>alert(e.message));

 }


 function signOut(){
     auth.signOut();
     window.location.replace("login.html")
     alert('signed Out')
 }


function FBsignIn(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then(function(result){
        var token = result.credential.accessToken;
        var user = result.user;
      window.location.replace('profile.html')
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(errorMessage)
        // ...
      });
}

googleSignIn=()=>{
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function(result){
      return db.collection("users").doc(result.user.uid).set({
        email : result.user.email,
      }).then(function(){
        console.log("success. google account linked")
        window.location.replace("profile.html")
      })
      
    }).catch(function(err){
    })
}

