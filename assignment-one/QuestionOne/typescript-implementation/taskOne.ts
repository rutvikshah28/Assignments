//constructUrl : String -> String -> String -> String 
// constructUrl : Protocol -> DomainName -> Extension -> URL!!

const constructUrl = (protocol: string, domainName: string) => (extension: string) => 
`${protocol}://${domainName}.${extension}`;

const constructUrl2 = (protocol: string) => (domainName: string) => (extension: string) => 
`${protocol}://${domainName}.${extension}`;

//Demonstrating partial usage of constructUrl functions

//Constructing the protocol for our function (String) -> (String -> String -> String)
const protocolHttps = constructUrl2("https");

//Constructing protocol and domainName for our function (String, String) -> (String -> String)
const protocolHttpsAndDomainGoogle = constructUrl("https", "google");
const protocolHttpsAndDomainInstagram = constructUrl("https", "instagram");
const protocolHttpsAndDomainHeyAuto = constructUrl("https", "heyauto");

//Constructing the domainName for our function (String) -> (String -> String)
const domainGoogle = protocolHttps("google");
const domainInstagram = protocolHttps("instagram");
const domainHeyAuto = protocolHttps("heysauto"); 

//Constructing the extension for our function (String) -> (String)
const googleUrl = domainGoogle("com");
const instagramUrl = domainInstagram("com");
const heyautoUrl = domainHeyAuto("com");

const googleUrl2 = protocolHttpsAndDomainGoogle("com");
const instagramUrl2 = protocolHttpsAndDomainInstagram("com");
const heyautoUrl2 = protocolHttpsAndDomainHeyAuto("com");

//Logging the results
console.log("Google URL (1): ", googleUrl);
console.log("Google URL (2): ", googleUrl2);
console.log("Instagram URL (1): ", instagramUrl);
console.log("Instagram URL (2): ", instagramUrl2);
console.log("HeyAuto URL (1): ", heyautoUrl);
console.log("HeyAuto URL (2): ", heyautoUrl2);