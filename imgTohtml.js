function imgToHtml() {
  document.getElementById("res").innerHTML = "";
  document.getElementById("check").innerHTML = "";

  var imgCount = document.images.length;
  var i = 0;

  if(document.getElementById("showinput").checked){
    document.querySelectorAll("input:not(.nottaken)").forEach(function (input) {
      document.getElementById("res").innerHTML += "\n" + input.outerHTML;
    });
  }

  document.querySelectorAll("img").forEach(function (img) {
    var src = img.getAttribute("src");
    var alt_img = img.getAttribute("alt");
    var width = img.getAttribute("width");
    var onclick_img = img.getAttribute("onclick");
    var id = img.getAttribute("id");
    var style = img.getAttribute("style");

    if (id == null) {
      style = "";
      if (img.parentNode.nodeName == "DIV") {
        id = img.parentNode.id;
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:none") != -1
        ) {
          style += "display:none;";
        }
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:inline") != -1
        ) {
          style += "display:inline;";
        }
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:block") != -1
        ) {
          style += "display:block;";
        }
      }
    }

    if (document.getElementById("class").value != "") {
      var classname = document.getElementById("class").value;
    } else {
      var classname = "btn btn-primary";
    }

    if (document.getElementById("alt").value != "") {
      var alt = document.getElementById("alt").value;
    } else {
      if (alt_img != "") {
        var alt = alt_img;
      } else {
        if (id != null) {
          var alt = id.split("_")[1];
          alt = alt.charAt(0).toUpperCase() + alt.slice(1);
          if (alt.match(/\d+/g)) {
            alt = alt.replace(/\d+/g, "");
          }
        } else {
          var alt = "";
        }
      }
    }

    let button = "<button";
    button += ' type="button"';

    if (imgCount > 1) {
      button += ' class="' + classname + ' mx-2"';
    } else {
      button += ' class="' + classname + '"';
    }

    if (id) {
      button += ' id="' + id + '"';
    }

    if (onclick_img) {
      //if onclick contains document.getElementById('ombre').style.display='none'; or document.getElementById('ombre').style.display='block'; then remove it
      if (onclick_img.indexOf("document.getElementById('ombre').style.display='none';") != -1) {
        onclick_img = onclick_img.replace("document.getElementById('ombre').style.display='none';", "");
      }
      if (onclick_img.indexOf("document.getElementById('ombre').style.display='block';") != -1) {
        onclick_img = onclick_img.replace("document.getElementById('ombre').style.display='block';", "");
      }
      button += ' onclick="' + onclick_img + '"';
    }

    if (style) {
      button += ' style="' + style + '"';
    }

    button += ">";
    if (alt) {
      button += alt;
    }

    button += "</button>";

    if (document.getElementById("backslash").checked) {
      button = button.replace(/"/g, '\\"');
    }

    console.log(button);

    document.getElementById("res").innerHTML += "\n\n" + button;
    i++;

    if (i == imgCount) {
      document.getElementById("check").innerHTML += i + " / " + imgCount;
    }
  });
}

function imgToHtml(text, showInput, className, backslash) {
  var parser = new DOMParser();
  var fakeDom = parser.parseFromString(text, "text/html");
  var imgCount = fakeDom.images.length;
  var i = 0;
  var returnText = "";
  var buttons = [];
  var inputs = [];
  
  if(showInput){
    fakeDom.querySelectorAll("input:not(.nottaken)").forEach(function (input) {
      inputs.push(input.outerHTML);
    });
  }
  
  fakeDom.querySelectorAll("img").forEach(function (img) {
    var src = img.getAttribute("src");
    var alt_img = img.getAttribute("alt");
    var width = img.getAttribute("width");
    var onclick_img = img.getAttribute("onclick");
    var id = img.getAttribute("id");
    var style = img.getAttribute("style");

    if (id == null) {
      style = "";
      if (img.parentNode.nodeName == "DIV") {
        id = img.parentNode.id;
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:none") != -1
        ) {
          style += "display:none;";
        }
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:inline") != -1
        ) {
          style += "display:inline;";
        }
        if (
          img.parentNode.getAttribute("style") &&
          img.parentNode.getAttribute("style").indexOf("display:block") != -1
        ) {
          style += "display:block;";
        }
      }
    }

    if (className == "") {
      className = "btn btn-primary";
    }

    if (alt_img == "") {
      if (id != null || id != "") {
        alt_img = id.split("_")[1];
        alt_img = alt_img.charAt(0).toUpperCase() + alt_img.slice(1);
        if (alt_img.match(/\d+/g)) {
          alt_img = alt_img.replace(/\d+/g, "");
        }
      } else {
        alt_img = "";
      }
    }

    let button = "<button";
    button += ' type="button"';

    if (imgCount > 1) {
      button += ' class="' + className + ' mx-2"';
    }
    else {
      button += ' class="' + className + '"';
    }

    if (id) {
      button += ' id="' + id + '"';
    }

    if (onclick_img) {
      if (onclick_img.indexOf("document.getElementById('ombre').style.display='none';") != -1) {
        onclick_img = onclick_img.replace("document.getElementById('ombre').style.display='none';", "");
      }
      if (onclick_img.indexOf("document.getElementById('ombre').style.display='block';") != -1) {
        onclick_img = onclick_img.replace("document.getElementById('ombre').style.display='block';", "");
      }
      button += ' onclick="' + onclick_img + '"';
    }

    if (style) {
      button += ' style="' + style + '"';
    }

    button += ">";
    if (alt_img) {
      console.log(alt_img);
      button += alt_img;
    }

    button += "</button>";
    if (backslash == false) {
      button = button.replace(/\\/g, "");
    }

    i++;

    if (i == imgCount) {
      console.info(i + " / " + imgCount);
    }

    buttons.push(button);
    
    
  });
  return {inputs:inputs, buttons:buttons, numberOfImg:{generatedButtons:i,findedImages:imgCount}};
}

