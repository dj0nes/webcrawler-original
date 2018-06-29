const expect = require('chai').expect;
const should  = require('chai').should();
const assert  = require("assert");

// app requires
const crawler = require("./crawler.js");
const internetData = require("./internetData.js");
const testData = require("./testData.js");
const util = require("./util.js");



describe('app E2E', function() {

    describe('internet1_E2E', function() {
        const net = internetData.internet1;
        const answerKey = testData.internet1;
        const internetCrawler = new crawler(net);
        let resultPromise = internetCrawler.crawl(net.pages[0].address);

        it('should visit the expected links', () => {
            return resultPromise
                .then(results => {
                    let successKeys = util.getKeysAsArray(results.visitedURLs).sort();
                    expect(successKeys).to.be.deep.equal(answerKey.expectedResults.success.sort());
                    return results;
                });
        });

        it('should skip duplicate links', () => {
            return resultPromise
                .then(results => {
                    let skippedKeys = util.getKeysAsArray(results.skippedURLs).sort();
                    expect(skippedKeys).to.be.deep.equal(answerKey.expectedResults.skipped.sort());
                });
        });

        it('should error unreachable links', () => {
            return resultPromise
                .then(results => {
                    let errorKeys = util.getKeysAsArray(results.errorURLs).sort();
                    expect(errorKeys).to.be.deep.equal(answerKey.expectedResults.error.sort());
                });
        });
    });

    describe('internet2_E2E', function() {
        const net = internetData.internet2;
        const answerKey = testData.internet2;
        const internetCrawler = new crawler(net);
        let resultPromise = internetCrawler.crawl(net.pages[0].address);

        it('should visit the expected links', () => {
            return resultPromise
                .then(results => {
                    let successKeys = util.getKeysAsArray(results.visitedURLs).sort();
                    expect(successKeys).to.be.deep.equal(answerKey.expectedResults.success.sort());
                    return results;
                });
        });

        it('should skip duplicate links', () => {
            return resultPromise
                .then(results => {
                    let skippedKeys = util.getKeysAsArray(results.skippedURLs).sort();
                    expect(skippedKeys).to.be.deep.equal(answerKey.expectedResults.skipped.sort());
                });
        });

        it('should error unreachable links', () => {
            return resultPromise
                .then(results => {
                    let errorKeys = util.getKeysAsArray(results.errorURLs).sort();
                    expect(errorKeys).to.be.deep.equal(answerKey.expectedResults.error.sort());
                });
        });
    });

});
