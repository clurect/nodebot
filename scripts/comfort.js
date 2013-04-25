// (c) 2011 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     ~smack user - smacks user with a random object

var phrases = ["come drown you sorrows!"];

function isUser(str) {
    return str[0] !== "#";
}

listen(regexFactory.startsWith("comfort"), function(match, data, replyTo) {
    var phraseidx = Math.floor(Math.random()*phrases.length);
    var msgMatch = /^([^ ]+) (.+)$/.exec(match[1]);    
    if (msgMatch && isUser(msgMatch[1])){
    	irc.privmsg(replyTo, msgMatch[1] + " " + phrases[phraseidx]);
    }
    //irc.action(replyTo, match[1]+" "+phrases[phraseidx]);
   
});
