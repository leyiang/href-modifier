let targets = [
    // {
    //     target: "juejin.cn",
    //     rules: [
    //         {
    //             check: "link.juejin.cn/?target=",
    //             match: ".*\?target=(.*)"
    //         }
    //     ]
    // }
];

chrome.storage.sync.get("targets", raw => {
    console.log( raw );

    if( Array.isArray(raw.targets) ) {
        targets = raw.targets;
    }
});

// chrome.storage.sync.set({
//     targets
// })

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function getRegExp(string) {
    return new RegExp( escapeRegExp(string) );
}

function modify() {
    let rules = null;
    const url = window.location.href;

    const insideTarget = targets.some( info => {
        if( getRegExp(info.target).test( url ) ) {
            rules = info.rules;
            return true;
        }

        return false;
    });

    if( insideTarget ) {
        console.log("Hello from Href Modifier");
        const anchors = document.querySelectorAll("a[href]");

        [].forEach.call(anchors, ( a => {
            const href = a.href;

            rules.forEach( rule => {
                if ( getRegExp(rule.check).test(href) ) {
                    const matchReg = new RegExp( rule.match );
                    const result = href.match( matchReg );
                    const url = decodeURIComponent(result?.[1]) || '';

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
    /**
     * Some sites utilize frontend framework to build SPA
     * So the content is loaded util the api endpoint is resolved
     * Window.onload is the prior one, so we have to set a Timeout (try to guess)
     * But since we don't click a link as soon as we open a webpage, it's fine.
     */
    setTimeout(() => {
        modify();
        // TODO: Export the timeout option
        // Let user choose the timeout value
    }, 2000 );
}