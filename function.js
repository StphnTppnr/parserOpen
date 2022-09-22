


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
    // TODO 

    var t = {};


    // await gettext(files, keywords).then(function(res){
    //     //console.log(res);
    //     t = res;
    // });

    // await (df = new dfd.DataFrame(t));

    // await (group = df.groupby(["page","word"]).count());

    // await group.sortValues("count_count", { ascending: false, inplace: true });

    // console.log(group.print());

    await gettext(files, keywords).then(
        function(res){  df = new dfd.DataFrame(res);
                        group = df.groupby(["page","word"]).count();
                        group.sortValues("count_count", { ascending: false, inplace: true });
                });

    return dfd.toJSON(group);

    //Filter out only keywords

    // rowsToKeep = [];

    // for (i=0;i<group.shape[0];i++){
    //     console.log(i)
    //     var value = group.loc({columns: ["word"]}).iloc({rows: [i]}).values;
    //     value = String(value).replace(/\s/g, '')

    //     console.log("Value: "+ value + " | "+ keywords.includes(value) + " || " + keywords)

    //     if(keywords.includes(value)){
    //         console.log("TRUE");
    //         rowsToKeep.push(i);
    //         console.log(rowsToKeep)
    //     }
    // }

    // console.log(rowsToKeep)

    //group = group.iloc({rows: rowsToKeep})

    //return dfd.toJSON(group);//[{"IpAddr":"10.99.220.7","FactoryNumber":"34567","Unsent":10,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"},{"IpAddr":"10.99.228.228","FactoryNumber":"142123951023","Unsent":1,"Os":"linux","ExpirationDate":"05-05-2020","Version":"1.1067"},{"IpAddr":"10.99.220.7","FactoryNumber":"1234567","Unsent":2,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"},{"IpAddr":"10.99.220.7","FactoryNumber":"234567","Unsent":3,"Os":"windows","ExpirationDate":"05-05-2021","Version":"1.1067"}];
    }

function txtToArray(txt,keywords){
    words = txt.toLowerCase().split(" ");
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

    loadingTask.promise.then(function(pdf) {
        //TODO: loop all pages and return DF
        for (let j=1; j <= pdf.numPages;j++){
            pdf.getPage(j).then(function(page){
                console.log("page "+j);
                page.getTextContent({ normalizeWhitespace: true }).then(function(textContent){
                    //console.log(textContent);

                    loop(textContent).then(function(result){
                        txt = result.toLowerCase();
                        txt = txtToArray(txt,keywords)

                        pages = pages.concat(Array(txt.length).fill(j));
                        words = words.concat(txt)

                        if(j == pdf.numPages){
                            obj = {};
                            labels = ["page","word","count"]
                            obj[labels[0]] = pages;
                            obj[labels[1]] = words;
                            obj[labels[2]] = Array(words.length).fill(1);

                            resolve(obj)
                        }

                    });                
                });
            });
        }
    });
    
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