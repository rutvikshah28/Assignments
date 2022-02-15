module Main exposing (main)
import Html exposing (..)

-- Function to construct URL

constructUrl : String -> String -> String -> String
constructUrl protocol domainName extension = protocol ++ "://" ++ domainName ++ "." ++ extension

-- Demonstrating partial usage of constructUrl

--Constructing the protocol for our function (String) -> (string -> String -> String)
protocolHttps = constructUrl "https"

--Construction the domain name for our function (String) -> (String -> String)
domainGoogle = protocolHttps "google"
domainInstagram = protocolHttps "instagram"
domainHeyAuto = protocolHttps "heyauto"

--Construction the extension for our function (String) -> (String)
googleUrl = domainGoogle "com"
instagramUrl = domainInstagram "com"
heyautoUrl = domainHeyAuto "com"


main = 
   div[]
    [text heyautoUrl, br[][], text instagramUrl, br[][], text googleUrl]