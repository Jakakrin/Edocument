// อันนี้เพื่อเอาไว้กรอกข้อมูล
$(document).on("click", "#adivce", function (e) {
    // debugger;  
    // console.log("6666")
    e.stopImmediatePropagation();
  
    var number_doc = $("#number_doc").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
    var form_doc = $("#form_doc").val();
    var status3 = $("#status3").val();
    var date_doc = $("#date_doc").val();
    var tto_doc = $("#tto_doc").val();
    var groups_to_doc = $("#groups_to_doc").val();
    var subject_doc = $("#subject_doc").val();
    var note_doc = $("#note_doc").val();
  
    if (
      number_doc == "" ||
      form_doc == "" ||
      status3 == "" ||
      date_doc == "" ||
      tto_doc == "" ||
      groups_to_doc == "" ||
      subject_doc == "" ||
      note_doc == ""
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
      url: "../action/action_inout.php?op=insertDoc_doc",
      type: "get",
      data: {
        number_doc: number_doc,
        form_doc: form_doc,
        status3: status3,
        date_doc: date_doc,
        tto_doc: tto_doc,
        groups_to_doc: groups_to_doc,
        subject_doc: subject_doc,
        note_doc: note_doc,
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
            title: "การส่งสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          $("#number_doc").val("");
          $("#form_doc").val("");
          $("#status3").val("");
          $("#date_doc").val("");
          $("#tto_doc").val("");
          $("#groups_to_doc").val("");
          $("#subject_doc").val("");
          $("#note_doc").val("");
          
  
          // $("#doc").click();
  
        }
      },
    });
  });