/* compatibilities */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}
/* initialization */
window.onload = setupResponsive;
const classSI = "searchfield";
const classSB = "searchbutton";
const classSBar = "searchbar";
const classME = "menu-extender";
const classC = "content";
const classE = "-extender";
const classOable = "overflowable";
const classOed = "overflowed";
const classSEH = "se-history";
const classSES = "se-suggestion";
const classSEL = "se-loading";
const classSELed = "se-loaded";
const idGM = "global-menu-field";
const colorSBBase = "#212121";
const colorSBActive = "#191919";
const colorSBClick = "#434343";
const colorSBHover = "#101010";
const configSearchErrorMsg = "Incoherent searchbar setup";
/* DELETE ME pre-ajax tests */
function preAjaxLoading(progressBarElement) {
    var seled = progressBarElement.getElementsByClassName(classSELed)[0];
    progressBarElement.setStyleProperty("display", "unset");
    seled.setStyleProperty("width", "0%");
    var width = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            progressBarElement.setStyleProperty("display", "none");
            seled.setStyleProperty("width", "0%");
        }
        else if(width + "%" != seled.getStylePropertyValue("width"))
        {
            clearInterval(id);
        }
        else {
            width++;
            seled.setStyleProperty("width", width + "%");
        }
    }
}
/* utilities */
String.prototype.regExpEscape = function () {
    return this.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // g to perform global match, $& refers to the matched part of string
}
Element.prototype.parentElementOfTag = function (parentTagName) {
    var parEl = this.parentElement;
    while (parEl.tagName != parentTagName && parEl.tagName != "BODY") { // get first <form> parent if any
        parEl = parEl.parentElement;
    }
    if (parEl.tagName != parentTagName) {
        parEl = null;
    }
    return parEl;
}
Element.prototype.isOverflowed = function () {
    return this.scrollHeight > this.clientHeight || this.scrollWidth > this.clientWidth;
}
Element.prototype.getStylePropertyValue = function (property) {
    if (this.hasAttribute("style")) {
        var style = this.getAttribute("style");
        var matches = style.match(property.regExpEscape() + ": (.*?);");
        if (matches != null) {
            return matches[1]; //capturing parenthesis are stored at 1st index;
        }
    }
    return "";
}
Element.prototype.setStyleProperty = function (property, value) {
    var newProperty = property + ": " + value + ";";
    if (this.hasAttribute("style")) {
        var style = this.getAttribute("style");
        var matches = style.match(property.regExpEscape() + ":(.*?);");
        if (matches != null) {
            var is = style.indexOf(matches[0]);
            var ie = is + matches[0].length;
            var sStyle = style.substring(0, is);
            var eStyle = style.substring(ie);
            var newStyle = sStyle + eStyle;
            this.setAttribute("style", newStyle + newProperty);
        }
        else {
            this.setAttribute("style", style + newProperty);
        }
    }
    else {
        this.setAttribute("style", newProperty);
    }
}
/* setup events */
function setupResponsive() {
    setupSI();
    setupSB();
    setupGM();
    setupSE();
    setupOverflow();
}
function setupSI() {
    var sis = document.getElementsByClassName(classSI);
    for (var i = 0; i < sis.length; i++) {
        sis[i].addEventListener("focus", sIFocus, false);
        sis[i].addEventListener("focusout", sIFocusOut, false);
        sis[i].addEventListener("change", sIChange, false);
        sis[i].addEventListener("input", sIInput, false);
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
    var heightMenuBase = document.getElementById(idGM).offsetHeight + "px";
    for (var i = 0; i < contents.length; i++) {
        contents[i].setStyleProperty("margin-top", heightMenuBase);
    }
    document.defaultView.addEventListener("resize", gMResize, false);
}
function setupSE() {
    var forms = document.getElementsByClassName(classSBar);
    for (var h = 0; h < forms.length; h++) {
        if (forms[h].id.indexOf(classSBar, 0) == 0) {
            var idSE = forms[h].id + classE;
            var se = document.getElementById(idSE);
            if (se != null) {
                var sb = forms[h].getElementsByClassName(classSB)[0];
                var si = forms[h].getElementsByClassName(classSI)[0];
                var positionLeftSearch = si.getBoundingClientRect().left + "px";
                var positionBottomSearch = (si.getBoundingClientRect().top + si.offsetHeight) + "px";
                var widthSearch = (si.offsetWidth + sb.offsetWidth) + "px";
                se.setStyleProperty("top", positionBottomSearch);
                se.setStyleProperty("left", positionLeftSearch);
                se.setStyleProperty("width", widthSearch);
                se.setStyleProperty("display", "none");
                si.addEventListener("click", sEShow, false);
                sb.addEventListener("click", sEShow, false);
                var seh = se.getElementsByClassName(classSEH)[0];
                var ses = se.getElementsByClassName(classSES)[0];
                var sel = se.getElementsByClassName(classSEL)[0];
                seh.setStyleProperty("display", "unset");
                ses.setStyleProperty("display", "none");
                sel.setStyleProperty("display", "none");
                seled = sel.getElementsByClassName(classSELed)[0];
                seled.setStyleProperty("width", "0%");
            }
        }
    }
    document.defaultView.addEventListener("resize", sEResize, false);
}
function setupOverflow() {
    var overflowables = document.getElementsByClassName(classOable);
    for (var i = 0; i < overflowables.length; i++) {
        overflowables[i].addEventListener("overflow", tOverflow, false);
        overflowables[i].addEventListener("underflow", tUnderflow, false);
        if (overflowables[i].isOverflowed()) {
            overflowables[i].classList.add(classOed);
        }
    }
}
/* text overflowed event functions */
function tOverflow(event) {
    event.target.classList.add(classOed);
}
function tUnderflow(event) {
    event.target.classList.remove(classOed);
}
/* menu-extender event functions */
function sEHide(event) {
    var noHide = "." + classME + " *";
    if (!event.target.matches(noHide)) { // trigger effect only when clicking on non- menu-extender element (or its children)
        var mes = document.getElementsByClassName(classME);
        for (var i = 0; i < mes.length; i++) {
            mes[i].setStyleProperty("display", "none");
        }
        document.removeEventListener("mouseup", sEHide, false);
    }
}
/* searchInput event functions */
function sIFocus(event) {
    var parEl = event.target.parentElementOfTag("FORM");
    var sb = parEl.getElementsByClassName(classSB); // get paired searchButton inside (search) <form>
    if (sb.length == 1) {
        sb[0].setStyleProperty("background-color", colorSBActive);
        sb[0].addEventListener("mouseover", sBMouseOver, false);
        sb[0].addEventListener("mouseout", sBMouseOut, false);
        sb[0].removeEventListener("click", sBClickButton, false);
        if (sb[0].parentElement.querySelector(":hover") === sb[0]) {
            sb[0].setStyleProperty("background-color", colorSBHover);
        }
    }
    else {
        throw new Error(configSearchErrorMsg); // no paired searchButton found (or more than one)
    }
}
function sIFocusOut(event) {
    var parEl = event.target.parentElementOfTag("FORM");
    var sb = parEl.getElementsByClassName(classSB);
    if (sb.length == 1) {
        sb[0].setStyleProperty("background-color", colorSBBase);
        sb[0].removeEventListener("mouseover", sBMouseOver, false);
        sb[0].removeEventListener("mouseout", sBMouseOut, false);
        sb[0].addEventListener("click", sBClickButton, false);
        if (sb[0].parentElement.querySelector(":hover") === sb[0]) { // check if button has mouse over itself
            sb[0].setStyleProperty("background-color", colorSBClick);
        }
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
function sIChange(event) {
    var parEl = event.target.parentElementOfTag("FORM");
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
function sIInput(event) {
    var parEl = event.target.parentElementOfTag("FORM");
    var idSE = parEl.id + classE;
    var se = document.getElementById(idSE);
    var ses = se.getElementsByClassName(classSES)[0];
    var seh = se.getElementsByClassName(classSEH)[0];
    var sel = se.getElementsByClassName(classSEL)[0];
    if (event.target.value != "") {
        seh.setStyleProperty("display", "none");
        ses.setStyleProperty("display", "unset");
        var seled = sel.getElementsByClassName(classSELed)[0];
        preAjaxLoading(sel);
    }
    else {
        ses.setStyleProperty("display", "none");
        seh.setStyleProperty("display", "unset");
        var seled = sel.getElementsByClassName(classSELed)[0];
        preAjaxLoading(sel);
    }
}
function sEShow(event) {
    var parEl = event.target.parentElementOfTag("FORM");
    var idSE = parEl.id + classE;
    var se = document.getElementById(idSE);
    se.setStyleProperty("display", "unset");
    document.addEventListener("mouseup", sEHide, false);
    sEResize(event);
}
/* searchButton event functions */
function sBMouseOver(event) {
    event.target.setStyleProperty("background-color", colorSBHover);
}
function sBMouseOut(event) {
    event.target.setStyleProperty("background-color", colorSBActive);
}
function sBMouseDown(event) {
    event.target.setStyleProperty("background-color", colorSBClick);
    event.target.addEventListener("mouseout", sBDownOut, false);
}
function sBDownOut(event) {
    document.addEventListener("mouseup", documentMouseUp, false);
}
function documentMouseUp(event) {
    var sbs = document.getElementsByClassName(classSB);
    for (var i = 0; i < sbs.length; i++) {
        sbs[i].setStyleProperty("background-color", colorSBBase);
        sbs[i].removeEventListener("mouseout", sBDownOut, false);
    }
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function sBMouseUp(event) {
    event.target.removeEventListener("mouseout", sBDownOut, false);
    document.removeEventListener("mouseup", documentMouseUp, false);
}
function sBClickButton(event) {
    var parEl = event.target.parentElementOfTag("FORM");
    var si = parEl.getElementsByClassName(classSI);
    if (si.length == 1) {
        si[0].focus();
    }
    else {
        throw new Error(configSearchErrorMsg);
    }
}
function sBMode(event) {
    var parEl = event.target.parentElementOfTag("FORM");
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
    var menuHeight = document.getElementById(idGM).offsetHeight + "px";
    var contents = document.getElementsByClassName(classC);
    for (var i = 0; i < contents.length; i++) {
        var marginTopValue = contents[i].getStylePropertyValue("margin-top");
        if (menuHeight != marginTopValue) {
            contents[i].setStyleProperty("margin-top", menuHeight);
        }
    }
}
function sEResize(event) {
    var forms = document.getElementsByClassName(classSBar);
    for (var h = 0; h < forms.length; h++) {
        if (forms[h].id.indexOf(classSBar, 0) == 0) {
            var idSE = forms[h].id + classE;
            var se = document.getElementById(idSE);
            if (se != null) {
                var sb = forms[h].getElementsByClassName(classSB)[0];
                var si = forms[h].getElementsByClassName(classSI)[0];
                var seLeft = si.getBoundingClientRect().left + "px";
                var seTop = (si.getBoundingClientRect().top + si.offsetHeight) + "px";
                var seWidth = (si.offsetWidth + sb.offsetWidth) + "px";
                var cseWidthValue = se.getStylePropertyValue("width");
                var cseTopValue = se.getStylePropertyValue("top");
                var cseLeftValue = se.getStylePropertyValue("left");
                if (seLeft != cseLeftValue) {
                    se.setStyleProperty("left", seLeft);
                }
                if (seTop != cseTopValue) {
                    se.setStyleProperty("top", seTop);
                }
                if (seWidth != cseWidthValue) {
                    se.setStyleProperty("width", seWidth);
                }
            }
        }
    }
}