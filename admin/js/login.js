// 1.书写入口函数
$(function () {
    // 2.给form表单注册submit事件
    $('.login_form').on('submit', function (e) {
        // 3.阻止默认提交方式
        e.preventDefault();
        // 4.发送ajax亲请求
        $.ajax({
            type: 'post',
            // url: 'http://localhost:8080/api/v1/admin/user/login',
            url:BigNew.user_login,
            data: $(this).serialize(),
            beforeSend: function () {
                // 5.发送请求之前判断用户输入的用户名或者密码是否为空\
                var flag = false;
                $('.login_form input[name]').each(function (index, ele) {
                    if ($.trim($(ele).val()) == '') {
                        flag = true;
                    };
                });
                if (flag) {
                    // alert('输入的用户名或密码不能为空');

                    $('.modal').modal('show');
                    $('.modal p').text('输入的用户名或密码不能为空');
                    return false;  // 阻止请求的发送
                }
            },
            success: function (res) {
                // if (res.code == 200) {
                //     // alert('登录成功');
                //     $('.modal').modal('show');
                //     $('.modal p').text(res.mag);
                //     window.location.href = './index.html';
                // }else{
                //     // alert(res.msg);
                //     $('.modal').modal('show');
                //     $('.modal p').text(res.msg);
                // };
                $('.modal').modal('show');
                $('.modal p').text(res.msg);
                if (res.code == 200) {
                    $('.modal').on('hidden.bs.modal', function (e) {
                        // 将登录成功时的返回值中的token储存到本地储存中
                        localStorage.setItem('token',res.token);
                        // 跳转到首页
                        window.location.href = './index.html';
                    })

                };
            },
        });
    });
})