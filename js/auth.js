

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



const auth = firebase.auth();
const db = firebase.firestore();


    function signOut(){
     auth.signOut();
     window.location.replace("login.html")
     alert('signed Out')
 }
    function ifuser(){
        auth.onAuthStateChanged(function(user){
            if(user){
            window.location.href = "profile.html"
        }else{
            document.getElementsByClassName(".account-detail").style.display = "none"  
        }
        })
    }

    
    function showCart(){
        auth.onAuthStateChanged(function(user){
            if(user){
            document.getElementById("profileEdit").style.display = "block";
            }else{
            alert("user not signed in.");
            window.location.replace("login.html");
        }
        });
        }
        
    function hideAddProfileData(){
        document.getElementById("profileEdit").style.display = "none";
        }


        function onlineOPD(){
            
            auth.onAuthStateChanged(function(user){

                if(user){
                    if(document.getElementById("Mode").value == "chat"){
                        var method = document.getElementById("method-chat").value;
                    }
                    else if(document.getElementById("Mode").value == "call"){
                        var method = document.getElementById("method-call").value;
                    }
                    else if(document.getElementById("Mode").value == "video"){
                        var method = document.getElementById("method-video").value;
                    }
                    db.collection('users').doc(user.uid).collection('appointments').add({
                        PatientName : document.getElementById("Pname").value,
                        Mobile : document.getElementById("mobileno").value,
                        Mode : document.getElementById("Mode").value,
                        Platform : method,
                        date : document.getElementById("txtdate").value, 

                    }).then(function(){
                        alert("data uploaded Successfully. please go to cart to complete your appointment ");
                        window.location.reload();
                    })
                }else{
                    alert("no active user");
                }
            })
        }
        