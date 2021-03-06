
/// <reference path="../chrome.d.ts"/>
var e = 45,
	f = 45,
	k, l = null;

function m() {
	var a = l.getAttribute("src"),
		b = document.createElement("a");
	b.href = a;
	return b.href
}
function n(a) {
	var b = a.ownerDocument.documentElement,
		c = a.ownerDocument.defaultView;
	a = a.getBoundingClientRect();
	return {
		left: a.left + c.pageXOffset - b.clientLeft,
		top: a.top + c.pageYOffset - b.clientTop
	}
}
function p(a, b) {
	return -1 != (" " + a.className.replace(/[\t\r\n]/g, " ") + " ").indexOf(" " + b + " ")
}
function q(a, b, c) {
	a.style.setProperty(b, c, "important")
}

function r() {
	var a = document.getElementById("sbi_camera_button");
	if (a) return a;
	a = document.createElement("div");
	a.setAttribute("id", "sbi_camera_button");
	q(a, "width", "29px");
	q(a, "height", "27px");
	a.onclick = function (a) {
		a.ctrlKey || a.button & 1 ? s(!1) : s(!0)
	};
	document.getElementsByTagName("body")[0].appendChild(a);
	return a
}

function t(a) {
	"IMG" === a.target.tagName && chrome.storage.sync.get(["sbi_option", "sbi_hover_min_dims"], function (b) {
		k = b.sbi_option;
		if ("mouseover" == k && (b = b.sbi_hover_min_dims, void 0 === b && (b = 45), f = e = b, b = a.target, !(p(b, "rg_i") || p(b, "th") || null !== b.getAttribute("id") && 0 == b.getAttribute("id").indexOf("imgthumb") || p(b, "css-3d-layer")))) {
			var c = window.getComputedStyle(b, null),
				d = b.clientHeight,
				g = b.clientWidth;
			if (!(d < e || g < f || "none" == c.getPropertyValue("display"))) {
				var h = n(b),
					g = h.left + parseFloat(c.paddingLeft) + g - 1 - 29,
					c = h.top + parseFloat(c.paddingTop) + d - 1 - 27,
					d = r();
				q(d, "top", c.toString() + "px");
				q(d, "left", g.toString() + "px");
				q(d, "display", "inline");
				l = b
			}
		}
	})
}
function u(a) {
	if (null != l) {
		var b = n(l).top,
			c = n(l).left,
			d = window.getComputedStyle(l, null),
			g = parseFloat(d.getPropertyValue("width")),
			d = parseFloat(d.getPropertyValue("height")),
			h = a.pageY;
		a = a.pageX;
		(h <= b || h >= b + d || a <= c || a >= c + g) && q(r(), "display", "none")
	}
}
function s(a) {
	chrome.extension.sendMessage({
		action: "sbiSearch",
		url: m(),
		selected: a,
		source: "camera_button"
	})
}
window.addEventListener("load", function (a) {
	a.target instanceof HTMLDocument && (document.addEventListener("mouseover", t, !0), document.addEventListener("mouseout", u, !0))
}, !1);