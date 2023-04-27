$(document).ready(function() {
    selectStatuser();
    selectProvinceus();
});

function selectStatuser() {
    //debugger;
    $("#statuser").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/action_user_form.php?op=selectStatuser",
        type: "get",
        data: {},
        success: function(data1) {
            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $("#statuser").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });
        },
    });
}

function selectProvinceus() {
    // debugger;
    $("#Pro_us").html('<option value="" selected>--กรุณาเลือกจังหวัด--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/action_user_form.php?op=selectProvinceus",
        type: "get",
        data: {},
        success: function(data1) {
            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $("#Pro_us").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.PROVINCE_ID) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.PROVINCE_NAME) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });
        },
    });
}

$(document).ready(function (e) {
	$("#uploadimage").on('submit',(function(e) {
		e.preventDefault();
		$("#message").empty();
		$('#loading').show();
		$.ajax({
		url: "ajax_php_file.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
		$('#loading').hide();
		$("#message").html(data);
		}
	});
}));

// Function to preview image after validation
$(function() {
	$("#file").change(function() {
		$("#message").empty(); // To remove the previous error message
		var file = this.files[0];
		var imagefile = file.type;
		var match= ["image/jpeg","image/png","image/jpg"];
		if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
		{
		$('#previewing').attr('src','noimage.png');
		$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
		return false;
		}
		else
		{
		var reader = new FileReader();
		reader.onload = imageIsLoaded;
		reader.readAsDataURL(this.files[0]);
		}
	});
});
function imageIsLoaded(e) {
	$("#file").css("color","green");
	$('#image_preview').css("display", "block");
	$('#previewing').attr('src', e.target.result);
	$('#previewing').attr('width', '250px');
	$('#previewing').attr('height', '230px');
	};
});









//ปุ่มเพิ่มข้อมูลรูปภาพ
// $("#browse").on("click",function() {
//     var file = $(this).parent().parent().parent().find(".file");
//     file.trigger("click");
// });

// $('input[type="file"]').change(function(e) {
//     var fileprefix = e.target.files[0].prefix;
//     $("#file").val(fileprefix);
//     $('#previewing').attr('src','');
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         //ขั้นตอนอัพโหลดไฟล์
//         document.getElementById("preview").src = e.target.result;
//     };
//     reader.readAsDataURL(this.files[0]);
//     function imageIsLoaded(e) {
//         $("#file").css("color","green");
//         $('#image_preview').css("display", "block");
//         $('#previewing').attr('src', e.target.result);
//         $('#previewing').attr('width', '250px');
//         $('#previewing').attr('height', '230px');
//         };
    
// });




$(document).on("click", "#confirm", function(e) {
    e.stopImmediatePropagation();
    var a_id = $("#a_id").val() || 0;
    if (a_id == 0) {
        var opVal = "insertmen";
    } else {
        var opVal = "updateProfile&a_id=" + a_id;
    }
    // debugger;
    //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
    var prefix = $("#prefix").val();
    var name_user = $("#name_user").val();
    var lestname_user = $("#lestname_user").val();
    var phone_user = $("#phone_user").val();
    var statuser = $("#statuser").val();
    var address_improv = $("#address_improv").val();
    var parish_improv = $("#parish_improv").val();
    var district_improv = $("#district_improv").val();
    var Pro_us = $("#Pro_us").val();
    var post_improv = $("#post_improv").val();
    var email_user = $("#email_user").val();
    var photo_user = $("#photo_user").val() || "";

    var file_data = $("#filedata").prop("files")[0];
    var form_data = new FormData();

    form_data.append("file", file_data);
    form_data.append("a_id", a_id);
    form_data.append("photo_user", photo_user);
    form_data.append("prefix", prefix);
    form_data.append("name_user", name_user);
    form_data.append("lestname_user", lestname_user);
    form_data.append("phone_user", phone_user);
    form_data.append("statuser", statuser);
    form_data.append("address_improv", address_improv);
    form_data.append("parish_improv", parish_improv);
    form_data.append("district_improv", district_improv);
    form_data.append("Pro_us", Pro_us);
    form_data.append("post_improv", post_improv);
    form_data.append("email_user", email_user);

    // debugger;
    //เช็คค่าว่าง
    // if (
    //   photo_user == "" ||
    //   prefix == "" ||
    //   name_user == "" ||
    //   lestname_user == "" ||
    //   phone_user == "" ||
    //   statuser == "" ||
    //   address_improv == "" ||
    //   parish_improv == "" ||
    //   Pro_us == "" ||
    //   district_improv == "" ||
    //   post_improv == "" ||
    //   email_user == ""
    // ) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ🙂",
    //     showConfirmButton: false,
    //     timer: 1000,
    //   });
    //   // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");
    //   return false;
    // }

    $.ajax({
        url: "../action/action_user_form.php?op=" + opVal,
        type: "post",
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            if (data == 1) {
                Swal.fire({
                    icon: "error",
                    title: "การส่งไม่สำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "การส่งสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                });
                $("#photo_user").val("");
                $("#prefix").val("");
                $("#name_user").val("");
                $("#lestname_user").val("");
                $("#phone_user").val("");
                $("#statuser").val("");
                $("#address_improv").val("");
                $("#parish_improv").val("");
                $("#Pro_us").val("");
                $("#district_improv").val("");
                $("#post_improv").val("");
                $("#email_user").val;
                // selectDoc_out() ;
                // $("#out").click();
            }
        },
    });
});