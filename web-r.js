window.onload = setupResponsive;
const colorBBase = "background-color: #212121;";
const colorBActive = "background-color: #191919;";
const colorBClick = "background-color: #434343;";
const colorBHover = "background-color: #101010;";
function setupResponsive() {
    setupSearchBar();
    setupSearchButton();
}
function setupSearchBar() {
    var searchfields = document.getElementsByClassName("searchfield");

    for (var i = 0; i < searchfields.length; i++) {
        searchfields[i].addEventListener("focus", searchBarFocus, false);
        searchfields[i].addEventListener("focusout", searchBarFocusOut, false);
        searchfields[i].addEventListener("change", searchBarChange, false);
    }
}
function setupSearchButton() {
    var searchbuttons = document.getElementsByClassName("searchbutton");
    for (var i = 0; i < searchbuttons.length; i++) {
        searchbuttons[i].addEventListener("click", searchButtonClickButton, false);
        searchbuttons[i].addEventListener("mouseover", searchButtonMode, false);
        searchbuttons[i].addEventListener("mousedown", searchButtonMouseDown, false);
        searchbuttons[i].addEventListener("mouseup", searchButtonMouseUp, false);
        searchbuttons[i].setAttribute("type", "button");
    }
}
function configSearchError() {
    throw new Error("incoherent searchbar setup");
}
function searchBarFocus(event) {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchbutton = parEl.getElementsByClassName("searchbutton");
    if (parEl.tagName == "FORM" && searchbutton.length == 1) {
        searchbutton[0].setAttribute("style", colorBActive);
        searchbutton[0].addEventListener("mouseover", searchButtonMouseOver, false);
        searchbutton[0].addEventListener("mouseout", searchButtonMouseOut, false);
        searchbutton[0].removeEventListener("click", searchButtonClickButton, false);
    }
    else {
        configSearchError();
    }
}
function searchBarFocusOut(event) {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchbutton = parEl.getElementsByClassName("searchbutton");
    if (parEl.tagName == "FORM" && searchbutton.length == 1) {
        searchbutton[0].setAttribute("style", colorBBase);
        searchbutton[0].removeEventListener("mouseover", searchButtonMouseOver, false);
        searchbutton[0].removeEventListener("mouseout", searchButtonMouseOut, false);
        searchbutton[0].addEventListener("click", searchButtonClickButton, false);
        if (searchbutton[0].parentElement.querySelector(":hover") === searchbutton[0]) {
            searchbutton[0].setAttribute("style", colorBClick);
        }
    }
    else {
        configSearchError();
    }
}
function searchBarChange() {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchbutton = parEl.getElementsByClassName("searchbutton");
    if (parEl.tagName == "FORM" && searchbutton.length == 1) {
        if (event.target.value != "") {
            searchbutton[0].setAttribute("type", "submit");
        }
        else {
            searchbutton[0].setAttribute("type", "button");
        }
    }
    else {
        configSearchError();
    }
}
function searchButtonMouseOver(event) {
    event.target.setAttribute("style", colorBHover);
}
function searchButtonMouseOut(event) {
    event.target.setAttribute("style", colorBActive);
}
function searchButtonMouseDown(event) {
    event.target.setAttribute("style", colorBClick);
    event.target.addEventListener("mouseout", searchButtonDownOut, false);
}
function searchButtonDownOut(event) {
    document.addEventListener("mouseup", documentMouseUp, false);
}
function documentMouseUp(event) {
    var searchbuttons = document.getElementsByClassName("searchbutton");
    for (var i = 0; i < searchbuttons.length; i++) {
        searchbuttons[i].setAttribute("style", colorBBase);
        searchbuttons[i].removeEventListener("mouseout", searchButtonDownOut, false);
    }
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function searchButtonMouseUp(event) {
    event.target.removeEventListener("mouseout", searchButtonDownOut, false);
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function searchButtonClickButton(event) {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchfield = parEl.getElementsByClassName("searchfield");
    if (parEl.tagName == "FORM" && searchfield.length == 1) {
        searchfield[0].focus();
        if (event.target.parentElement.querySelector(":hover") === event.target) { // check if button has mouse over it
            event.target.setAttribute("style", colorBHover);
        }
    }
    else {
        configSearchError();
    }
}
function searchButtonMode(event) {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchfield = parEl.getElementsByClassName("searchfield");
    if (parEl.tagName == "FORM" && searchfield.length == 1) {
        if (document.activeElement == searchfield[0] && searchfield[0].value != "") {
            event.target.setAttribute("type", "submit");
        }
        else {
            event.target.setAttribute("type", "button");
        }
    }
    else {
        configSearchError();
    }
}