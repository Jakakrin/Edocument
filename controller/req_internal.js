$(document).ready(function() {
    selectStatus2();
    selectDoc_in();
});

function selectStatus2() {
    //debugger;
    $("#status2").html('<option value="" selected>--เลือก--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/action_req_internal.php?op=selectStatus2",
        type: "get",
        data: {},
        success: function(data1) {
            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $("#status2").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });
        },
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
        success: function(data1) {
            // console.log(data1);
            // debugger;
            var dataSet = JSON.parse(data1);
            // debugger;
            showDataSet(dataSet);
        },
    });
}

//แสดงตาราง report
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



$(document).on("click", "#show_re_internal", function(e) {
    var id_intnal = $(this).attr("id_intnal");

    $.ajax({
        url: "../action/action_doc_internal.php?op=selectEditIntnalre",
        type: "GET",
        data: {
            id_intnal: id_intnal,
        },

        success: function(array) {
            var edit = JSON.parse(array);
            //ส่วนอันนี้ต้องใช้ edit [0] เพราะ เราดึงฐานข้อมูลมาหลายตัวหรือเขียนอีกแบบเก็บตัวอาเรย์ไว้ที่ 0
            $(".addnumber_show").val(edit[0].addnumber);
            $(".form_name_show").val(edit[0].form_name);
            $(".date_out_show").val(edit[0].date_out);
            $(".to_name_show").val(edit[0].to_name);
            $(".show_status1").val(edit[0].sname1);
            $(".show_status2").val(edit[0].sname2);
            $(".subject_show").val(edit[0].subject);
            $(".dowl_out_show").val(edit[0].dowl_out);
            $(".note_out_show").val(edit[0].note_out);

            if (edit[0].list_doc == 1) {
                $("#show_sends").val("หนังสือเวียน");
            } else if (edit[0].list_doc == 2) {
                $("#show_sends").val("หนังสือทั่วไป");
            } else {
                $("#show_sends").val("หนังสือด่วน");
            }
            $("#myModalshow").modal("show");
        },
    });
});

