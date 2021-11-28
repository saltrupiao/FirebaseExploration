// Reference: https://softauthor.com/learn-to-build-firebase-crud-app-with-javascript-part01-reading-data/
// Initialize Firebase 
var config = {
    apiKey: "AIzaSyC4hsXUVOe39_8agnrj8-KKbxSdiubsmqA",
    authDomain: "csi5450-db-project.firebaseapp.com",
    databaseURL: "https://csi5450-db-project-default-rtdb.firebaseio.com",
    projectId: "csi5450-db-project",
    storageBucket: "csi5450-db-project.appspot.com",
    messagingSenderId: "551081359366"
};
firebase.initializeApp(config);

const databaseRootReference = firebase.database().ref();
const blogPostRef = databaseRootReference.child('blogposts');

const uInterfaceBlogPosts = document.getElementById("blogPostList");

blogPostRef.on("child_added", snap => {
    let blogPost = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = blogPost.uname;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", clickUser)
    uInterfaceBlogPosts.append($li);
});

function clickUser(e) {
    var uID = e.target.getAttribute("child-key");
    
    const uReference = databaseRootReference.child('blogposts/' + uID);
    const uInterfaceUPosts = document.getElementById("postsDetail");
    
    uInterfaceUPosts.innerHTML = ""
    
    uReference.on("child_added", snap => {
        var $elemParagraph = document.createElement("p");
        $elemParagraph.innerHTML = snap.key + " - " + snap.val()
        uInterfaceUPosts.append($elemParagraph);
    });
}
