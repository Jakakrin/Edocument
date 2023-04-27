// อันนี้เพื่อเอาไว้กรอกข้อมูล
$(document).on("click", "#finish_req", function (e) {
    //debugger;  
    //  console.log("6666")
    e.stopImmediatePropagation();
  
    var sub_require = $("#sub_require").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
    var story_require = $("#story_require").val();
    var sugges_impro = $("#sugges_impro").val();
    var name_require = $("#name_require").val();
    var phone_require = $("#phone_require").val();
    var email_require= $("#email_require").val();

    if (
        sub_require  == "" ||
        story_require == "" ||
        sugges_impro == "" ||
        name_require == "" ||
        phone_require == "" ||
        email_require == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!🙂",
        showConfirmButton: false,
        timer: 1000,
      });
      // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");
      return false;
    }
  
    $.ajax({
      url: "../action/action_require.php?op=insertRequire",
      type: "get",
      data: {
        sub_require:sub_require ,
        story_require:story_require ,
        sugges_impro:sugges_impro,
        name_require:name_require ,
        phone_require:phone_require ,
        email_require:email_require,
      },
  
      success: function (data) {
    
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
            title: "ขอบคุณสำหรับคำแนะนำครับ",
            showConfirmButton: false,
            timer: 1500,
          });
          $("#sub_require").val("");
          $("#story_require").val("");
          $("#sugges_impro").val("");
          $("#name_require").val("");
          $("#phone_require").val("");
          $("#email_require").val("");
  
        }
      },
    });
  });
  