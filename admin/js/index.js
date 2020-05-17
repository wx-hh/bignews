// 1.入口函数
$(function () {
    // 2.页面一打开就向服务器发送请求获取用户信息
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: BigNew.user_info,
        // 携带token 口令访问服务器
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        // 处理请求成功后返回的数据
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 将用户的图像渲染到页面上
                $('.user_info img').attr('src', res.data.userPic);
                // 将登录用户的名字渲染到页面上
                $('.user_info span>i').text(res.data.nickname);
                // 个人中心的图片也同步设置
                $('.header_bar img').attr('src', res.data.userPic);
            };

        },
    });



    // 推出登录
    // 获取事件源注册事件
    $('.logout').on('click', function () {
        // 删除本地储存中的token
        localStorage.removeItem('token');
        // 跳转回登录页面
        location.href = './login.html';
    });


    // 获取左侧的几个a标签并注册事件
    $('.menu .level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 当点击第二个时 要让后边的三角进行旋转
        if ($(this).index() == 1) {  // 用索引来判断获取的是第几个div
            // 当点击这个div时要让下边的ul显示 就是切换隐藏或者显示
            $('.menu .level02').slideToggle();
            // 同时还需要实现三角的旋转
            $(this).find('b').toggleClass('rotate0')

            // 当ul显示的时候就默认让里边的第一个li标签有一个高亮的效果
            $('.menu .level02 li:eq(0)').addClass('active')
        };

        
    });

    // 当点击ul里面的li标签时 让点击的li标签有一个高亮度额显示
    $('.menu .level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})