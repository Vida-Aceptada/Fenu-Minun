const scrollbar = {}

scrollbar['scroll limit'] = () => {
    return scrollMaxY;
};

scrollbar['scroll size'] = () => {
    let sizeOfArea = scrollbar['scroll limit']() / window.innerHeight;
    let margins = 16 * 4 * sizeOfArea;
    return Math.floor((window.innerHeight - margins) / sizeOfArea);
};

scrollbar['scroll cords'] = 0;

scrollbar['adjust'] = () => {
   document.getElementById('SCROLL_AREA').style.height = `${scrollbar['scroll size']()}px`;
   document.getElementById('SCROLL_AREA').style.top = `32px`;
   document.getElementById('SCROLL_LIMIT').style.height = `${window.innerHeight - 64 - cssToInt(document.getElementById('SCROLL_AREA').style.height)}px`;
   document.getElementById('SCROLL_LIMIT_UPPER').style.height = `${cssToInt(document.getElementById('SCROLL_AREA').style.height) / 2}px`;
   document.getElementById('SCROLL_LIMIT_LOWER').style.height = `${cssToInt(document.getElementById('SCROLL_AREA').style.height) / 2}px`;
};

scrollbar['scroll'] = (amount) => {
    scrollbar['scroll cords'] += amount;
    
    if (scrollbar['scroll cords'] <= 0) {
        scrollbar['scroll cords'] = 0;
        document.getElementById('SCROLL_AREA').style.top = `32px`;
    } else if (scrollbar['scroll cords'] >= scrollbar['scroll limit']()) {
        scrollbar['scroll cords'] = scrollbar['scroll limit']();
        document.getElementById('SCROLL_AREA').style.top = `${window.innerHeight - cssToInt(document.getElementById('SCROLL_AREA').style.height) - 34}px`;
    }
    
    window.scrollTo({
        top: scrollbar['scroll cords'],
        left: 0,
        behavior: 'smooth'
    });
    if ((scrollbar['scroll cords'] > 0) && (scrollbar['scroll cords'] < scrollbar['scroll limit']())) {
        document.getElementById('SCROLL_AREA').style.top = `${cssToInt(document.getElementById('SCROLL_LIMIT').style.height) / (scrollbar['scroll limit']() / amount) + cssToInt(document.getElementById('SCROLL_AREA').style.top)}px`;
    }
};

scrollbar['switch on'] = true;

scrollbar['area position'] = 0;

window.addEventListener('DOMContentLoaded', () => {
    let scrolling = false;
    let scrollActive = false;
    let scrollUp = document.getElementById('SCROLL_UP');
    let scrollDown = document.getElementById('SCROLL_DOWN');
    let scrollbarEl = document.getElementById('SCROLL_LIMIT');
    let scrollArea = document.getElementById('SCROLL_AREA');
    let body = document.getElementsByTagName('body')[0];
    scrollArea.style.top = window.getComputedStyle(scrollArea).top;
    scrollbarEl.style.height = window.getComputedStyle(scrollbarEl).height;
    let createInterval = (amount) => {
        scrolling = setInterval(() => {
            scrollbar['scroll'](amount);
        }, 100);
    };
    scrollbar['adjust']();
    body.addEventListener('wheel', (event) => {
        if (scrollbar['switch on']) scrollbar['scroll'](event.deltaY * 50);
    });
    scrollUp.addEventListener('mousedown', () => {
        if (!scrolling) createInterval(-50);
    });
    scrollUp.addEventListener('mouseup', () => {
        if (scrolling) {
            clearInterval(scrolling);
            scrolling = false;
        }
    });
    scrollUp.addEventListener('mouseout', () => {
        if (scrolling) {
            clearInterval(scrolling);
            scrolling = false;
        }
    });
    scrollUp.addEventListener('click', () => {
        if (!scrolling) scrollbar['scroll'](-50);
    });
    scrollDown.addEventListener('mousedown', () => {
        if (!scrolling) createInterval(50);
    });
    scrollDown.addEventListener('mouseup', () => {
        if (scrolling) {
            clearInterval(scrolling);
            scrolling = false;
        }
    });
    scrollDown.addEventListener('mouseout', () => {
        if (scrolling) {
            clearInterval(scrolling);
            scrolling = false;
        }
    });
    scrollDown.addEventListener('click', () => {
        if (!scrolling) scrollbar['scroll'](50);
    });
    scrollArea.addEventListener('mousedown', () => {
        if (!scrollActive) {
            scrollActive = true;
        }
    });
    scrollArea.addEventListener('mouseup', () => {
        if (scrollActive) {
            scrollActive = false;
        }
    });
    scrollArea.addEventListener('mouseout', () => {
        if (scrollActive) {
            scrollActive = false;
        }
    });
    scrollbarEl.addEventListener('click', (e) => {
        let scrollAdjustment = e.clientY - (cssToInt(scrollArea.style.height) / 2) - 32;
        scrollbar['scroll cords'] = scrollMaxY / cssToInt(scrollbarEl.style.height) * scrollAdjustment;
        scrollArea.style.top = `${scrollAdjustment + 32}px`;
        window.scrollTo({
            top: scrollbar['scroll cords'],
            left: 0,
            behavior: 'smooth'
        });
    });
    document.getElementById('SCROLL_LIMIT_UPPER').addEventListener('click', () => {
        scrollbar['scroll'](scrollbar['scroll limit']() * -1);
    });
    document.getElementById('SCROLL_LIMIT_LOWER').addEventListener('click', () => {
        scrollbar['scroll'](scrollbar['scroll limit']());
    });
    window.addEventListener('mousemove', e => {
        if (scrollActive) {
            let scrollAdjustment = e.clientY - (cssToInt(scrollArea.style.height) / 2) - 32;
            scrollbar['scroll cords'] = scrollMaxY / cssToInt(scrollbarEl.style.height) * scrollAdjustment;
            if (((scrollAdjustment + 32) < window.innerHeight - cssToInt(scrollArea.style.height) - 34) && ((scrollAdjustment + 32) > 32)) {
                scrollArea.style.top = `${scrollAdjustment + 32}px`;
            }
            if (scrollbar['scroll cords'] < 0) {
                scrollbar['scroll cords'] = 0;
            } else if (scrollbar['scroll cords'] > scrollbar['scroll limit']()) {
                scrollbar['scroll cords'] = scrollbar['scroll limit']();
            }
            window.scrollTo({
                top: scrollbar['scroll cords'],
                left: 0,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('resize', () => {
    scrollbar['adjust']();
});