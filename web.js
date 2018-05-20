window.onload = setupFixed;
function show(id) {
    var e = document.getElementById(id);
    hideMenu();
    if (e) { e.style.display = 'block'; }
}
function hideMenu() {
    var me = document.getElementsByClassName("menu");
    for (var i = 0; i < me.length; i++) {
        var sme = me[i].getElementsByTagName("ul");
        var foundSm = false;
        for (var j = 0; j < sme.length && !foundSm; j++) {
            // startsWith("sm", 0) incompatible avec Internet Explorer, equivalent à indexOf("sm", 0)==0
            if (sme[j].id.indexOf("sm", 0) == 0) {
                sme[j].style.display = "none";
                foundSm = true;
            }
        }
    }
}
function setupFixed() {
    setupMenu();
    setupHookOverflow();
    setupSectionSwitch()
    sectionSwitch("section1.html");
}
function setupMenu() {
    var menuElements = document.getElementsByClassName("menu");

    for (var i = 0; i < menuElements.length; i++) {
        var smElements = menuElements[i].getElementsByTagName("ul");
        var foundSm = false;
        for (var j = 0; j < smElements.length && !foundSm; j++) {
            if (smElements[j].id.indexOf("sm", 0) == 0) {
                menuElements[i].setAttribute("onmouseover", "javascript:show('" + smElements[j].id + "');");
                menuElements[i].setAttribute("onmouseout", "javascript:show();");
                smElements[j].setAttribute("onmouseover", "javascript:show('" + smElements[j].id + "');");
                smElements[j].setAttribute("onmouseout", "javascript:show();");
                foundSm = true;
            }
        }
    }
}
function setupHookOverflow() {
    var hooks = document.getElementsByClassName("hook-news-f");

    for (var i = 0; i < hooks.length; i++) {
        hooks[i].addEventListener("overflow", function (event) {
            event.target.className = "hook-news-f-overflowed";
        }, false);
        hooks[i].addEventListener("underflow", function (event) {
            event.target.className = "hook-news-f";
        }, false);
        if (isOverflowed_Y(hooks[i])) {
            hooks[i].className = "hook-news-f-overflowed";
        }
    }
}
function setupSectionSwitch() {
    var ss = document.getElementsByClassName("section-switch");
    for (var i = 0; i < ss.length; i++) {
        var ssid = ss[i].id;
        ss[i].onclick = function (event) {
            sectionSwitch(event.target.id + '.html');
        }
    }
}
function isOverflowed_Y(element) {
    return element.scrollHeight > element.clientHeight;
}
function sectionSwitch(newSectionPath) {
    const req = new XMLHttpRequest(); //also check [fetch] API -> sectionSwitch2

    req.onreadystatechange = function (event) {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                var elSection = document.getElementsByClassName("section-f");
                for (var i = 0; i < elSection.length; i++) {
                    elSection[i].innerHTML = this.responseText;
                }
            }
        }
    }
    req.open('GET', newSectionPath, true); //problème de sécurité avec google chrome et internet explorer (protocole file:// pas autorisé)
    req.send(null);
}
function sectionSwitch2(newSectionPath) {
    fetch(newSectionPath)
        .then(response => response.text())
        .then(function (text) {
            var elSection = document.getElementsByClassName("section-f");
            for (var i = 0; i < elSection.length; i++) {
                elSection[i].innerHTML = text;
            }
        }); //toujours le même problème de sécurité qu'avec XMLHttpRequest
}
