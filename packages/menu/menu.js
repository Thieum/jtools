;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.menu = factory();
}(this, (function () {

    const slideLeft = function (element, direction, done) {
        if (direction) {
            element.classList.add('jslide-left-in');
            setTimeout(function () {
                element.classList.remove('jslide-left-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-left-out');
            setTimeout(function () {
                element.classList.remove('jslide-left-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    const findElement = function(element, condition) {
        let foundElement = false;

        function path (element) {
            if (element && ! foundElement) {
                if (typeof(condition) == 'function') {
                    foundElement = condition(element)
                } else if (typeof(condition) == 'string') {
                    if (element.classList && element.classList.contains(condition)) {
                        foundElement = element;
                    }
                }
            }

            if (element.parentNode && ! foundElement) {
                path(element.parentNode);
            }
        }

        path(element);

        return foundElement;
    }

    const getWindowWidth = function() {
        let w = window;
        let d = document;
        let e = d.documentElement;
        let g = d.getElementsByTagName('body')[0];
        return w.innerWidth || e.clientWidth || g.clientWidth;
    }

    const selectOnLoad = function(adjustScroll) {
        let m = document.querySelectorAll('.jmenu nav a');
        for (let i = 0; i < m.length; i++) {
            m[i].classList.remove('selected');
        }

        let href = window.location.pathname;
        if (href) {
            let menu = document.querySelector('.jmenu a[href="'+ href +'"]');
            if (menu) {
                // Select header
                const parent = menu.closest('nav');
                if (parent) {
                    parent.classList.add('selected');
                }
                // Select child
                menu.classList.add('selected');
                // Direct scroll to element
                if (adjustScroll === true) {
                    // Force a small delay to ensure DOM is ready
                    menu.scrollIntoView({ block: 'center' });
                }
            }
        }
    }

    const Plugin = (function(el, options) {
        let obj = {};

        obj.show = function() {
            el.style.display = 'block';
            if (document.body.offsetWidth < 800) {
                slideLeft(el, 1);
            }
        }

        obj.hide = function() {
            if (document.body.offsetWidth < 800) {
                slideLeft(el, 0, function() {
                    el.style.display = 'none';
                });
            } else {
                el.style.display = 'none';
            }
        }

        obj.toggle = function() {
            if (el.offsetWidth) {
                obj.hide();
            } else {
                obj.show();
            }
        }

        obj.load = function() {
            if (options.adjustOnLoad !== false) {
                if (window.localStorage) {
                    let menu = el.querySelectorAll('nav');
                    for (let i = 0; i < menu.length; i++) {
                        if (menu[i].getAttribute('data-id')) {
                            let state = window.localStorage.getItem('jmenu-' + menu[i].getAttribute('data-id'));
                            if (state === '1') {
                                menu[i].classList.add('selected');
                            } else {
                                if (state === '0' || !menu[i].classList.contains('selected')) {
                                    menu[i].classList.remove('selected');
                                }
                            }
                        }
                    }
                }

                selectOnLoad(true);

                let a = el.querySelectorAll('a');
                for (let i = 0; i < a.length; i++) {
                    if (a[i].nextElementSibling && a[i].nextElementSibling.tagName === 'UL') {
                        a[i].classList.add('jmenu-subitem');
                        a[i].addEventListener('mousedown', function() {
                            if (a[i].classList.contains('opened')) {
                                a[i].classList.remove('opened');
                            } else {
                                a[i].classList.add('opened');
                            }
                        })
                    }
                }
            }
        }

        obj.update = function() {
            selectOnLoad();
        }

        obj.select = function(o, e) {
            if (o.tagName === 'NAV') {
                let m = el.querySelectorAll('nav');
                for (let i = 0; i < m.length; i++) {
                    m[i].style.display = 'none';
                }
                o.style.display = '';
                o.classList.add('selected');
            } else {
                let m = el.querySelectorAll('nav a');
                for (let i = 0; i < m.length; i++) {
                    m[i].classList.remove('selected');
                }
                o.classList.add('selected');

                // Better navigation
                if (options && options.collapse === true) {
                    if (o.classList.contains('show')) {
                        m = el.querySelectorAll('nav');
                        for (let i = 0; i < m.length; i++) {
                            m[i].style.display = '';
                        }
                        o.style.display = 'none';
                    } else {
                        m = el.querySelectorAll('nav');
                        for (let i = 0; i < m.length; i++) {
                            m[i].style.display = 'none';
                        }

                        m = el.querySelector('.show');
                        if (m) {
                            m.style.display = 'block';
                        }

                        m = findElement(o.parentNode, 'selected');
                        if (m) {
                            m.style.display = '';
                        }
                    }
                }
            }

            if (options && typeof(options.onclick) == 'function') {
                options.onclick(obj, e);
            }

            // Close menu if is oped
            if (getWindowWidth() < 800) {
                obj.hide();
            }
        }

        let action = function(e) {
            if (e.target.tagName === 'H2') {
                if (e.target.parentNode.classList.contains('selected')) {
                    e.target.parentNode.classList.remove('selected');
                    localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 0);
                } else {
                    e.target.parentNode.classList.add('selected');
                    localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 1);
                }
            } else if (e.target.tagName === 'A') {
                // Mark link as selected
                obj.select(e.target, e);
            } else {
                // Get target info
                let rect = el.getBoundingClientRect();
                let x;
                let y;

                if (e.changedTouches && e.changedTouches[0]) {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 45 && (y - rect.top) < 45) {
                    obj.hide();
                }
            }
        }

        el.addEventListener('click', action);

        // Add menu class
        el.classList.add('jmenu');

        // Load state
        obj.load();

        if (options && typeof(options.onload) == 'function') {
            options.onload(el, obj);
        }

        // Keep reference
        el.menu = obj;

        return obj;
    });

    // Events
    window.addEventListener('popstate', selectOnLoad);

    if (window.jSuites) {
        jSuites.setExtensions({ menu: Plugin });
    }

    return Plugin;

})));