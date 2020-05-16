// 1.书写入口函数
$(function () {
    // 2.给登录按钮注册事件
    $('input_sub').on('click', function (e) {
        // 3.阻止form的默认提交行为
        e.preventDefault();
        // 4.获取登录的数据
        var username = $('.input_txt').val();
        var password = $('.input_pass').val();
        // 5.判断用户名和密码是否为空
        if ($.trim(username) == '' && $trim(password) == '') {
            alert('用户名和密码不能为空，请重新输入···');
            return;  // 阻止代码继续向下执行
        };
        // 6.发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: {
                username: username,
                password: password,
            },
            success: function (res) {
                // console.log(res);
                // console.log(typeof res);
                
                if (res.code == 200) {
                    alert('登录成功');
                    // 7.跳转到主页面
                    window.location.href = './index.html'
                }else{
                    alert(res.msg) // 提示用户错误
                };
            },
        });
    })
})