/**
 * Scripts should use these functions to populate the regex parameter
 * of the listen function in a standardized way.
 */

require("./config.js");
var _ = require("lodash");

// http://stackoverflow.com/a/6969486
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function ensureArray(stringOrArray) {
    if (typeof stringOrArray === "string") {
        return [stringOrArray];
    } else {
        return stringOrArray;
    }
}

function makePrefix(prefixed) {
    if (prefixed === false) {
        return "";
    } else {
        return "(?:"
            + escapeRegExp(nodebot_prefs.command_prefix) + " ?"
            + "|"
            + escapeRegExp(nodebot_prefs.nickname) + "[:,]? "
            + ")"
            + (prefixed === "optional" ? "?" : "");
    }
}

function matchAny(strings) {
    return "(?:"
        + _.map(strings, function (s) { return escapeRegExp(s); }).join("|")
        + ")";
}

exports.only = function (keywords, prefixed) {
    keywords = ensureArray(keywords);

    return new RegExp(
        "PRIVMSG [^ ]+ :" + makePrefix(prefixed) + matchAny(keywords) + "$", "i");
};

exports.startsWith = function (keywords, prefixed) {
    keywords = ensureArray(keywords);
    return new RegExp(
        "PRIVMSG [^ ]+ :" + makePrefix(prefixed) + matchAny(keywords) + "\\b ?(.*)$", "i");
};

