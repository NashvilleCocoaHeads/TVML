//# sourceURL=application.js

//
//  application.js
//  CocoaHeads TVML
//
//  Created by Michael Hulet on 8/25/19.
//  Copyright © 2019 Nashville CocoaHeads. All rights reserved.
//

let baseURL;
let quotes;

App.onLaunch = async (options) => {
    baseURL = options.BASEURL;
    const view = await load("Views/Quote.xml");
    const loader = loadingTemplate();
    quotes = JSON.parse((await load("Data/Quotes.json")).response);

    navigationDocument.replaceDocument(view.responseXML, loader);

    loadQuote();

    getActiveDocument().getElementById("next").addEventListener("select", loadQuote);
};

function loadQuote() {
    const document = getActiveDocument();
    const index = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerHTML = quotes[index].title;
    document.getElementById("attribution").innerHTML = "- " + quotes[index].attribution;
    console.log(document.getElementById("image"));
}

async function load(resource) {
    return new Promise((resolve, reject) => {
                       const request = new XMLHttpRequest();
                       request.open("GET", baseURL + resource);
                       request.send();
                       request.onload = () => {
                       return resolve(request);
                       };
                       });
}

function loadingTemplate() {
    var template = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
    return parsedTemplate;
}
