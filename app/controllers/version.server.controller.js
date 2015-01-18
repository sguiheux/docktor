'use strict';

/**
 * get information for Docktor version
 */
exports.getInfo = function (req, res) {
    var pjson = require('../../package.json');
    return json({'version': {'local': pjson.version}});
};

