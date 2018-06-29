module.exports = (function() {

    function getKeysAsArray(map) {
        let keyArray = [];

        for (var key of map.keys()) {
            keyArray.push(key);
        }

        return keyArray;
    };

    return {
        getKeysAsArray
    };
})();



