// 入口函数
$(function () {
    // 打开页面的时候向服务器发送请求并将返回来的数据渲染值页面上
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            // 将获取到的数据渲染到页面上 使用模板引擎
            if (res.code == 200) {
                var htmlStr = template('categoryList', res);
                $('tbody').html(htmlStr);
            };
        },
    });

    // 获取修改按钮并注册事件弹出模态框
    $('#xinzengfenlei').on('click', function () {
        // console.log(123);
        
        $('.modal').modal('show')
    })
})