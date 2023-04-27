$(document).ready(function () {
    $("#user_log").keypress(function (event) {
      if (event.which == 13) {
        login_user();
      }
    });
    $("#pass_login").keypress(function (event) {
      if (event.which == 13) {
        login_user();
      }
    });

    $("#userlog_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
      $("#passlogin_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
      $("#name_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
    $("#last_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
    $("#email_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
    $("#telphone_regis").keypress(function (event) {
        if (event.which == 13) {
            regis_login();
        }
    });
  });

const inputs = document.querySelectorAll(".input");

function addClass() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function removeClass() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", addClass);
    input.addEventListener("blur", removeClass);
});


function login_user() {
    var user_log = $("#user_log").val();
    var pass_login = $("#pass_login").val();

    if (
        user_log == "" ||
        pass_login == ""
    ) {
        swal({
            icon: "warning",
            title: "ข้อมูลไม่ถูกต้อง",
            text: "Waring",
            button: false,
            timer: 1000,
        });
        // alert("ข้อมูลไม่ถูกต้อง);
        return false;
    }
    //debugger;
    $.ajax({
        url: "../edocument/action/action_login.php?op=login_edoc",
        type: "get",
        data: {
            user_log: user_log,
            pass_login: pass_login,
        },
        success: function(data) {
            //debugger;
            if (data != 'null') {
                var staus = JSON.parse(data);
                swal({
                    icon: 'success',
                    title: 'ยินดีต้อนรับเข้าสู่ระบบ',
                    text: 'Login Success',
                    width: 700,
                    button: false,
                    timer: 1300
                })
                sessionStorage.setItem('ID_login', staus['ID_login']);
                sessionStorage.setItem('statusadmin', staus['statusadmin']);
                sessionStorage.setItem('user_log', staus['user_log']);
                setTimeout(function() {
                    window.location = 'http://localhost/edocument/src/index.html';
                }, 1000);
            } else {

                swal({
                    icon: 'error',
                    title: 'ข้อมูลผิดพลาด!',
                    text: 'Error',
                    button: false,
                    timer: 1300

                })
            }

        }
    });
}


$(document).on("click", "#log_in", function() {
    login_user();
});


function regis_login() {
    var user_log = $("#userlog_regis").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
    var pass_login = $("#passlogin_regis").val();
    var name_regis = $("#name_regis").val();
    var last_regis = $("#last_regis").val();
    var email_regis = $("#email_regis").val();
    var telphone_regis = $("#telphone_regis").val();

    debugger;
    if (
        userlog_regis == "" ||
        passlogin_regis == "" ||
        name_regis == "" ||
        last_regis == "" ||
        email_regis == "" ||
        telphone_regis == ""


    ) {
        swal({
            icon: "warning",
            title: "กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ🙂",
            text: 'warning',
            button: false,
            timer: 1000,
        });
        // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");
        return false;
    }
    $.ajax({
        url: "action/action_login.php?op=insertLogin",
        type: "get",
        data: {
            user_log: user_log, //ค่าแรกในไฟล์ phpmyadmin ค่าที่2 เอามาดึงที่เราสร้างตัวแปรไว้
            pass_login: pass_login,
            name_regis: name_regis,
            last_regis: last_regis,
            email_regis: email_regis,
            telphone_regis: telphone_regis,
        },
        success: function(data) {
            if (data == 1) {
                swal({
                    icon: "success",
                    title: "การส่งสำเร็จ",
                    text: "success",
                    button: false,
                    timer: 1500,
                });
                $("#userlog_regis").val("");
                $("#passlogin_regis").val("");
                $("#name_regis").val("");
                $("#last_regis").val("");
                $("#email_regis").val("");
                $("#telphone_regis").val("");

            } else {

                swal({
                    icon: "error",
                    title: "การส่งไม่สำเร็จ",
                    text:"error",
                    button: false,
                    timer: 1500,
                });



                // $("#form2").click();

            }
        },
    });
}

$(document).on("click", "#create_account", function() {
    //debugger;
    $.ajax({

        method: "GET",
        url: "../edocument/registration.html",
        success: function(data) {
            $("#show_content_account").html(data);
            $("#show_create_account").modal("show");
        } 
    });
});


$(document).on("click", "#save_re", function(e) {
    e.stopImmediatePropagation();
    regis_login();
});



// $("#myInputID").keypress(function (e) {
//     if (e.which == 13) { 
//       $("#myFormID").submit();
//        return false; 
//     }
//   });


// $(document).keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         alert('You pressed a "enter" key in somewhere');    
//     }
// });



// $('#someTextBox').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         alert('You pressed a "enter" key in textbox');  
//     }
// });