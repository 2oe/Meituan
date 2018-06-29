var dataJson = require('./mock/data.json');
var searchJson = require('./mock/search.json');
var listJson = require('./mock/list.json');
var list2Json = require('./mock/list2.json');

var obj = {
    '/api/swiper': dataJson,
    '/api/search': searchJson,
    '/api/list?con=北京': listJson,
    '/api/list?con=阿拉善盟': list2Json
}
module.exports = function(path) {
    return obj[path] || null;
}