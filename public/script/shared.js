
var uid = undefined;
var roomid = location.pathname.replace(/\/$/, "").split("/").pop().toLowerCase();
var authAttempted = false;

var rootRef = {};

function destroyFirebase() {
    rootRef.set({});
}

function init(callback) {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log(user);
        uid = user.uid;
        rootRef = firebase.database().ref('games/' + roomid);
        callback();
    } else {
        console.log("Auth state not logged in");
        if(authAttempted) return;
        authAttempted = true;
        firebase.auth().signInAnonymously().catch(function(error) {
            console.log(error);
        });
    }});
}