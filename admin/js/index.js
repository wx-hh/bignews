// 1.入口函数
$(function () {
    // 2.页面一打开就向服务器发送请求获取用户信息
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url:BigNew.user_info,
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
                $('.user_info span').text(`欢迎  ${res.data.nickname}`);
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
    })
})