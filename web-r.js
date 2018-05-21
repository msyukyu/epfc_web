/* initialization */
window.onload = setupResponsive;
const classSI = "searchfield";
const classSB = "searchbutton";
const classGM = "global-menu-field";
const classME = "menu-extender";
const classC = "content";
const classE = "-extender";
const styleSBBase = "background-color: #212121;";
const styleSBActive = "background-color: #191919;";
const styleSBClick = "background-color: #434343;";
const styleSBHover = "background-color: #101010;";
const configSearchErrorMsg = "Incoherent searchbar setup";
/* utilities */
function getFirstParent(element, parentTagName) {
    var parEl = element.parentElement;
    while (parEl.tagName != parentTagName && parEl.tagName != "BODY") { // get first <form> parent if any
        parEl = parEl.parentElement;
    }
    if (parEl.tagName != parentTagName) {
        parEl = null;
    }
    return parEl;
}
/* setup events */
function setupResponsive() {
    setupSI();
    setupSB();
    setupGM();
    setupExt();
}
function setupSI() {
    var sis = document.getElementsByClassName(classSI);
    for (var i = 0; i < sis.length; i++) {
        sis[i].addEventListener("focus", sIFocus, false);
        sis[i].addEventListener("focusout", sIFocusOut, false);
        sis[i].addEventListener("change", sIChange, false);
    }
}
function setupSB() {
    var sbs = document.getElementsByClassName(classSB);
    for (var i = 0; i < sbs.length; i++) {
        sbs[i].addEventListener("click", sBClickButton, false);
        sbs[i].addEventListener("mouseover", sBMode, false);
        sbs[i].addEventListener("mousedown", sBMouseDown, false);
        sbs[i].addEventListener("mouseup", sBMouseUp, false);
        sbs[i].setAttribute("type", "button");
    }
}
function setupGM() {
    var contents = document.getElementsByClassName(classC);
    var heightMenuBase = document.getElementsByClassName(classGM)[0].offsetHeight;
    var styleContent = "margin-top: " + heightMenuBase + "px;";
    for (var i = 0; i < contents.length; i++) {
        contents[i].setAttribute("style", styleContent);
    }
    document.defaultView.addEventListener("resize", gMResize, false);
}
function setupExt() {
    var forms = document.getElementsByClassName("searchbar");
    for (var h = 0; h < forms.length; h++) {
        if (forms[h].id.indexOf("searchbar", 0) == 0) {
            var classSE = forms[h].id + classE;
            var se = document.getElementsByClassName(classSE)[0];
            if (se != null) {
                var sb = forms[h].getElementsByClassName(classSB)[0];
                var si = forms[h].getElementsByClassName(classSI)[0];
                var positionLeftSearch = si.getBoundingClientRect().left;
                var positionBottomSearch = si.getBoundingClientRect().top + si.offsetHeight;
                var widthSearch = si.offsetWidth + sb.offsetWidth;
                var styleSE = "top: " + positionBottomSearch + "px; " + 
                    "left: " + positionLeftSearch + "px; " + 
                    "width: " + widthSearch + "px; " +
                    "display: none; ";
                se.setAttribute("style", styleSE);
                si.addEventListener("click", sEShow, false);
                sb.addEventListener("click", sEShow, false);
            }
        }
    }
    document.defaultView.addEventListener("resize", sEResize, false);
}
/* menu-extender event functions */
function sEHide(event) {
    var mes = document.getElementsByClassName(classME);
    for (var i = 0; i < mes.length; i++) {
        var style = mes[i].getAttribute("style");
        var curDisplay = style.match(/display\:(.*);/)[0];
        var rmDisplay = style.substring(0, style.indexOf(curDisplay, 0));
        mes[i].setAttribute("style", rmDisplay + "display: none;");
    }
    document.removeEventListener("mouseup", sEHide, false);
}
/* searchInput event functions */
function sIFocus(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var sb = parEl.getElementsByClassName(classSB); // get paired searchButton inside (search) <form>
    if (sb.length == 1) {
        sb[0].setAttribute("style", styleSBActive);
        sb[0].addEventListener("mouseover", sBMouseOver, false);
        sb[0].addEventListener("mouseout", sBMouseOut, false);
        sb[0].removeEventListener("click", sBClickButton, false);
        if (sb[0].parentElement.querySelector(":hover") === sb[0]) {
            sb[0].setAttribute("style", styleSBHover);
        }
    }
    else {
        throw new Error(configSearchErrorMsg); // no paired searchButton found (or more than one)
    }
}
function sIFocusOut(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var sb = parEl.getElementsByClassName(classSB);
    if (sb.length == 1) {
        sb[0].setAttribute("style", styleSBBase);
        sb[0].removeEventListener("mouseover", sBMouseOver, false);
        sb[0].removeEventListener("mouseout", sBMouseOut, false);
        sb[0].addEventListener("click", sBClickButton, false);
        if (sb[0].parentElement.querySelector(":hover") === sb[0]) { // check if button has mouse over itself
            sb[0].setAttribute("style", styleSBClick);
        }
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
function sIChange(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var sb = parEl.getElementsByClassName(classSB);
    if (sb.length == 1) {
        if (event.target.value != "") {
            sb[0].setAttribute("type", "submit");
        }
        else {
            sb[0].setAttribute("type", "button");
        }
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
function sEShow(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var classSE = parEl.id + classE;
    var se = document.getElementsByClassName(classSE)[0];
    var style = se.getAttribute("style");
    var curDisplay = style.match(/display\:(.*);/)[0];
    var rmDisplay = style.substring(0, style.indexOf(curDisplay, 0));
    se.setAttribute("style", rmDisplay + "display: unset;");
    document.addEventListener("mouseup", sEHide, false);
    sEResize(event);
}
/* searchButton event functions */
function sBMouseOver(event) {
    event.target.setAttribute("style", styleSBHover);
}
function sBMouseOut(event) {
    event.target.setAttribute("style", styleSBActive);
}
function sBMouseDown(event) {
    event.target.setAttribute("style", styleSBClick);
    event.target.addEventListener("mouseout", sBDownOut, false);
}
function sBDownOut(event) {
    document.addEventListener("mouseup", documentMouseUp, false);
}
function documentMouseUp(event) {
    var sbs = document.getElementsByClassName(classSB);
    for (var i = 0; i < sbs.length; i++) {
        sbs[i].setAttribute("style", styleSBBase);
        sbs[i].removeEventListener("mouseout", sBDownOut, false);
    }
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function sBMouseUp(event) {
    event.target.removeEventListener("mouseout", sBDownOut, false);
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function sBClickButton(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var si = parEl.getElementsByClassName(classSI);
    if (si.length == 1) {
        si[0].focus();
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
function sBMode(event) {
    var parEl = getFirstParent(event.target, "FORM");
    var si = parEl.getElementsByClassName(classSI);
    if (si.length == 1) {
        if (document.activeElement == si[0] && si[0].value != "") { // check if searchInput has focus and is not empty
            event.target.setAttribute("type", "submit");
        }
        else {
            event.target.setAttribute("type", "button");
        }
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
/* resize event functions */
function gMResize(event) {
    var menuHeight = document.getElementsByClassName(classGM)[0].offsetHeight;
    var contents = document.getElementsByClassName(classC);
    for (var i = 0; i < contents.length; i++) {
        var style = contents[i].getAttribute("style");
        var marginTop = style.match(/^margin-top\:(.*);$/m)[0];
        var marginTopValue = parseFloat(marginTop.match(/[0-9]+(.[0-9]+)*/)[0]);
        if (menuHeight != marginTopValue) {
            contents[i].setAttribute("style", "margin-top: " + menuHeight + "px;");
        }
    }
}
function sEResize(event) {
    var forms = document.getElementsByClassName("searchbar");
    for (var h = 0; h < forms.length; h++) {
        if (forms[h].id.indexOf("searchbar", 0) == 0) {
            var classSE = forms[h].id + classE;
            var se = document.getElementsByClassName(classSE)[0];
            if (se != null) {
                var sb = forms[h].getElementsByClassName(classSB)[0];
                var si = forms[h].getElementsByClassName(classSI)[0];
                var seLeft = si.getBoundingClientRect().left;
                var seTop = si.getBoundingClientRect().top + si.offsetHeight;
                var seWidth = si.offsetWidth + sb.offsetWidth;
                var style = se.getAttribute("style");
                var cseDisplay = style.match(/display\:(.*);/)[0];
                var cseTop = style.match(/top\:(.*);/)[0];
                var cseLeft = style.match(/left\:(.*);/)[0];
                var cseWidth = style.match(/width\:(.*);/)[0];
                var cseTopValue = parseFloat(cseTop.match(/[0-9]+(.[0-9]+)*/)[0]);
                var cseLeftValue = parseFloat(cseLeft.match(/[0-9]+(.[0-9]+)*/)[0]);
                var cseWidthValue = parseFloat(cseWidth.match(/[0-9]+(.[0-9]+)*/)[0]);
                if (seLeft != cseLeftValue || seTop != cseTopValue || seWidth != cseWidthValue) {
                    se.setAttribute("style", "top: " + seTop + "px; left: " + seLeft + "px; width: " + seWidth + "px; " + cseDisplay);
                }
            }
        }
    }
}