define([
    'jquery',
    'handlebars'
], function($, handlebars) {
    function render(source, target, data, isAdd) {
        var tpl = $(source).html();
        var template = handlebars.compile(tpl);
        var html = template(data);
        if (isAdd) {
            $(target).append(html);
        } else {
            $(target).html(html);
        }
    }
    return render;

});