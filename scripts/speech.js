listen(/^:([^!]+)!.*PRIVMSG [^ ]+ :.*fish(.*)$/i, function(match, data, replyTo) {
   
    irc.action(replyTo, "I love fish!");

}, false, false);
