// $(document).ready(function() {
//     var eventFired = function ( type ) {
//         var n = $('#demo_info')[0];
//         n.innerHTML += '<div>'+type+' event - '+new Date().getTime()+'</div>';
//         n.scrollTop = n.scrollHeight;      
//     }
 
//     $('#i_book_doc')
//         .on( 'number_doc',  function () { eventFired( 'ลำดับที่' ); } )
//         .on( 'search.dt', function () { eventFired( 'ชนิดเอกสาร' ); } )
//         .on( 'page.dt',   function () { eventFired( 'วัน/เดือน/ปี' ); } )
//         .on( 'page.dt',   function () { eventFired( 'หัวข้อเรื่อง' ); } )
//         .on( 'page.dt',   function () { eventFired( 'สถานะ' ); } )
//         .DataTable();
// } );






//เรียกใช้ function ตาราง
function selectReport() {
    $.ajax({
      url: "../action/action_form_in.php?op=selectFileDoc", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
      type: "get", // method *แบบ GET
      success: function (data1) {
        // console.log(data1);
        var dataSet = JSON.parse(data1);
        // debugger;
        showDataSet(dataSet);
      },
    });
  };
  
  //แสดงตาราง report
  function showDataSet(dataSet) {
    if (dataSet == null) {
      dataSet = dataSet = null;
    } else if ($.fn.DataTable.isDataTable("#tablesid")) {
      viewShowDetailRefer.destroy();
      $("#tablesid").empty();
    }
  
    viewShowDetailRefer = $("#tablesid").DataTable({
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
          mData: "number",
          title: "เลขครุภัณฑ์",
        },
        {
          mData: "types",
          title: "ชนิดครุภัณฑ์",
        },
        {
          mData: "brand",
          title: "ยี่ห้อ",
        },
        {
          mData: "rp_department",
          title: "ชื่อหน่วยงาน",
        },
        {
          mData: "rp_price",
          title: "ราคา",
        },
        {
          mData: "rp_date",
          title: "วันที่กรอกข้อมูล",
        },
        {
          mData: "show_btn",
          title: "รายละเอียด",
        },
      ],
    });
  }