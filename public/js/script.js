// var i = 0

// function check() {
//     i++
//     if (i == 1) {
//         document.getElementById("first").setAttribute("class", "hide");
//         document.getElementById("second").classList.remove("hide");
//         document.getElementById("btn").setAttribute("class", "hide");
//         document.getElementById("progress").setAttribute("style", "width: 66%;");
//     }
// }


function copy() {
    var copyText = document.getElementById("url");
    copyText.select();
  copyText.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(copyText.value);
  
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function copy2() {
  var copyText = document.getElementById("url2");
  copyText.select();
copyText.setSelectionRange(0, 99999); 
navigator.clipboard.writeText(copyText.value);

var x = document.getElementById("snackbar");
x.className = "show";
setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



  
  



