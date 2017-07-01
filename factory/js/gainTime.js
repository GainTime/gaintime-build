function makeA(e) {
    e.addEventListener("click", function(t) {
        var o = e.href.split("/"),
            n = o[o.length - 1].split("#"),
            a = document.location.toString().split("/"),
            l = a[a.length - 1].split("#");
        if (f = n[1], void 0 != f && l[0] === n[0]) {
            t.preventDefault();
            var r = document.scrollingElement || document.documentElement,
                s = document.getElementById(f).offsetTop - 60;
            smoothScroll(r, s, 600)
        }
    })
}

function menuToggle(e) {
    var t = e.nextElementSibling;
    e.addEventListener("click", function(e) {
        e.stopPropagation(), t.style.maxWidth ? t.style.removeProperty("max-width") : t.style.maxWidth = "400px"
    })
}

function closeMenus() {
    menuToggles.forEach(function(e) {
        e.nextElementSibling.style.removeProperty("max-width")
    })
}

function makeDropdown(e) {
    e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.addEventListener("click", function(t) {
        t.stopPropagation(), toogleDropdown(e)
    }), e.addEventListener("keypress", function(t) {
        13 === t.keyCode && (t.preventDefault(), toogleDropdown(e)), 27 === t.keyCode && closeDropdowns()
    })
}

function toogleDropdown(e) {
    var t = e.getElementsByTagName("ul")[0],
        o = !!t.style.display;
    closeDropdowns(), o ? t.style.removeProperty("display") : t.style.display = "list-item"
}

function closeDropdowns() {
    dropdowns.forEach(function(e) {
        e.getElementsByTagName("ul")[0].style.removeProperty("display")
    })
}

function bar(e) {
    var t = document.createElement("div");
    t.setAttribute("class", "percentage " + e.dataset.color), t.setAttribute("style", "width: " + e.dataset.percentage);
    var o = document.createTextNode(e.dataset.text);
    if ("undefined" != o.data) {
        var n = document.createElement("span");
        n.appendChild(o), n.style.padding = "0 10px", t.appendChild(n), e.style.height = "20px"
    }
    e.appendChild(t)
}

function tooltip(e) {
    e.style.position = "relative";
    var t = document.createTextNode(e.dataset.tooltip),
        o = document.createElement("div");
    o.appendChild(t), o.setAttribute("class", "tooltip"), e.appendChild(o)
}

function close(e) {
    e.addEventListener("click", function(t) {
        t.stopPropagation(), remove(e.parentElement)
    })
}

function fadeOut(e) {
    function t() {
        e.style.opacity = "0", e.style.padding = "0", e.style.maxHeight = "0px", clearInterval(o)
    }
    var o = setInterval(t, 1)
}

function remove(e) {
    e.parentElement.removeChild(e)
}

function ask(e) {
    e.addEventListener("click", function(t) {
        return confirm(e.dataset.ask) ? void 0 : (t.preventDefault(), !1)
    })
}

function formater(e) {
    e.addEventListener("keypress", function(t) {
        switch (e.dataset.validate) {
            case "cpf":
                formatCpf(e, t)
        }
    })
}

function formatCpf(e, t) {
    8 != t.keyCode && 46 != t.keyCode && (3 != e.value.length && 7 != e.value.length || (e.value = e.value + "."), 11 == e.value.length && (e.value = e.value + "-"))
}

function validates(e) {
    e.addEventListener("blur", function(t) {
        switchValidations(e)
    })
}

function switchValidations(e) {
    switch (e.dataset.validate) {
        case "text":
            searcher(e, /^[a-zA-ZÃẼĨÕŨãẽĩõũÁÉÍÓÚáéíóúÂÊÎÔÛâêîôûÀÈÌÒÙàèìòùÄËÏÖÜäëïöü' ]*$/);
            break;
        case "num":
            searcher(e, /^[\d]*$/g);
            break;
        case "email":
            searcher(e, /^(([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+(\.([A-Za-z]{2,4}))*)*$/);
            break;
        case "cpf":
            cpf(e) || "" == e.value ? e.style.removeProperty("border") : e.style.border = "1px solid #F00";
            break;
        default:
            searcher(e, new RegExp(e.dataset.validate))
    }
}

function searcher(e, t) {
    null == e.value.match(t) ? e.style.border = "1px solid #F00" : e.style.removeProperty("border")
}

function cpf(e) {
    var t = e.value.replace(/\./g, "");
    t = t.replace(/\-/g, "");
    var o, n;
    if (o = 0, "00000000000" == t) return !1;
    for (i = 1; i <= 9; i++) o += parseInt(t.substring(i - 1, i)) * (11 - i);
    if (n = 10 * o % 11, 10 != n && 11 != n || (n = 0), n != parseInt(t.substring(9, 10))) return !1;
    for (o = 0, i = 1; i <= 10; i++) o += parseInt(t.substring(i - 1, i)) * (12 - i);
    return n = 10 * o % 11, 10 != n && 11 != n || (n = 0), n == parseInt(t.substring(10, 11))
}

function closeModal(e) {
    e.addEventListener("click", function(t) {
        t.stopPropagation(), e.parentElement.parentElement.removeAttribute("style")
    })
}
var smoothScroll = function(e, t, o) {
    if (t = Math.round(t), o = Math.round(o), 0 > o) return Promise.reject("bad duration");
    if (0 === o) return e.scrollTop = t, Promise.resolve();
    var n = Date.now(),
        a = n + o,
        l = e.scrollTop,
        r = t - l,
        s = function(e, t, o) {
            if (e >= o) return 0;
            if (o >= t) return 1;
            var n = (o - e) / (t - e);
            return n * n * (3 - 2 * n)
        };
    return new Promise(function(t, o) {
        var i = e.scrollTop,
            c = function() {
                var o = Date.now(),
                    d = s(n, a, o),
                    u = Math.round(l + r * d);
                return e.scrollTop = u, o >= a ? void t() : e.scrollTop === i && e.scrollTop !== u ? void t() : (i = e.scrollTop, void setTimeout(c, 0))
            };
        setTimeout(c, 0)
    })
};
gtModals = [].slice.call(document.getElementsByClassName("gt-modal")), modals = [].slice.call(document.querySelectorAll("[data-modal]")), closeModals = [].slice.call(document.getElementsByClassName("modal-close")), askers = [].slice.call(document.querySelectorAll("[data-ask]")), as = [].slice.call(document.getElementsByTagName("a")), closes = [].slice.call(document.getElementsByClassName("close")), deletes = [].slice.call(document.getElementsByClassName("deleter")), bars = [].slice.call(document.getElementsByClassName("bar")), toValidate = [].slice.call(document.querySelectorAll("[data-validate]")), dropdowns = [].slice.call(document.querySelectorAll(".dropdown, .dropdown-right, .dropdown-left, .dropup, .dropup-left, .dropup-right")), menuToggles = [].slice.call(document.getElementsByClassName("menu-toggle")), tooltips = [].slice.call(document.querySelectorAll("[data-tooltip]")), tooltips.forEach(function(e) {
    tooltip(e)
}), menuToggles.forEach(function(e) {
    menuToggle(e)
}), bars.forEach(function(e) {
    bar(e)
}), closes.forEach(function(e) {
    close(e)
}), deletes.forEach(function(e) {
    deleter(e)
}), dropdowns.forEach(function(e) {
    makeDropdown(e)
}), as.forEach(function(e) {
    makeA(e)
}), askers.forEach(function(e) {
    ask(e)
}), toValidate.forEach(function(e) {
    formater(e), validates(e), switchValidations(e)
}), closeModals.forEach(function(e) {
    closeModal(e)
}), document.addEventListener("click", function() {
    closeMenus(), closeDropdowns()
}), gtModals.forEach(function(e) {
    e.addEventListener("click", function(t) {
        "gt-modal" == t.target.className && e.removeAttribute("style")
    })
}), document.addEventListener("keypress", function(e) {
    27 == e.keyCode && gtModals.forEach(function(e) {
        e.removeAttribute("style")
    })
}), modals.forEach(function(e) {
    e.addEventListener("click", function(t) {
        var o = document.getElementById(e.dataset.modal);
        o.parentElement.style.display = "block"
    })
});