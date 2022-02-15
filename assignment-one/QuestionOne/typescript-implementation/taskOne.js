//constructUrl : String -> String -> String -> String 
// constructUrl : Protocol -> DomainName -> Extension -> URL!!
var constructUrl = function (protocol, domainName) { return function (extension) {
    return "".concat(protocol, "://").concat(domainName, ".").concat(extension);
}; };
var constructUrl2 = function (protocol) { return function (domainName) { return function (extension) {
    return "".concat(protocol, "://").concat(domainName, ".").concat(extension);
}; }; };
//Demonstrating partial usage of constructUrl functions
//Constructing the protocol for our function (String) -> (String -> String -> String)
var protocolHttps = constructUrl2("https");
//Constructing protocol and domainName for our function (String, String) -> (String -> String)
var protocolHttpsAndDomainGoogle = constructUrl("https", "google");
var protocolHttpsAndDomainInstagram = constructUrl("https", "instagram");
var protocolHttpsAndDomainHeyAuto = constructUrl("https", "heyauto");
//Constructing the domainName for our function (String) -> (String -> String)
var domainGoogle = protocolHttps("google");
var domainInstagram = protocolHttps("instagram");
var domainHeyAuto = protocolHttps("heysauto");
//Constructing the extension for our function (String) -> (String)
var googleUrl = domainGoogle("com");
var instagramUrl = domainInstagram("com");
var heyautoUrl = domainHeyAuto("com");
var googleUrl2 = protocolHttpsAndDomainGoogle("com");
var instagramUrl2 = protocolHttpsAndDomainInstagram("com");
var heyautoUrl2 = protocolHttpsAndDomainHeyAuto("com");
//Logging the results
console.log("Google URL (1): ", googleUrl);
console.log("Google URL (2): ", googleUrl2);
console.log("Instagram URL (1): ", instagramUrl);
console.log("Instagram URL (2): ", instagramUrl2);
console.log("HeyAuto URL (1): ", heyautoUrl);
console.log("HeyAuto URL (2): ", heyautoUrl2);
