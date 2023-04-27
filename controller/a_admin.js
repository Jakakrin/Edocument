// $("#a_home").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/admin/home.html", 
//         success: function(data){
//         $("#showContent").html(data); 


//         }
//     });
// })
// $("#form1").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/admin/form1.html", 
//         success: function(data){
//         $("#showContent").html(data); 

//         }
//     });
// })

// $("#form3").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/form/form3.html", 
//         success: function(data){
//         $("#showContent").html(data); 

//         }
//     });
// })

// $("#form2").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/form/form2.html", 
//         success: function(data){
//         $("#showContent").html(data); 

//         }
//     });
// })

// $("#selet").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/form/select.html", 
//         success: function(data){
//         $("#showContent").html(data); 

//         }
//     });
// })

// $("#sugges").click(function(){
//     $.ajax({
//         method: "GET",
//         url: "../src/bookit/sugges.html", 
//         success: function(data){
//         $("#showContent").html(data); 

//         }
//     });
// })



function selectMenbert() {
    $.ajax({
        url: "../action/action_doc_internal.php?op=selectDoc_out", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        success: function(internal) {
            var datadoc = JSON.parse(internal);

            showDatadoc1(datadoc);
        },
    });
}

function showDatadoc1(datadoc) {
    if (datadoc == null) {
        datadoc = datadoc = null;
    } else if ($.fn.DataTable.isDataTable("#tablemenber")) {
        viewShowDetailRefer.destroy();
        $("#tablemenber").empty();
    }

    viewShowDetailRefer = $("#tablemenber").DataTable({
        pageLength: 10,
        lengthMenu: [10, 20, 50, 100, 200, 500, 1000],
        language: {
            processing: "กำลังประมวลผล...",
            loadingRecords: "Loading...",
            lengthMenu: "แสดง _MENU_ รายการ",
            search: "ค้นหา :",
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
            info: "แสดง _START_ ถึง _END_ จากทั้งหมด _TOTAL_ รายการ",
            infoEmpty: "แสดง 0 ถึง 0 จากทั้งหมด 0 รายการ",
            infoFiltered: "(ค้นหา จากทั้งหมด MAX_ รายการ)",
            paginate: {
                first: "หน้าแรก",
                last: "หน้าสุดท้าย",
                next: "ถัดไป",
                previous: "ก่อนหน้า",
            },
        },

        data: datadoc,
        columns: [{
                mData: "number", //อันนี้ชื่อฐานข้อมูลแต่ไม่ต้องเอา PK มา นับ ให้นับตัวแรกที่เราสร้างไว้
                title: "ลำดับที่",
            },
            {
                mData: "addnumber", //อันนี้ชื่อฐานข้อมูลแต่ไม่ต้องเอา PK มา นับ ให้นับตัวแรกที่เราสร้างไว้
                title: "เลขที่ทะเบียน",
            },
            {
                mData: "form_name",
                title: "จากผู้ส่ง",
            },
            {
                mData: "sname1",
                title: "ฝ่าย/กลุ่มงาน",
            },
            {
                mData: "date_out",
                title: "วันที่",
            },
            {
                mData: "to_name",
                title: "ชื่อผู้รับ",
            },

            {
                mData: "sname2",
                title: "ฝ่าย/กลุ่มงาน",
            },

            {
                mData: "subject",
                title: "หัวข้อเรื่อง",
            },

            {
                mData: "dowl_out",
                title: "แนปไฟล์เอกสาร",
            },

            {
                mData: "note_out",
                title: "หมายเหตุ",
            },

            {
                mData: "list_doc",
                title: "รายการเอกสารส่งออก",
            },
            {
                mData: "show_btn",
                title: "รายละเอียด",
            },
        ],
    });
}






