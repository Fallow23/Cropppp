const config = {
  apiKey: "AIzaSyCRvn3zjYAl9xRjEPpdB4zzwejSNOrtuo4",
  authDomain: "cropppp.firebaseapp.com",
  projectId: "cropppp",
  storageBucket: "cropppp.appspot.com",
  messagingSenderId: "467531085978",
  appId: "1:467531085978:web:d34d3ebfdf2467fc8fc723",
  measurementId: "G-YP2NXJVDRJ"
};
firebase.initializeApp(config);
var firestore = firebase.firestore()
var collection = firestore.collection("links")
var pathname = window.location.pathname.substring(1);
const fetchData = () => {
          collection.get().then( (links) => {
            let linkslist = [];    
            links.forEach((link) => {
              let data = link.data();
              linkslist.push({
                id: data.id,
                url: data.url
              });
            });
            const link = linkslist.find(link => link.id === pathname)
            if(pathname !== ""){
              if(link !== undefined){
                window.location.replace(link.url)
              }
              else{
                alert("invalid url")
              }
            }
          })
}
window.onload = fetchData()

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://");
    if(!protocol_ok){
        newurl = "https://"+url;
        return newurl;
      }
    else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function send_request(id, url) {
    this.id = id;
    this.url = url;
    collection.add({
      id: this.id,
      url: this.url
    })
}

function shorturl(){
    var id = getrandom()
    var longurl = geturl();
    send_request(id, longurl);
    document.getElementById("shortlink").style.display = "block"
    var shortenedlink = window.location.href + id;
    document.getElementById("shortlinkanchor").innerHTML = shortenedlink
    document.getElementById("shortlinkanchor").setAttribute("href",shortenedlink)
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}