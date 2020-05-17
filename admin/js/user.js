// 入口函数
$(function () {
    // 一打开页面就立马发送求情
    $.ajax({
        get: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/detail',
        // headers: {
        //     'Authorization': localStorage.getItem('token'),
        // },
        success: function (res) {
            // console.log(res);
            // 将获取到的结果渲染到页面上
            // $('#form .username').val(res.data.username);
            // $('#form .nickname').val(res.data.nickname);
            // $('#form .email').val(res.data.email);
            // // $('#form .user_pic').val(res.data.userpic);
            // $('#form .password').val(res.data.password);
            // 也可以使用遍历对象的方法实现
            for (var key in res.data) {
                $('#form .' + key).val(res.data[key])
            };

            $('#form .user_pic').attr('src', res.data.userPic);
        }
    });

    // 实现一个图片预览的功能
    $('#exampleInputFile').on('change', function () {
        // console.dir(this);
        // console.dir(this.files);
        // console.dir(this.files[0]);
        var file = this.files[0];
        // URL.createObjectURL() 会将一个待上传的文件生成一个可以浏览的地址
        var url = URL.createObjectURL(file);
        // console.log(url);
        // 把input中即将上传的文件转换成一个可以预览的地址然后给img标签 就可以查看即将要上传的图片了
        $('#form .user_pic').attr('src', url);


    });

    // 修改个人中心的信息
    // 获取修改按钮并注册事件 点击按钮时获取页面中的信息 然后发送给服务器，
    // 然后将服务器返回来的数据在重新渲染到页面上
    // 并且要修改父页面上的两个地方的图像和用户昵称
    // 1.使用form表单上的submit冒泡事件来触发button按钮上的submit使劲按 但是要阻止form表单的默认提交
    $('#form').on('submit', function (e) {
        // 阻止form表单的默认提交行为
        e.preventDefault();
        // 获取表单中 所有又name的表单的值
        var data = new FormData(this);  // FormData 是需要DOM对象的
        // 向服务器发送请求
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            // 发送求情的时候要在请求同种携带token令牌
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            data: data,
            // 因为FormData 获取到的值是二进制 所以这里还需要阻止 默认的转换为字符串的类型进行传递数据
            contentType: false,  // 阻止转换为其他编码
            processData: false,  // 不要转换成字符串
            // 获取到浏览器返回来的数据要进行页面渲染
            success: function (res) {
                // console.log(res);
                // 更新成功后该变得只是iframe中的数据进行了改变 要想全局数据一起改变的话，需要进行刷新用户体验不好
                if (res.code == 200) {
                    // 获取子页面的父页面进行更改用户信息
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
                                parent.$('.user_info img').attr('src', res.data.userPic);
                                // 将登录用户的名字渲染到页面上
                                parent.$('.user_info span>i').text(res.data.nickname);
                                // 个人中心的图片也同步设置
                                parent.$('.header_bar img').attr('src', res.data.userPic);
                            };

                        },
                    });
                };

            },
        });
    });
});