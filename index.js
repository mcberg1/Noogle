

window.onload = function () { 
    let root = document.documentElement;
    root.style.setProperty("--background-color",randomColor());
    root.style.setProperty("--color",randomColor());
    // document.body.style.color = randomColor();
    var params = getUrlVars();
    if(params['q']!=null){
        search(params['q'],5);
        document.getElementById("input").value = params['q'];
    }
    if(params['n']!=null && params['q']!=null){
        search(params['q'],parseInt(params['n']));
    }
}

var timer = setInterval(barrelRoll, 10);

function barrelRoll(){
 if(document.getElementById("input").value == "do a barrel roll"){
         let root = document.documentElement;
    root.style.setProperty("--background-color",randomColor());
    root.style.setProperty("--color",randomColor());
     
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

function search(value, num){
    if(value == "google"){
     window.location.replace("https://www.bing.com/");
    }
    else{    
     if(value == "dedotated wam"){
		  document.getElementById("dedotation").play(); 	  
	 }		 
    var request = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=search&titles=50&utf8=1&srsearch='+encodeURI(value)+'&srlimit=10&srwhat=text&srinfo=totalhits&srprop=wordcount%7Csnippet&srenablerewrites=1&srsort=incoming_links_asc', true);
    request.onload = function () {
        let obj = JSON.parse(this.responseText);
        var div = document.getElementById("results");
        div.innerHTML = "";
        var j = num;
        if(obj.query.search.length<5){j=obj.query.search.length}
        for(var i=0; i<j; i++){
            div.innerHTML+="<h3>"+obj.query.search[i].title+"</h3>"
            div.innerHTML+="<p ondblclick='getArticle(this,"+obj.query.search[i].pageid+")'>"+obj.query.search[i].snippet+"</p>"
        }
    }
    request.send()
    }
}

function getArticle(th,id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=text&pageid='+id+'&format=json', true);
    request.onload = function () {
        let obj = JSON.parse(this.responseText);
        th.innerHTML = obj['parse']['text']['*'];
    }
    request.send()
}
