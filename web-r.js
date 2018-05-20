window.onload = setupResponsive;
function setupResponsive() {
    setupSearchBar();
    setupSearchButton();
}
function setupSearchBar() {
    var searchfields = document.getElementsByClassName("searchfield");

    for (var i = 0; i < searchfields.length; i++) {
        searchfields[i].addEventListener("focus", function (event) {
            var parEl = event.target.parentElement;
            while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
                parEl = parEl.parentElement;
            }
            var searchbutton = parEl.getElementsByClassName("searchbutton");
            if (parEl.tagName == "FORM" && searchbutton.length == 1) {
                searchbutton[0].setAttribute("style", "background-color: #191919;");
                searchbutton[0].addEventListener("mouseover", searchButtonMouseOver, false);
                searchbutton[0].addEventListener("mouseout", searchButtonMouseOut, false);
                searchbutton[0].removeEventListener("click", searchButtonClickButton, false);
            }
            else {
                throw new Error("incoherent searchbar setup");
            }
        }, false);
        searchfields[i].addEventListener("focusout", function (event) {
            var parEl = event.target.parentElement;
            while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
                parEl = parEl.parentElement;
            }
            var searchbutton = parEl.getElementsByClassName("searchbutton");
            if (parEl.tagName == "FORM" && searchbutton.length == 1) {
                searchbutton[0].setAttribute("style", "background-color: #212121;");
                searchbutton[0].removeEventListener("mouseover", searchButtonMouseOver, false);
                searchbutton[0].removeEventListener("mouseout", searchButtonMouseOut, false);
                searchbutton[0].addEventListener("click", searchButtonClickButton, false);
                if (searchbutton[0].parentElement.querySelector(":hover") === searchbutton[0]) {
                    searchbutton[0].setAttribute("style", "background-color: #434343;");
                }
            }
            else {
                throw new Error("incoherent searchbar setup");
            }
        }, false);
        searchfields[i].addEventListener("change", function (event) {
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
                throw new Error("incoherent searchbar setup");
            }
        })
    }
}
function setupSearchButton() {
    var searchbuttons = document.getElementsByClassName("searchbutton");
    for (var i = 0; i < searchbuttons.length; i++) {
        searchbuttons[i].addEventListener("click", searchButtonClickButton, false);
        searchbuttons[i].addEventListener("mouseover", searchButtonSubmit, false);
        searchbuttons[i].addEventListener("mousedown", searchButtonMouseDown, false);
        searchbuttons[i].addEventListener("mouseup", searchButtonMouseUp, false);
        searchbuttons[i].setAttribute("type", "button");
    }
}
function searchButtonMouseOver(event) {
    event.target.setAttribute("style", "background-color: #101010;");
}
function searchButtonMouseOut(event) {
    event.target.setAttribute("style", "background-color: #191919;");
}
function searchButtonMouseDown(event) {
    event.target.setAttribute("style", "background-color: #434343;");
    event.target.addEventListener("mouseout", function searchButtonDownOut(event) {
        document.addEventListener("mouseup", function documentMouseUp(event) {
            var searchbuttons = document.getElementsByClassName("searchbutton");
            for (var i = 0; i < searchbuttons.length; i++) {
                searchbuttons[i].setAttribute("style", "background-color: #212121");
                searchbuttons[i].removeEventListener("mouseout", searchButtonDownOut, false);
            }
            document.removeEventListener("mouseup", documentMouseUp, false);
        }, false);
    }, false);
}
function searchButtonMouseUp(event) {
    event.target.removeEventListener("mouseout", searchButtonDownOut, false);
}
function searchButtonClickButton(event) {
    var parEl = event.target.parentElement;
    while (parEl.tagName != "FORM" && parEl.tagName != "BODY") {
        parEl = parEl.parentElement;
    }
    var searchfield = parEl.getElementsByClassName("searchfield");
    if (parEl.tagName == "FORM" && searchfield.length == 1) {
        searchfield[0].focus();
        if (event.target.parentElement.querySelector(":hover") === event.target) // check if button has mouse over it
        {
            event.target.setAttribute("style", "background-color: #101010;");
        }
    }
    else {
        throw new Error("incoherent searchbar setup");
    }
}
function searchButtonSubmit(event) {
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
        throw new Error("incoherent searchbar setup");
    }
}