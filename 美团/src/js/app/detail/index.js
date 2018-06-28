require(['jquery', 'render'], function($, render) {
    // 解析地址栏参数
    var arr = location.search.split('?')[1].split('&');
    var obj = {};
    arr.forEach(function(item) {
            var newArr = item.split('=');
            obj[newArr[0]] = newArr[1];
        })
        // 请求详情页数据
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            // 渲染页面
            render('#detailTpl', '.wrap', res.data.searchresult[obj.id]);
            // 点击返回跳转
            $('.back').on('click', function() {
                location.href = '../../page/list.html';
            })
        },
        error: function(error) {
            console.warn(error);
        }
    })
})