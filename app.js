const crawler = require("./crawler.js");
const internetData = require("./internetData.js");
const present = require("./presenter.js");

function main() {
    for(let internet in internetData) {
        crawlInternet(internet)
    }
}

function crawlInternet(internet) {
    let net = internetData[internet];
    let internetCrawler = new crawler(net);

    internetCrawler.crawl(net.pages[0].address)
        .then(results => present(results, internet))
        .catch(console.error.bind(console));
}

main();