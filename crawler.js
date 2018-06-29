module.exports = class crawler {
    constructor(internet) {
        this.internet = internet.pages;
        this.visitedURLs = new Map();
        this.skippedURLs = new Map();
        this.errorURLs = new Map();
    }

    crawl(url) {
        let processingStatus = this.hasBeenProcessed(url);
        // do bookkeeping and skip node if it has already been processed
        if(processingStatus.processed) {
            let entry = this.visitedURLs.get(url);
            if(this.visitedURLs.has(url)) {
                // increment touch count for potential future inspection
                this.visitedURLs.set(url, { visited: true, touchCount: entry.touchCount + 1});
                // mark URL as skipped
                this.skippedURLs.set(url, { visited: true, touchCount: entry.touchCount + 1});
            }
            return Promise.resolve();
        }

        return this.downloadPage(url)
            .then(pageData => {
                // consider the URL visited since we downloaded its page
                this.visitedURLs.set(url, { visited: true, touchCount: 1});
                let links = this.parseLinks(pageData);
                // recursively crawl all links in page, resolve promise when all complete
                return Promise.all(links.map(this.crawl.bind(this)));
            }, err => {
                // could not download url, mark as error
                this.errorURLs.set(url, {visited: false});
            }).then(() => {
                // final object consumed by caller
                return {
                    visitedURLs: this.visitedURLs,
                    skippedURLs: this.skippedURLs,
                    errorURLs: this.errorURLs
                };}
            ).catch(console.error.bind(console));
    }

    downloadPage(url) {
        // simulate async download, allows concurrent "downloads"
        return new Promise((resolve, reject) => {
            let urlPage = this.internet.filter(entry => {
                return entry.address === url;
            });

            if(urlPage && urlPage.length > 0) {
                resolve(urlPage[0]);
            }
            else {
                reject("Error 404: page not found");
            }
        });
    }

    parseLinks(page) {
        // simulate parsing links out of a page
        if(page) {
            return page.links;
        }
        else {
            return [];
        }
    }

    hasBeenProcessed(url) {
        let visited = this.visitedURLs.has(url);
        let skipped = this.skippedURLs.has(url);
        let errored = this.errorURLs.has(url);
        let processed = visited || skipped || errored;

        return {
            visited,
            skipped,
            errored,
            processed
        };
    }
}
