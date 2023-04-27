$(document).ready(function() {
    selectDoc_out();
    selectBook_doc();
    selectDoc_in();
    selectDoc_in2();

});


function selectDoc_out() {
    $.ajax({
        url: "../action/action_doc_internal.php?op=selectDoc_out", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        success: function(internal) {
            var datadoc = JSON.parse(internal);

            showDatadoc1(datadoc);
        },
    });
}
// ตารางเเสดงข้อมูลของเอกสารส่งภายในสถาบันฯ--->doc_internal.js
function showDatadoc1(datadoc) {
    if (datadoc == null) {
        datadoc = datadoc = null;
    } else if ($.fn.DataTable.isDataTable("#tabledoc_out")) {
        viewShowDetailRefer.destroy();
        $("#tabledoc_out").empty();
    }

    viewShowDetailRefer = $("#tabledoc_out").DataTable({
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
//แสดงตารางหน้าค้นหาเอกสาร==หน้าส่งเอกสารภายใน==doc_out
function showDataSet(dataSet) {
    if (dataSet == null) {
        dataSet = dataSet = null;
    } else if ($.fn.DataTable.isDataTable("#tabledoc_out")) {
        viewShowDetailRefer.destroy();
        $("#tabledoc_out").empty();
    }

    viewShowDetailRefer = $("#tabledoc_out").DataTable({
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

        data: dataSet,
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

function selectBook_doc() {
    $.ajax({
        url: "../action/form_external.php?op=selectBook_doc", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        success: function(data1) {
            // console.log(data1);
            // debugger;
            var dataSet = JSON.parse(data1);
            // debugger;
            showDataSet(dataSet);
        },
    });
}

//แสดงตารางหน้าค้นหาเอกสาร==หน้าส่งเอกสารภายนอก==doc_doc
function showDataSet2(dataSet) {
    // debugger;
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
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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
        columns: [{
                mData: "number_doc", //อันนี้ชื่อฐานข้อมูลแต่ไม่ต้องเอา PK มา นับ ให้นับตัวแรกที่เราสร้างไว้
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

function showDataSet(dataSet) {
    // debugger;
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
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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
        columns: [{
                mData: "number_doc", //อันนี้ชื่อฐานข้อมูลแต่ไม่ต้องเอา PK มา นับ ให้นับตัวแรกที่เราสร้างไว้
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

function selectDoc_in() {
    var user_log = sessionStorage.getItem("user_log");
    var statusadmin = sessionStorage.getItem("statusadmin");
    // debugger;
    $.ajax({
        url: "../action/action_req_internal.php?op=selectDoc_in", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        data: {
            user_log: user_log,
            statusadmin: statusadmin,
        },
        success: function(data_int) {
            // console.log(data_int);
            // debugger;
            var req_internal = JSON.parse(data_int);
            // debugger;
            showreq_internal(req_internal);
        },
    });
}
//แสดงตารางหน้าค้นหาเอกสาร==หน้ารับเอกสารภายใน==doc_in


function showreq_internal(req_internal) {
    // debugger;
    if (req_internal == null) {
        req_internal = req_internal = null;
    } else if ($.fn.DataTable.isDataTable("#tabledoc_in")) {
        viewShowDetailRefer.destroy();
        $("#tabledoc_in").empty();
    }

    viewShowDetailRefer = $("#tabledoc_in").DataTable({
        language: {
            processing: "กำลังประมวลผล...",
            loadingRecords: "Loading...",
            lengthMenu: "แสดง MENU รายการ",
            search: "ค้นหา :",
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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

        data: req_internal,
        columns: [{
                mData: "form_name",
                title: "ชื่อ-นามสกุล (ผู้ส่ง)",
            },
            {
                mData: "sname1",
                title: "ฝ่าย/กลุ่มงาน/งาน(ผู้ส่ง)",
            },

            {
                mData: "subject",
                title: "หัวข้อเรื่อง",
            },

            {
                mData: "date_out",
                title: "วัน/เดือน/ปี",
            },

            {
                mData: "note_out",
                title: "หมายเหตุ",
            },

            {
                mData: "dowl_out",
                title: "แนบไฟล์เอกสาร",
            },

            {
                mData: "list_doc",
                title: "ประเภทหนังสือ",
            },

            {
                mData: "show_inter",
                title: "รายละเอียด",
            },
        ],
    });
}



function selectBook_doc() {
    var user_log = sessionStorage.getItem("user_log");
    var statusadmin = sessionStorage.getItem("statusadmin");
    // debugger;
    $.ajax({
        url: "../action/form_external.php?op=selectBook_doc", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        data: {
            user_log: user_log,
            statusadmin: statusadmin,
        },
        success: function(data_ext) {
            // console.log(data_int);
            // debugger;
            var extennal = JSON.parse(data_ext);
            // debugger;
            show_external(extennal);
        },
    });

    function showDataSet(dataSet) {
        // debugger;
        if (dataSet == null) {
            dataSet = dataSet = null;
        } else if ($.fn.DataTable.isDataTable("#tabledoc_in")) {
            viewShowDetailRefer.destroy();
            $("#tabledoc_in").empty();
        }

        viewShowDetailRefer = $("#tabledoc_in").DataTable({
            language: {
                processing: "กำลังประมวลผล...",
                loadingRecords: "Loading...",
                lengthMenu: "แสดง MENU รายการ",
                search: "ค้นหา :",
                zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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
            columns: [{
                    mData: "form_name",
                    title: "ชื่อ-นามสกุล (ผู้ส่ง)",
                },
                {
                    mData: "sname1",
                    title: "ฝ่าย/กลุ่มงาน/งาน(ผู้ส่ง)",
                },
                {
                    mData: "subject",
                    title: "หัวข้อเรื่อง",
                },
                {
                    mData: "date_out",
                    title: "วัน/เดือน/ปี",
                },
                {
                    mData: "note_out",
                    title: "หมายเหตุ",
                },
                {
                    mData: "dowl_out",
                    title: "แนบไฟล์เอกสาร",
                },
                {
                    mData: "list_doc",
                    title: "ประเภทหนังสือ",
                },
                {
                    mData: "show_inter",
                    title: "รายละเอียด",
                },
            ],
        });
    }
}


//แสดงตารางหน้าค้นหาเอกสาร==หน้ารับเอกสารภายนอก==doc_in2
function show_external(data_exteral) {
    // debugger;
    if (data_exteral == null) {
        data_exteral = data_exteral = null;
    } else if ($.fn.DataTable.isDataTable("#tabledoc_doc")) {
        viewShowDetailRefer.destroy();
        $("#tabledoc_doc").empty();
    }

    viewShowDetailRefer = $("#tabledoc_doc").DataTable({
        language: {
            processing: "กำลังประมวลผล...",
            loadingRecords: "Loading...",
            lengthMenu: "แสดง MENU รายการ",
            search: "ค้นหา :",
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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

        data: data_exteral,
        columns: [

            {
                mData: "form_doc",
                title: "ชื่อ-นามสกุล(ผู้ส่ง)",
            },
            {
                mData: "sname3",
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
                mData: "show_doc",
                title: "รายละเอียด",
            },
        ],
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
        success: function(data1) {
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
            zeroRecords: "<font color='red'><center>ไม่พบข้อมูลที่คุณต้องการ ค้นหา</center></font>",
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