/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var endpoint = "https://jsonbox.io/box_ccb774670a8882eb3725";

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
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

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
        $.ajax({
        'url': endpoint,
        'type': 'POST',
        'data': JSON.stringify({url: this.url, hash: this.hash}),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];
        location.assign();

        if (data != null) {
            window.location.href = data;
        }
    });
}