function getCookie() {
    var name = "savedCode=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return decodeURI(c.substring(name.length,c.length));
    }
}

function save() {
    var cname = "savedCode";
    var cvalue = editor.getValue();
    if (getCookie() != cvalue) {
        document.cookie = cname + "=" + encodeURI(cvalue) + ";";
//        console.log("Saved changes");
    }
}

function initialize() {
    var loaded = getCookie();
    if (loaded) {
        document.getElementById('editor').innerHTML = loaded;
    }
}

// TODO - keybaord shortcut, providing live feedback
initialize();
setInterval(save, 1000);
