
window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;


    var stickiesArray = getStickiesArray();

    var stickies = document.getElementById("stickies");
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value= JSON.parse(localStorage[key]);
        addStickyToDOM(key, value, fragment);
    }
    stickies.appendChild(fragment);
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}

function createSticky() {
    var stickiesArray = getStickiesArray();
    var value = document.getElementById("note_text").value;
    var colorSelectObj = document.getElementById("note_color");
   var index = colorSelectObj.selectedIndex;
   var color = colorSelectObj[index].value;
   
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var stickyObj = {
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    var stickies = document.getElementById("stickies");
    var fragment = document.createDocumentFragment();
    addStickyToDOM(key, stickyObj, fragment);
    stickies.appendChild(fragment);
}

function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        key = e.target.parentNode.id;
    }
    var stickiesArray = getStickiesArray();
        if (stickiesArray) {
        for (var i = 0; i < stickiesArray.length; i++) {
            if (key == stickiesArray[i]) {
                stickiesArray.splice(i,1);
            }
        }
        localStorage.removeItem(key);
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}

function addStickyToDOM(key, stickyObj, fragment) {
    var sticky = document.createElement("li");

    sticky.setAttribute("id", key);
    sticky.style.backgroundColor = stickyObj.color;
        
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    
    span.innerHTML = stickyObj.value;

    sticky.appendChild(span);
    fragment.appendChild(sticky);
    
    sticky.onclick = deleteSticky;
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

function clearStickyNotes() {
    localStorage.clear();
    var stickyList = document.getElementById("stickies");
    var stickies = stickyList.childNodes;
    for (var i = stickies.length-1; i >= 0; i--) {
        stickyList.removeChild(stickies[i]);
    }
    var stickiesArray = getStickiesArray();
}