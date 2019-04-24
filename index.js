window.onload = function () {
    document.body.style.backgroundColor = randomColor();
    document.body.style.color = randomColor();
    var params = getUrlVars();
    if(params['q']!=null){
        search(params['q']);
        document.getElementById("input").value = params['q'];
    }
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function randomColor(){
    var r = Math.floor(Math.random()*256).toString(16);
    var g = Math.floor(Math.random()*256).toString(16);
    var b = Math.floor(Math.random()*256).toString(16);
    if(r.length==1){r="0"+r}
    if(g.length==1){g="0"+g}
    if(b.length==1){b="0"+b}
    return "#"+r+g+b
}

function search(value){
    var request = new XMLHttpRequest();
    if(value==""){
        document.getElementById("title").innerHTML="";
        document.getElementById("snippet").innerHTML="";
    }
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=search&titles=50&utf8=1&srsearch='+encodeURI(value)+'&srlimit=1&srwhat=text&srinfo=totalhits&srprop=wordcount%7Csnippet&srenablerewrites=1&srsort=incoming_links_asc', true);
    request.onload = function () {
        let obj = JSON.parse(this.responseText);
        console.log(obj.query.search);
        document.getElementById("snippet").innerHTML = obj.query.search[0].snippet;
        document.getElementById("title").innerHTML = obj.query.search[0].title;
        console.log(obj.query);
    }
    // Send request
    request.send()
}