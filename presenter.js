module.exports = function present(results, internet) {
    // logs results to console in specified format

    let success = [];
    let skipped = [];
    let error = [];

    for(let key of results.visitedURLs.keys()) {
        success.push(key);
    }

    for(let key of results.skippedURLs.keys()) {
        skipped.push(key);
    }

    for(let key of results.errorURLs.keys()) {
        error.push(key);
    }

    console.log(`${[internet]}:\n` +
        `Success: \n[${success.map(el => `"${el}"`).join(', ')}]\n` +
        `Skipped: \n[${skipped.map(el => `"${el}"`).join(', ')}]\n` +
        `Error: \n[${error.map(el => `"${el}"`).join(', ')}]\n\n`
    );
}