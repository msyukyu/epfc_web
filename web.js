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
    hideMenu();
    setupHookOverflow();
    setupStyleSwitch();
    setupSectionSwitchNoAjax();
    sectionSwitchNoAjax("section1");
    /* ajax
    setupSectionSwitch()
    sectionSwitch("section1.html");
    */
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
        if (menuElements[i].id == "m0") {
            menuElements[i].onclick = function (event) {
                var menuElements = document.getElementsByClassName("menu");
                for (var k = 0; k < menuElements.length; k++) {
                    if (menuElements[k].id != "m0") {
                        if (menuElements[k].offsetWidth > 0 && menuElements[k].offsetHeight > 0) {
                            menuElements[k].setAttribute("style", "display: none");
                        }
                        else {
                            menuElements[k].setAttribute("style", "display: block");
                        }
                    }
                }
            }
            document.defaultView.addEventListener("resize", function (event) {
                var m0 = document.getElementById("m0");
                if (m0.offsetWidth == 0 || m0.offsetHeight == 0) {
                    var menuElements = document.getElementsByClassName("menu");
                    for (var k = 0; k < menuElements.length; k++) {
                        if (menuElements[k].id != "m0") {
                            menuElements[k].setAttribute("style", "display: block");
                        }
                    }
                }
                else {
                    var menuElements = document.getElementsByClassName("menu");
                    for (var k = 0; k < menuElements.length; k++) {
                        if (menuElements[k].id != "m0") {
                            menuElements[k].setAttribute("style", "display: none");
                        }
                    }
                }
            }, false);
            if (menuElements[i].offsetWidth > 0 || menuElements[i].offsetHeight > 0) {
                var menuElements2 = document.getElementsByClassName("menu");
                for (var k = 0; k < menuElements2.length; k++) {
                    if (menuElements2[k].id != "m0") {
                        menuElements2[k].setAttribute("style", "display: none");
                    }
                }
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
function setupSectionSwitchNoAjax() {
    var ss = document.getElementsByClassName("section-switch");
    for (var i = 0; i < ss.length; i++) {
        ss[i].onclick = function (event) {
            sectionSwitchNoAjax(event.target.id);
        }
    }
}
function setupStyleSwitch() {
    var ss = document.getElementsByClassName("style-switch");
    for (var i = 0; i < ss.length; i++) {
        ss[i].onclick = function (event) {
            styleSwitch(event.target.id);
        }
    }
}
function styleSwitch(styleName) {
    var style = document.getElementById("style");
    if (styleName == "blanc") {
        style.setAttribute("href", "web-f-white.css");
    }
    else if (styleName == "noir") {
        style.setAttribute("href", "web-f.css");
    }
}
function isOverflowed_Y(element) {
    return element.scrollHeight > element.clientHeight;
}
function sectionSwitchNoAjax(sectionName) {
    var s = document.getElementById("content-" + sectionName);
    if (s != null) {
        hideSection();
        s.style.display = 'block';
        // s.setAttribute("style", "display: unset");
        if (s.id == "content-section2") {
            var article = s.getElementsByClassName("article-f")[0];
            if (article.childElementCount == 0) {
                var iframe = document.createElement("iframe");
                iframe.setAttribute("src", "https://fr.lipsum.com/");
                article.appendChild(iframe);
            }
        }
    }
}
function hideSection() {
    var ss = document.getElementsByClassName("section-f");
    for (var i = 0; i < ss.length; ++i) {
        ss[i].setAttribute("style", "display: none");
    }
}

// ajax (unused)
// function setupSectionSwitch() {
//     var ss = document.getElementsByClassName("section-switch");
//     for (var i = 0; i < ss.length; i++) {
//         ss[i].onclick = function (event) {
//             sectionSwitch(event.target.id + '.html');
//         }
//     }
// }
// function sectionSwitch(newSectionPath) {
//     const req = new XMLHttpRequest(); //also check [fetch] API -> sectionSwitch2

//     req.onreadystatechange = function (event) {
//         if (this.readyState == XMLHttpRequest.DONE) {
//             if (this.status == 200) {
//                 var elSection = document.getElementsByClassName("section-f");
//                 for (var i = 0; i < elSection.length; i++) {
//                     elSection[i].innerHTML = this.responseText;
//                 }
//             }
//         }
//     }
//     req.open('GET', newSectionPath, true); //problème de sécurité avec google chrome et internet explorer (protocole file:// pas autorisé)
//     req.send(null);
// }
// function sectionSwitch2(newSectionPath) {
//     fetch(newSectionPath)
//         .then(response => response.text())
//         .then(function (text) {
//             var elSection = document.getElementsByClassName("section-f");
//             for (var i = 0; i < elSection.length; i++) {
//                 elSection[i].innerHTML = text;
//             }
//         }); //toujours le même problème de sécurité qu'avec XMLHttpRequest
// }
