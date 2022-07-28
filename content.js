const target_list = [
    {
        target: /juejin\.cn/,
        rules: [
            {
                check: /link\.juejin\.cn\/\?target=/,
                match: /.*\?target=(.*)/
            }
        ]
    }

];

function modify() {
    let rules = null;
    const url = window.location.href;

    const insideTarget = target_list.some( info => {
        if( info.target.test( url ) ) {
            rules = info.rules;
            return true;
        }

        return false;
    });

    if( insideTarget ) {
        console.log("Hello from Href Modifier");
        const anchors = document.querySelectorAll("a[href]");
        console.log( anchors );

        [].forEach.call(anchors, ( a => {
            const href = a.href;

            rules.forEach( rule => {
                if ( rule.check.test(href) ) {
                    const result = href.match( rule.match );
                    const url = decodeURIComponent(result[1]) || '';

                    if (url.length) {
                        console.log(`[Href Modifier] From ${ a.href } => ${ url }`)
                        a.href = url;
                    }
                }
            });
        }));
    }
}

/**
 * Wait Until Post Loaded
 */
window.onload = () => {
    modify();
}