var fs = require('fs');

function getJson(filename, data, func) {
    retval = "";
    fs.readFile(filename, 'utf8', function(err, cont) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        vault = JSON.parse(cont);
        //console.log(vault);
        func(data, vault);
        //processData(data);
        //
        //console.dir(data);
    });
}

function list(replyTo) {
    var filename = "./data/db.json";
    getJson(filename, "", printout);

    function printout(data, vault) {
        var quotes = vault["quotes"];
        for (var i = 0; i < quotes.length; i++) {
            irc.action(replyTo, quotes[i]);
        }
    }
}

function flush() {
    var filename = "./data/db.json";
    getJson(filename, "", flushit);

    function flushit(data, vault) {
        var quotes = vault["quotes"];
        quotes = [];
        fs.writeFile(filename, JSON.stringify(vault, null, 4), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + filename);
            }
        });
    }
}

function store(data) {

    var filename = "./data/db.json";
    getJson(filename, data, processData);
    //console.log(vault);
    //processData(data);
    // console.log(vault["quotes"]);

    function processData(data, vault) {
        var quotes = vault["quotes"];
        quotes.push(data);

        fs.writeFile(filename, JSON.stringify(vault, null, 4), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + filename);
            }
        });
    }
}

function pick(replyTo) {
    //
    var filename = "./data/db.json";
    getJson(filename, "", pickq);

    function pickq(data, vault) {

        var quotes = vault["quotes"];

        which = Math.floor(Math.random() * quotes.length);
        console.log("hmm, which one should I send..." + which);


        irc.action(replyTo, quotes[which]);
    }
}
listen(/~quote(\s+)?(.*)$/i, function(match, data, replyTo) {
    if (match[2].charAt(0) === "-") {
        console.log("options to be doing with");
        if (match[2].substring(1) === "list") {
            list(replyTo);
        }
        // else if (match[2].substring(1)==="flush"){
        // 	flush(replyTo);
        // }
    } else if (match[2].charAt(0) !== "") {
        //console.log(match[2].charAt(0));
        store(match[2]);
	replys = ["Ooo that was a good one.","More! More! Quotes for me to have!", "Did you think that through when you said it?","Interesting to hear that coming from you."];
        which = Math.floor(Math.random() * replys.length);
        irc.action(replyTo, replys[which]);
    } else {
        pick(replyTo);
    }

}, false, false);
