// 入口函数
$(function () {
    // 一打开页面就立马发送求情
    $.ajax({
        get: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/detail',
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: function (res) {
            // console.log(res);
            // 将获取到的结果渲染到页面上
            // $('#form .username').val(res.data.username);
            // $('#form .nickname').val(res.data.nickname);
            // $('#form .email').val(res.data.email);
            // // $('#form .user_pic').val(res.data.userpic);
            // $('#form .password').val(res.data.password);
            // 也可以使用遍历对象的方法实现
            for(var key in res.data){
                $('#form .'+key).val(res.data[key])
            };

            $('#form .user_pic').attr('src',res.data.userPic);
        }
    });
});