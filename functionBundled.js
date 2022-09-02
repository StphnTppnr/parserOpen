(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){



const init = function(){
    document.getElementById("parse-button").addEventListener('click', parse);

}


const parse = function(ev){
    ev.preventDefault();
    // Validate Inputs
    switch(validateInput()){
        case 0:
            break;
        case 1:
            alert("Please sleect at least one file");
            return;
        case 2:
            alert("Please input the keywords");
            return;
    }

    

    var x = document.getElementById("files")

    //alert(x.files[0])

    mydata = parseFiles(x.files[0],document.getElementById("keywords"))
    updateTable(mydata)

}


function updateTable(data){
    $('#table').bootstrapTable('load', data);
}

function validateInput(files, keywords){
    //TODO
    return 0
}

function parseFiles(files, keywords){
    // TODO 

    gettext(files).then(function (text) {alert('parse ' + text);})
    

    return [{"IpAddr":"10.99.220.7","FactoryNumber":"34567","Unsent":10,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"},{"IpAddr":"10.99.228.228","FactoryNumber":"142123951023","Unsent":1,"Os":"linux","ExpirationDate":"05-05-2020","Version":"1.1067"},{"IpAddr":"10.99.220.7","FactoryNumber":"1234567","Unsent":2,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"},{"IpAddr":"10.99.220.7","FactoryNumber":"234567","Unsent":3,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"}];
}


function gettext(pdfUrl){
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    var pdf = pdfjsLib.getDocument(URL.createObjectURL(pdfUrl));

    //pdf.promise.then(function(pfd){log('PDF loaded')})
    console.log(pdf.getPage(1).getTextContent())


  return pdf.promise.then(function(pdf) { // get all pages text
    var maxPages = pdf.pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    for (var j = 1; j <= maxPages; j++) {
      var page = pdf.getPage(j);
      var txt = "";
      countPromises.push(page.then(function(page) { // add page promise
        var textContent = page.getTextContent();
        return textContent.then(function(text){ // return content promise
          return text.items.map(function (s) { return s.str; }).join(''); // value page text 
        });
      }));
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      return texts.join('');
    });
  });
}




function doSomething()
{
    var file = document.getElementById('files');
    
    if(file.files.length)
    {
        var reader = new FileReader();
        
        reader.onload = function(e)
        {
            document.getElementById('outputDiv').innerHTML = e.target.result;
        };
        
        reader.readAsBinaryString(file.files[0]);
    }
}


document.addEventListener('DOMContentLoaded', init);
},{}]},{},[1]);
