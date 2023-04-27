"use strict";

$(document).ready(function () {
  selectTopic_story();
  selectProvince();
});

function selectTopic_story() {
  //debugger;
  $("#Topic_story").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง

  $.ajax({
    url: "../action/action_improv.php?op=selectTopic_story",
    type: "get",
    data: {},
    success: function success(data1) {
      var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
      // console.log(arraydata);

      $.each(arraydata, function (key, value) {
        //ใส่ค่าตัวแปรที่กำหนด
        $("#Topic_story").append( // $("#ใส่ไอดีที่จะแสดง").append(
        $("<option></option>").attr("value", value.id_topic) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
        .text(value.topic) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
        );
      });
    }
  });
}

function selectProvince() {
  //debugger;
  $("#Province").html('<option value="" selected>--เลือกผู้รับ--</option>'); //เซตค่าเริ่มต้นที่จะแสดง

  $.ajax({
    url: "../action/action_improv.php?op=selectProvince",
    type: "get",
    data: {},
    success: function success(data1) {
      var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
      // console.log(arraydata);

      $.each(arraydata, function (key, value) {
        //ใส่ค่าตัวแปรที่กำหนด
        $("#Province").append( // $("#ใส่ไอดีที่จะแสดง").append(
        $("<option></option>").attr("value", value.PROVINCE_ID) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
        .text(value.PROVINCE_NAME) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
        );
      });
    }
  });
} // อันนี้เพื่อเอาไว้กรอกข้อมูล


$(document).on("click", "#improv", function (e) {
  e.stopImmediatePropagation(); //  debugger;

  var Topic_story = $("#Topic_story").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)

  var infor_improv = $("#infor_improv").val();
  var idea_improv = $("#idea_improv").val();
  var name_improv = $("#name_improv").val();
  var address_improv = $("#address_improv").val();
  var Province = $("#Province").val();
  var post_improv = $("#post_improv").val();
  var phone_improv = $("#phone_improv").val();
  var email_improv = $("#email_improv").val(); // debugger;

  if (Topic_story == "" || infor_improv == "" || idea_improv == "" || name_improv == "" || address_improv == "" || Province == "" || post_improv == "" || phone_improv == "" || email_improv == "") {
    Swal.fire({
      icon: "warning",
      title: "กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ🙂",
      showConfirmButton: false,
      timer: 1000
    }); // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");

    return false;
  }

  $.ajax({
    url: "../action/action_improv.php?op=insetImprovement",
    type: "get",
    data: {
      Topic_story: Topic_story,
      //ค่าแรกในไฟล์ phpmyadmin ค่าที่2 เอามาดึงที่เราสร้างตัวแปรไว้
      infor_improv: infor_improv,
      idea_improv: idea_improv,
      name_improv: name_improv,
      address_improv: address_improv,
      Province: Province,
      post_improv: post_improv,
      phone_improv: phone_improv,
      email_improv: email_improv
    },
    success: function success(data) {
      if (data == 1) {
        Swal.fire({
          icon: "error",
          title: "การส่งไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "การส่งสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
        $("#Topic_story").val("");
        $("#infor_improv").val("");
        $("#idea_improv").val("");
        $("#name_improv").val("");
        $("#address_improv").val("");
        $("#Province").val("");
        $("#post_improv").val("");
        $("#phone_improv").val("");
        $("#email_improv").val(""); // $("#form2").click();
      }
    }
  });
});