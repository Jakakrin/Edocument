$(document).ready(function() {
    if (sessionStorage.length == 0) {
        window.location = "http://localhost/edocument/";
    }
    var menustaus = sessionStorage.getItem("ID_login");
    if (menustaus == 1) {
        $(".menu-admin").show();
    } else {
        // debugger;
    }
});

$.ajax({
    method: "GET",
    url: "../src/form/ricd_m.html",
    success: function(data) {
        $("#showContent").html(data);
    },
});

$("#user_form").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/form/user_form.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#doc_in").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/form/req_internal.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#doc_doc").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/form/form_external.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#doc_out").click(function() {
    $.ajax({
        method: "GET",
        url: "../edit_sai/sai/female.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#search_doc").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/form/search_doc.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#require").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/bookit/require.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#imporv").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/bookit/imporv.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#doc_in2").click(function() {
    $.ajax({
        method: "GET",
        url: "../src/form/req_external.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

$("#sigin_log").click(function() {
    //debugger;
    $.ajax({
        method: "GET",
        url: "../src/index.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});


$("#user_form").click(function() {
    //debugger;
    $.ajax({
        method: "GET",
        url: "../src/form/user_form.html",
        success: function(data) {
            $("#showContent").html(data);
        },
    });
});

// $("#create_account").click(function () {
//     $.ajax({
//         method: "GET",
//         url: "test.html",
//         success: function (data) {
//             $("#showContent7").html(data);
//         }
//     });
// })

function logout() {
    Swal.fire({
        title: "คุณแน่ใจที่จะออกจากระบบ?",
        text: "คุณจะไม่สามารถเปลี่ยนกลับไปหน้าเดิมได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout it!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Logout Succes",
                showConfirmButton: false,
                time: 2000,
            });
        }
        sessionStorage.clear();
        setTimeout(function() {
            window.location = "http://localhost/edocument/";
        }, 2500);
    });
}