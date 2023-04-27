$(document).ready(function() {
    selectStatus3(function() {});
});

//ไว้ถาม*******************************************
function resetexternal() {

    $(".number_doc").val("");
    $(".form_doc").val("");
    $(".status3").val("");
    $(".select3Box").val("");
    $(".date_doc").val("");
    $(".tto_doc").val("");
    $(".groups_to_doc").val("");
    $(".subject_doc").val("");
    $(".dowl_doc").val("");
    $(".note_doc").val("");
    // $("#myModal").modal("hide");

}

function selectStatus3(callback) {
    //debugger;
    // พี่ต้าร์อธิบายการใช้ # กะ .
    //$('#select3Box') id="select3Box"
    //$('.status3') class="select3Box"
    $(".select3Box").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/form_external.php?op=selectStatus3",
        type: "get",
        data: {},
        success: function(data1) {

            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $(".select3Box").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });
            callback();
        },
    });
    $('.select3Box').select2();

  
  $(".number_doc").val("");
  $(".form_doc").val("");
  $(".status3").val("");
  $(".select3Box").val("");
  $(".date_doc").val("");
  $(".tto_doc").val("");
  $(".groups_to_doc").val("");
  $(".subject_doc").val("");
  $(".dowl_doc").val("");
  $(".note_doc").val("");
  // $("#myModal").modal("hide");
}

function selectStatus3(callback) {
  //debugger;
  // พี่ต้าร์อธิบายการใช้ # กับใช้ .
  //$('#select3Box') id="select3Box"
  //$('.status3') class="select3Box"
  $(".select3Box").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
  $.ajax({
    url: "../action/form_external.php?op=selectStatus3",
    type: "get",
    data: {},
    success: function (data1) {

      var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
      // console.log(arraydata);

      $.each(arraydata, function (key, value) {
        //ใส่ค่าตัวแปรที่กำหนด
        $(".select3Box").append(
          // $("#ใส่ไอดีที่จะแสดง").append(
          $("<option></option>")
            .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
            .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
        );
      });
      callback();
    },
  });
  $('.select3Box').select2();

}


// อันนี้เพื่อเอาไว้กรอกข้อมูล+เพิ่มข้อมูล
$(document).on("click", "#finish_doc", function(e) {
    // console.log("6666")
    e.stopImmediatePropagation();
    var id_doc = $("#id_doc").val() || 0;
    if (id_doc == 0) {
        Opval = "insertBook_doc";
        // เอาไว้insert
        var number_doc = $(".number_doc").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
        var form_doc = $(".form_doc").val();
        var status3 = $(".status3").val();
        var date_doc = $(".date_doc").val();
        var tto_doc = $(".tto_doc").val();
        var groups_to_doc = $(".groups_to_doc").val();
        var subject_doc = $(".subject_doc").val();
        var dowl_doc = $(".dowl_doc").val();
        var note_doc = $(".note_doc").val() || "";

        // codeนี้รอถามผู้รู้
        var file_external = $("#file_external").prop("files")[0];
        var form_exter = new FormData();
        // ถ้าตั้งอย่างนี้แล้วต้องตั้ง post ไม่ใช้ get เเล้ว
        form_exter.append("file", file_external);
        form_exter.append("id_doc", id_doc);
        form_exter.append("number_doc", number_doc);
        form_exter.append("form_doc", form_doc);
        form_exter.append("status3", status3);
        form_exter.append("date_doc", date_doc);
        form_exter.append("tto_doc", tto_doc);
        form_exter.append("groups_to_doc", groups_to_doc);
        form_exter.append("subject_doc", subject_doc);
        form_exter.append("dowl_doc", dowl_doc);
        form_exter.append("note_doc", note_doc);

    } else {
        // updateข้อมูลใหม่
        Opval = "updateFormdoc";
        var number_doc = $(".number_doc_edit").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
        var form_doc = $(".form_doc_edit").val();
        var status3 = $(".status3_edit").val();
        var date_doc = $(".date_doc_edit").val();
        var tto_doc = $(".tto_doc_edit").val();
        var groups_to_doc = $(".groups_to_doc_edit").val();
        var subject_doc = $(".subject_doc_edit").val();
        var dowl_doc = $(".dowl_doc_edit").val();
        var note_doc = $(".note_doc_edit").val() || "";
        var file_DocEdit = $("#file_DocEdit").prop("files")[0];
        var form_exter = new FormData();
        // ถ้าตั้งอย่างนี้เเล้วนั้น จะต้องตั้งเป็น post ไม่ใช้ get เเล้ว 
        // code edit data
        form_exter.append("file", file_DocEdit);
        form_exter.append("id_doc", id_doc);
        form_exter.append("number_doc", number_doc);
        form_exter.append("form_doc", form_doc);
        form_exter.append("status3", status3);
        form_exter.append("date_doc", date_doc);
        form_exter.append("tto_doc", tto_doc);
        form_exter.append("groups_to_doc", groups_to_doc);
        form_exter.append("subject_doc", subject_doc);
        form_exter.append("dowl_doc", dowl_doc);
        form_exter.append("note_doc", note_doc);
    }

    if (
        number_doc == "" ||
        form_doc == "" ||
        status3 == "" ||
        date_doc == "" ||
        tto_doc == "" ||
        groups_to_doc == "" ||
        subject_doc == "" ||
        // dowl_doc == "" ||
        note_doc == ""
    ) {
        Swal.fire({
            icon: "warning",
            title: "กรุณากรอกข้อมูลให้ครบ👆",
            showConfirmButton: false,
            timer: 1000,
        });
        // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");
        return false;
    }

    $.ajax({
        //ทำและต้องเปลี่ยน post ทั้งทีและ ลบdata ให้เหลือ อันนี้เพราะมันเป็นกลุ่มเดียวกันแล้ว
        url: "../action/form_external.php?op=" + Opval,
        type: "POST",
        data: form_exter,
        contentType: false,
        cache: false,
        processData: false,

        success: function(data) {
            if (data == 1) {
                Swal.fire({
                    icon: "successfully",
                    title: "การส่งสำเร็จ🙂",
                    showConfirmButton: false,
                    timer: 1500,
                });
                resetexternal();

                // $(".number_doc").val("");  **********ย้ายไปข้างตรง function resetexternal()
                // $(".form_doc").val("");
                // $(".status3").val("");
                // $("#date_doc").val("");
                // $(".tto_doc").val("");
                // $(".groups_to_doc").val("");
                // $(".subject_doc").val("");
                // $("#dowl_doc").val("");
                // $(".note_doc").val("");
                // $("#myModal").modal("hide");

            } else {
                Swal.fire({
                    icon: "Unsuccessful",
                    title: "การส่งไม่สำเร็จ😢",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            selectBook_doc();
            // $("#doc").click();
        },
    });
});


// code ที่ผู้ใช้งานทำการ insert ข้อมูลเข้าไป เเล้วเเสดงข้อมูลออกมาในรูปแบบตารางข้อมูล data base

function selectBook_doc() {
  $.ajax({
    url: "../action/form_external.php?op=selectBook_doc", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
    type: "get", // method *แบบ GET
    success: function (data1) {
      console.log(data1);
           var dataSet = JSON.parse(data1);
           showDataSet(dataSet);
    },
  });
}

// //แสดงตาราง report
function showDataSet(dataSet) {
   if (dataSet == null) {
    dataSet = dataSet = null;
  } else if ($.fn.DataTable.isDataTable("#tabledoc_doc")) {
    viewShowDetailRefer.destroy();
    $("#tabledoc_doc").empty();
  }

  viewShowDetailRefer = $("#tabledoc_doc").DataTable({
    pageLength: 10,
    lengthMenu: [10, 20, 50, 100, 200, 500, 1000],
    language: {
      processing: "กำลังประมวลผล...",
      loadingRecords: "Loading...",
      lengthMenu: "แสดง MENU รายการ",
      search: "ค้นหา :",
      zeroRecords:
        "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
      info: "แสดง START ถึง END จากทั้งหมด TOTAL รายการ",
      infoEmpty: "แสดง 0 ถึง 0 จากทั้งหมด 0 รายการ",
      infoFiltered: "(ค้นหา จากทั้งหมด MAX รายการ)",
      paginate: {
        first: "หน้าแรก",
        last: "หน้าสุดท้าย",
        next: "ถัดไป",
        previous: "ก่อนหน้า",
      },
    },

    data: dataSet,
    columns: [
      {
        mData: "number_doc",                  //อันนี้ชื่อฐานข้อมูลแต่ไม่ต้องเอา PK มา นับ ให้นับตัวแรกที่เราสร้างไว้
        title: "เลขที่ทะเบียน",
      },
      {
        mData: "form_doc",
        title: "จากผู้ส่ง",
      },
      {
        mData: "sname3",
        title: "ฝ่าย/กลุ่มงาน/งาน(ผู้ส่ง)",
      },
      {
        mData: "date_doc",
        title: "วันที่",
      },
      {
        mData: "tto_doc",
        title: "ชื่อผู้รับ",
      },

      {
        mData: "groups_to_doc",
        title: "ฝ่าย/กลุ่มงาน/งาน(ผู้รับ)",
      },

      {
        mData: "subject_doc",
        title: "หัวข้อเรื่อง",
      },

      {
        mData: "dowl_doc",
        title: "แนบไฟล์เอกสาร",
      },

      {
        mData: "note_doc",
        title: "หมายเหตุ",
      },

      {
        mData: "show_doc",
        title: "รายละเอียด",
      },

    ],
  });
}

// เเสดงวันที่
$("#doc_doc").show(function() {
    setTimeout(function() {
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output =
            d.getFullYear() +
            "-" +
            (month < 10 ? "0" : "") +
            month +
            "-" +
            (day < 10 ? "0" : "") +
            day;

        $("#date_doc").val(output);
    }, 10);
});

//คำสั่งลบข้อมูล
$(document).on("click", "#delete_doc", function() {
    var id_doc = $(this).attr("id_doc");
    Swal.fire({
        title: "ตั๋ว-ไข-อยาก-ลบ-ก่อ?",
        text: "ตั๋ว-จะ-เปลี่ยน-บ่-ได้-เเล้ว-หนา!",
        icon: "warning",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "แม่น, ลบเต๊อะ!",
    }).then((data) => {
        if (data.isConfirmed) {
            $.ajax({
                url: "../action/form_external.php?op=delete_doc", // ดึงหน้ามาจาก form_external.php เพื่อลงข้อมูล
                type: "get", // method *แบบ GET
                data: {
                    // นำค่าจากข้างบนมาใส่
                    id_doc: id_doc,
                },
                success: function() {
                    //ถ้าลบสำเร็จจะเข้า  1 มา แต่ถ้าไม่สำเร็จต้องเข้า 0
                    Swal.fire("Delete!", "ข้อมูลถูกลบเเล้วเน้อ", "success");

                    selectBook_doc();
                },
            });
        }
    });
});


//คำสั่งเปิดหน้าเพื่อแก้ไข้และโชว์หน้าModal(เพื่อจะแก้ไขข้อมูลลลลลลลลลลลลล!!!!!)
$(document).on("click", "#edit_external", function(e) {

    var id_doc = $(this).attr("id_doc");

    $.ajax({
        url: "../action/form_external.php?op=selectEditformdoc",
        type: "GET",
        data: {
            id_doc: id_doc,
        },
        success: function(array) {
            var edit = JSON.parse(array);

            //ส่วนอันนี้ต้องใช้ edit [0] เพราะ เราดึงฐานข้อมูลมาหลายตัวหรือเขียนอีกแบบเก็บตัวอาเรย์ไว้ที่ 0
            $("#id_doc").val(edit[0].id_doc);
            $(".number_doc_edit").val(edit[0].number_doc);
            $(".form_doc_edit").val(edit[0].form_doc);
            //เอาไว้วาดก่อนและทำงานก่อนใครเขาเพื่อแบบการแก้บัค
            // $(".status3_edit").val(edit[0].status3_doc);
            selectStatus3(function() {
                var optionRecord3 = new Option(
                    edit[0].sname3,
                    edit[0].s_id3,
                    true,
                    true
                );
                $(".status3_edit").append(optionRecord3).trigger("change");
            });
            $(".date_doc_edit").val(edit[0].date_doc);
            $(".tto_doc_edit").val(edit[0].tto_doc);
            $(".groups_to_doc_edit").val(edit[0].groups_to_doc);
            $(".subject_doc_edit").val(edit[0].subject_doc);
            $(".dowl_doc_edit").val(edit[0].dowl_doc);
            $(".note_doc_edit").val(edit[0].note_doc);
            $("#myModalEdit").modal("show");
        },
    });
});



// คำสั่งโชว์หน้า Modalให้ดูข้อมูลก่อนแก้ไขข้อมูลหรือโชว์หลังแก้ไขข้อมูลเสร็จ
$(document).on("click", "#show_external", function(e) {
    var id_doc = $(this).attr("id_doc");
    $.ajax({
        url: "../action/form_external.php?op=selectEditformdoc",
        type: "GET",
        data: {
            id_doc: id_doc,
        },
        success: function(array) {
            var edit = JSON.parse(array);
            // codeนี้จะใช้ edit[0] เพราะดึงข้อมูลมาหลายตัว/เขียนอีกแบบเก็บตัวอาเรย์ไว้ที่0
            $(".show_number_doc").val(edit[0].number_doc);
            $(".show_form_doc").val(edit[0].form_doc);
            $(".show_status3").val(edit[0].sname3);
            $(".show_date_doc").val(edit[0].date_doc);
            $(".show_tto_doc").val(edit[0].tto_doc);
            $(".show_groups_to_doc").val(edit[0].groups_to_doc);
            $(".show_subject_doc").val(edit[0].subject_doc);
            $(".show_dowl_doc").val(edit[0].dowl_doc);
            $(".show_note_doc").val(edit[0].note_doc);
            $("#myModalShow").modal("show");
        },
    });
});