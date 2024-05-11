$(document).ready(function () {
    $("input").click(function () {
        $("span").hide();
    })
    $('#btn-login').click(function (e) {
        e.preventDefault();
        $('.overlay').addClass('d-flex');
        const user = $('input[name=username]').val().trim();
        const pass = $('input[name=password]').val().trim();
        if (user == '') {
            showToastWarningTopRight("Vui lòng nhập tài khoản!");
            $("#check-username").text("Vui lòng nhập tài khoản!");
            $("#check-username").show();
            $("#check-password").hide();
        }
        else if (pass == '') {
            showToastWarningTopRight("Vui lòng nhập mật khẩu!");
            $("#check-password").text("Vui lòng nhập mật khẩu!");
            $("#check-password").show();
            $("#check-username").hide();
        }
        else {
            $("#check-username").hide();
            $("#check-password").hide();
            $.ajax({
                url: "Login",
                data: { User: user, Pass: pass },
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.s == 1) {
                        showToastErrorTopRight("Tài khoản không chính xác!");
                        $("#check-username").text("Tài khoản không chính xác!");
                        $("#check-username").show();
                        $("#check-password").hide();
                        console.log("1")
                    } else if (res.s == 2) {
                        showToastErrorTopRight("Mật khẩu không chính xác!");
                        $("#check-password").text("Mật khẩu không chính xác!");
                        $("#check-password").show();
                        $("#check-username").hide();
                        console.log("2")

                    } else {
                        $("#check-username").hide();
                        $("#check-password").hide();
                        window.location.href = "/Admin/Dashboard";
                        console.log("3")

                    }
                }
            })
        }
    })
});