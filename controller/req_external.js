$(document).ready(function () {
  selectStatus3();
  selectDoc_in2();

});
function selectStatus3() {
  // debugger;
  $("#status3").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
  $.ajax({
    url: "../action/action_req_external.php?op=selectStatus3",
    type: "get",
    data: {},
    success: function (data1) {

      var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
      // console.log(arraydata);

      $.each(arraydata, function (key, value) {
        //ใส่ค่าตัวแปรที่กำหนด
        $("#status3").append(
          // $("#ใส่ไอดีที่จะแสดง").append(
          $("<option></option>")
            .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
            .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
        );
      });
    },
  });
}


function selectDoc_in2() {
  // debugger;
  var user_log = sessionStorage.getItem("user_log");
  var statusadmin = sessionStorage.getItem("statusadmin");
  $.ajax({
    url: "../action/action_req_external.php?op=selectDoc_in2", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
    type: "get", // method *แบบ GET
    data: {
      user_log: user_log,
      statusadmin: statusadmin,
    },
    success: function (data1) {
      // console.log(data1);
      // debugger;
      var dataSet = JSON.parse(data1);
      // debugger;
      showDataSet(dataSet);
    },
  });
};


//แสดงตาราง report
function showDataSet(dataSet) {
  // debugger;
  if (dataSet == null) {
    dataSet = dataSet = null;
  } else if ($.fn.DataTable.isDataTable("#tabledoc_in2")) {
    viewShowDetailRefer.destroy();
    $("#tabledoc_in2").empty();
  }

  viewShowDetailRefer = $("#tabledoc_in2").DataTable({
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
        mData: "form_doc",
        title: "ชื่อ-นามสกุล(ผู้ส่ง)",
      },
      {
        mData: "sname4",
        title: "ฝ่าย/กลุ่มงาน/งาน(ผู้ส่ง)",
      },
      {
        mData: "date_doc",
        title: "วัน/เดือน/ปี",
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
        mData: "dowl_external",
        title: "รายละเอียด",
      },
    ],
  });
}
