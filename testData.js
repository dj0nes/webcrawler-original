module.exports = {
    "internet1": {
        expectedResults: {
            success: ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p5", "http://foo.bar.com/p6"],
            skipped: ["http://foo.bar.com/p2", "http://foo.bar.com/p4","http://foo.bar.com/p1", "http://foo.bar.com/p5"],
            error: ["http://foo.bar.com/p3", "http://foo.bar.com/p7"]
        }
    },
    "internet2": {
        expectedResults: {
            success: ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4", "http://foo.bar.com/p5"],
            skipped: ["http://foo.bar.com/p1"],
            error: []
        }
    }
};
