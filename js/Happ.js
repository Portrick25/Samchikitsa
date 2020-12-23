auth.onAuthStateChanged(function(user){
    if(user){
        //db.collection("users").doc(user.uid).get().then(doc =>{
          //  var phone = (doc.data(users).phone);
            //console.log(user.phone);
           // document.getElementById("age").innerHTML = "User Name: " +age;
            //document.getElementById("userphone").value =phone;
            //})
            var email = user.email;
            var name, photoUrl, uid, emailVerified;
            name = user.displayName;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            document.getElementById("Useremail").innerHTML = "Email : " + email;
            document.getElementById("Userimg").src = photoUrl;
            document.getElementById("Username").innerHTML = "User Name: " +name;
            document.getElementById("Useremail1").innerHTML = "Email : " + email;
            document.getElementById("Userimg1").src = photoUrl;
            document.getElementById("Username1").innerHTML = "User Name: " +name;
        
       


        //is signed in
    
    }else{
        alert('no active user');
    }
})

function openForm(){
        window.location.replace("profile.html");
}



function signOut(){
    auth.signOut();
    window.location.replace("http://www.samchikitsa-mobile.netlify.app");
    window.location.replace("index.html")
    alert('signed Out')
}


function writeUserData(user) {
    firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        console.log(error.message)
    });
}
function Save() {
    const profileForm = document.querySelector('#profile-form');

    profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(function(user){
        if(user){
    db.collection('users').add({
        phone: document.getElementById("userphone").value,
        age:document.getElementById("age").value,
        address: document.getElementById("address").value,
        city:document.getElementById("city").value,
        pincode : document.getElementById("pincode").value,
        designation:document.getElementById("designation").value,
        uid:user.uid,
        email: user.email,


    });
    alert("data is uploaded successfully.")
        }
    });
    })
}
