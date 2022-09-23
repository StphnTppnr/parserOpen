


const init = function(){
    //document.getElementById("loader_cont").style.display ='none';
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
    //Display loading
    document.getElementById("loader_cont").style.display ='inline';

    var x = document.getElementById("files");
    var k = document.getElementById("keywords").value;
    k = txtToArray(k);

    console.log(k);

    //alert(x.files[0])

    parseFiles(x.files[0],k).then(function(data){
        updateTable(data);
        //Hide loading
        document.getElementById("loader_cont").style.display ='none';
    });
}

function updateTable(data){
    $('#table').bootstrapTable('load', data);
}

function validateInput(files, keywords){
    //TODO
    return 0
}

async function parseFiles(files, keywords){
    // TODO - Danfo

    await gettext(files, keywords).then(
        function(res){  df = new dfd.DataFrame(res);
                        group = df.groupby(["page","word"]).count();
                        group.sortValues("count_count", { ascending: false, inplace: true });
                });
    
    dfd.toExcel(group)
    return dfd.toJSON(group);

    }

function txtToArray(txt,keywords){
    words = txt.toLowerCase().split(/[\s,;●\r\n]+/);
    if(keywords!=null){
        words = words.filter(w => keywords.includes(w));
    }
    return words;
}

function gettext(pdfUrl, keywords){
    const promise = new Promise((resolve, reject)=>{
    var txt = ""
    var pages = [];
    var words = [];

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    var loadingTask = pdfjsLib.getDocument(URL.createObjectURL(pdfUrl));

    loadingTask.promise.then(async function(pdf) {
        //TODO: loop all pages and return DF
        for (let j=1; j <= pdf.numPages;j++){
            
            await pdf.getPage(j).then(async function(page){
                //console.log("page "+j +" of "+pdf.numPages);
                
                
                
                await page.getTextContent({ normalizeWhitespace: true }).then(function(textContent){
                    //console.log(textContent);
                    //if(j==11){console.log(textContent)};
                    
                    // loop(textContent).then(function(result){
                    //     txt = result.toLowerCase();
                    //     //console.log("Page "+j+"*******"+txt);
                    //     txt = txtToArray(txt,keywords);

                    //     pages = pages.concat(Array(txt.length).fill(j));
                    //     words = words.concat(txt);

                    //     if(j == pdf.numPages){
                    //         obj = {};
                    //         labels = ["page","word","count"]
                    //         obj[labels[0]] = pages;
                    //         obj[labels[1]] = words;
                    //         obj[labels[2]] = Array(words.length).fill(1);

                    //         resolve(obj)
                    //     }

                    // });


                    if(j==18 || j == 151){console.log(textContent)};
                    txt = ""

                    for(let x =0;x < Object.entries(textContent)[0][1].length; x++){
                        txt = txt + " " + Object.entries(textContent)[0][1][x]['str'].toLowerCase();
                    }

                    if(j==18 || j == 151){console.log(txt)};

                    txt = txtToArray(txt,keywords);

                    pages = pages.concat(Array(txt.length).fill(j));
                    
                    words = words.concat(txt);

                    console.log("HERE " + j +" DONE")

                    if(j == pdf.numPages){
                        obj = {};
                        labels = ["page","word","count"]
                        obj[labels[0]] = pages;
                        obj[labels[1]] = words;
                        obj[labels[2]] = Array(words.length).fill(1);
                        
                        console.log(words)

                        resolve(obj);
                    }
                });
            });
            
        }
    }).then(function(){console.log("hello")});    
});
    return promise
  }

async function loop(textContent){
    let txt = ""
    for (let i=0; i < textContent.items.length; i++){
        txt += textContent.items[i]['str'];
    };
    return txt
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