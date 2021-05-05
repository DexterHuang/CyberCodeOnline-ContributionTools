var width = document.querySelector('main').clientWidth;
var height = document.querySelector('main').clientHeight;
var tailleCase = 30;
nbCasesW = 15;
nbCasesH = 15;

jdlvArray=Create2DArray(nbCasesW,nbCasesH);
function Create2DArray(rows, cols) {
  var arr = [];
  for (var i=0;i<rows;i++) {
     arr[i] = [];
     for (var j = 0; j < cols; j++) {
      arr[i][j] = (i==0 || j==0 || i==nbCasesW-1 || j==nbCasesH-1) && (i!=7 && j!=7)  ? true : false
     }
  }
  return arr;
}

function actualizeTable(jdlvArray) {
    document.querySelector('main').innerHTML = printingTableTDLV(jdlvArray);
    for (var i = 0; i < jdlvArray.length; i++) {
        for (var j = 0; j < jdlvArray[i].length; j++) {
            document.querySelector('#case'.concat((i*jdlvArray[i].length+j).toString())).addEventListener('click',changeCaseState); 
        }
    }
}

function printingTableTDLV(jdlvArray) {
    stringRet='<table id="jdlv">';
    for (var i = 0; i < jdlvArray.length; i++) {
        stringRet=stringRet.concat("<tr>");
        for (var j = 0; j < jdlvArray[i].length; j++) {
            if (jdlvArray[i][j]) {state='alive'} else {state='dead'}
            stringRet=stringRet.concat("<td id='case",i*jdlvArray[i].length+j,"' class='",state,"'></td>");
        }
        stringRet=stringRet.concat("</tr>");
    }

    return stringRet.concat('</table>');
}

function changeCaseState(event) {
    numb=event.target.id;
    var x = parseInt(parseInt(numb.slice(4)/nbCasesW));
    var y = parseInt(parseInt(numb.slice(4)%nbCasesH));
    if (document.querySelector('#'+numb).className=='alive') {
        document.querySelector('#'+numb).className='dead';
        jdlvArray[x][y]=false;
    } else {
        document.querySelector('#'+numb).className='alive'; 
        jdlvArray[x][y]=true;
    }
}

document.querySelector('main').innerHTML = printingTableTDLV(jdlvArray);
actualizeTable(jdlvArray)

function generateExport() {
  str = '';
  for (var i = 0; i < jdlvArray.length; i++) {
    for (var j = 0; j < jdlvArray[i].length; j++) {
        str += jdlvArray[i][j] ? '1' : '0'
    }
  }
  return str;
}

function generateExportDiscord() {
  str = '```<br/>#######X#######<br/>';
  for (var i = 1; i < jdlvArray.length-1; i++) {
    str += i==7 ? 'X' : '#';
    for (var j = 1; j < jdlvArray[i].length-1; j++) {
        str += jdlvArray[i][j] ? '#' : '-';
    }
    str += i==7 ? 'X' : '#';
    str += '<br/>';
  }
  str+='#######X#######<br/>```';
  document.querySelector('.textExport').innerHTML = str;
  document.querySelector('.isCopied').innerHTML = 'Copied into the clipboard !';
  let re = /<br\/>/gi;
  str = str.replace(re,'\n');
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(str);
    }
  });
}

function generateExportGithub() {
  str = '```\n                {\n                        "tiles": [\n                                "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", \n';
  for (var i = 1; i < jdlvArray.length-1; i++) {
    str += '                                "'+(i==7 ? ' ' : '#')+'", ';
    for (var j = 1; j < jdlvArray[i].length-1; j++) {
        str += jdlvArray[i][j] ? '"#", ' : '" ", ';
    }
    str += '"'+(i==7 ? ' ' : '#')+'", ';
    str += '\n';
  }
  str+='                                "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#"\n                        ]\n\n                },\n```';
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(str);
    }
  });
  document.querySelector('.isCopied').innerHTML = 'Copied into the clipboard !';
}



function importGenerated(str) {
  for (var i=0;i<jdlvArray.length;i++) {
     for (var j = 0; j < jdlvArray[i].length; j++) {
      jdlvArray[i][j]=parseInt(str[i*nbCasesW+j]);
     }
  }
  actualizeTable(jdlvArray)
  return jdlvArray;
}

function importGeneratedDiscord(str) {
  for (var i=0;i<jdlvArray.length;i++) {
     for (var j = 0; j < jdlvArray[i].length; j++) {
      jdlvArray[i][j]=str[i*nbCasesW+j]=='#' ? true : false;
     }
  }
  actualizeTable(jdlvArray)
  return jdlvArray;
}
