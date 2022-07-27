const anchors = document.querySelectorAll("a[href]");

function modify() {
    if( ! /juejin\.cn/.test(window.location.href) ) return;

    console.log( window.location );

    [].forEach.call(anchors, ( a => {
        if (/link\.juejin\.cn\/\?target=/.test(a.href)) {
            const result = a.href.match(/.*\?target=(.*)/);
            const url = decodeURIComponent(result[1]) || '';

            if (url.length) {
                a.href = url;
                console.log(url)
            }
        }
    }));
}

modify();