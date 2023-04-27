$(document).ready(function() {
    // seletsoe();
    //อันนี้เอาไว้ทำcallback เพื่อให้การทำงานย้อนกลับและทำงานก่อน
    selectStatus(function() {});
    selectStatus1(function() {});
});

function resetinternal() {
    $(".addnumber").val("");
    $(".form_name").val("");
    $(".status2").val("");
    // $("#date_out").val("");
    $(".to_name").val("");
    $(".select2Box").val("");
    $(".select1Box").val("");
    $(".status1").val("");
    $(".subject").val("");
    $(".note_out").val("");
    $("input:radio[name = sends]").prop("checked", false);
    $("#file_out").val("");
    // $("#myModal").modal("hide");
}

//เลือกข้อมูลอีกฐานข้อมูลเพื่อเลือก ฝ่าย/แผนก/ตำแหน่ง
function selectStatus(callback) {
    $(".select2Box").html('<option value="" selected>------เลือก-----</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/action_doc_internal.php?op=selectStatus",
        type: "get",
        data: {},
        success: function(data1) {
            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $(".select2Box").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });

            callback(); //อันนี้เอาไว้ทำcallback เพื่อให้การทำงานย้อนกลับและทำงานก่อน
        },
    });
    $(".select2Box").select2();
}
//เลือกข้อมูลอีกฐานข้อมูลเพื่อเลือก ฝ่าย/แผนก/ตำแหน่ง
function selectStatus1(callback) {
    $(".select1Box").html('<option value="" selected>--เลือกผู้รับ--</option>'); //เซตค่าเริ่มต้นที่จะแสดง
    $.ajax({
        url: "../action/action_doc_internal.php?op=selectStatus1",
        type: "get",
        data: {},
        success: function(data1) {
            var arraydata = JSON.parse(data1); //รับค่าจาก php ที่ เปลี่ยนมาเป็น Json
            // console.log(arraydata);

            $.each(arraydata, function(key, value) {
                //ใส่ค่าตัวแปรที่กำหนด
                $(".select1Box").append(
                    // $("#ใส่ไอดีที่จะแสดง").append(
                    $("<option></option>")
                    .attr("value", value.s_id) //.attr("value", value.ตัวแปรจากฐานข้อมูลที่เป็น PK)
                    .text(value.s_name) //.text(value.ตัวแปรจากฐานข้อมูลที่เราจะนำมาแสดง)
                );
            });
            callback(); //อันนี้เอาไว้ทำcallback เพื่อให้การทำงานย้อนกลับและทำงานก่อน
        },
    });
    $(".select1Box").select2();
}

// อันนี้เพื่อเอาไว้กรอกข้อมูลและเพิ่มข้อมูล
$(document).on("click", "#save_doc", function(e) {
    e.stopImmediatePropagation();
    // debugger;
    var id_intnal = $("#id_intnal").val() || 0;
    if (id_intnal == 0) {
        Opval = "insertIntnal";
        //อันนี้เอาไว้insert
        var addnumber = $(".addnumber").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
        var form_name = $(".form_name").val();
        var status2 = $(".status2").val();
        var date_out = $(".date_out").val();
        var to_name = $(".to_name").val();
        var status1 = $(".status1").val();
        var subject = $(".subject").val();
        var note_out = $("#note_out").val();
        var sends = $("input:radio[name = sends]:checked").val();
        var dowl_out = $("#dowl_out").val() || "";

        var file_out = $("#file_out").prop("files")[0];
        var form_out = new FormData();
        //ถ้าตั้งอย่างนี้แล้วต้องตั้ง post ไม่get ละ
        form_out.append("file", file_out);
        form_out.append("id_intnal", id_intnal);
        form_out.append("addnumber", addnumber);
        form_out.append("form_name", form_name);
        form_out.append("status2", status2);
        form_out.append("date_out", date_out);
        form_out.append("to_name", to_name);
        form_out.append("status1", status1);
        form_out.append("subject", subject);
        form_out.append("note_out", note_out);
        form_out.append("sends", sends);
        form_out.append("dowl_out", dowl_out);
    } else {
        //อันนี้เอาไว้update
        // debugger;
        Opval = "updateIntnal";
        var addnumber = $(".addnumber_edit").val(); //(var ตัวแรกคือตัวแปรในเว็บform2) , (ตัวถัดไปคือดาต้าเบสเพื่อเก็บข้อมูล)
        var form_name = $(".form_name_edit").val();
        var status2 = $(".status2_edit").val();
        var date_out = $(".date_out_edit").val();
        var to_name = $(".to_name_edit").val();
        var status1 = $(".status1_edit").val();
        var subject = $(".subject_edit").val();
        var note_out = $(".note_out_edit").val();
        var sends = $("input:radio[name = sends]:checked").val();
        var dowl_out = $("#dowl_out_edit").val() || "";
        var file_edit = $("#file_edit").prop("files")[0];
        var form_out = new FormData();
        //ถ้าตั้งอย่างนี้แล้วต้องตั้ง post ไม่get ละ
        form_out.append("file", file_edit);
        form_out.append("id_intnal", id_intnal);
        form_out.append("addnumber", addnumber);
        form_out.append("form_name", form_name);
        form_out.append("status2", status2);
        form_out.append("date_out", date_out);
        form_out.append("to_name", to_name);
        form_out.append("status1", status1);
        form_out.append("subject", subject);
        form_out.append("note_out", note_out);
        form_out.append("sends", sends);
        form_out.append("dowl_out", dowl_out);
    }
    if (
        addnumber == "" ||
        form_name == "" ||
        status2 == "" ||
        date_out == "" ||
        to_name == "" ||
        status1 == "" ||
        subject == "" ||
        note_out == "" ||
        sends == ""
    ) {
        Swal.fire({
            icon: "warning",
            title: "กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ🙂",
            showConfirmButton: false,
            timer: 1000,
        });
        // alert("กรุณากรอกข้อมูลให้ครบด้วยครับ/ค่ะ!");
        return false;
    }
    // debugger;
    $.ajax({
        //ทำและต้องเปลี่ยน post ทั้งทีและ ลบdata ให้เหลือ อันนี้เพราะมันเป็นกลุ่มเดียวกันแล้ว
        url: "../action/action_doc_internal.php?op=" + Opval,
        type: "POST",
        data: form_out,
        contentType: false,
        cache: false,
        processData: false,

        success: function(data) {
            if (data == 1) {
                Swal.fire({
                    icon: "success",
                    title: "🙂 Success 🙂 ",
                    showConfirmButton: false,
                    timer: 1500,
                });
                resetinternal();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "😢 error 😢",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            selectDoc_out();
        },
    });
});

// แสดงตารางข้อมูลดาต้าเบส
function selectDoc_out() {
    $.ajax({
        url: "../action/action_doc_internal.php?op=selectDoc_out", // ดึงหน้ามาจาก action_private.php เพื่อลงข้อมูล
        type: "get", // method *แบบ GET
        success: function(data1) {
            var dataSet = JSON.parse(data1);

            showDataSet(dataSet);
        },
    });
}

 //แสดงตาราง report
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


// โชว์วันที่
$("#doc_out").show(function() {
    setTimeout(function() {
        var d = new Date();

        var day = d.getDate();
        var month = d.getMonth() + 1;

        var output =
            d.getFullYear() +
            "-" +
            (month < 10 ? "0" : "") +
            month +
            "-" +
            (day < 10 ? "0" : "") +
            day;

        $("#date_out").val(output);
    }, 10);
});

//คำสั่งลบข้อมูล
$(document).on("click", "#delete_out", function() {
    var id_intnal = $(this).attr("id_intnal");
    Swal.fire({
        title: "คุณแน่ใจไหมที่จะลบ?",
        text: "คุณจะไม่สามารถเปลี่ยนกลับได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((data) => {
        if (data.isConfirmed) {
            $.ajax({
                url: "../action/action_doc_internal.php?op=delete_out", // ดึงหน้ามาจาก action_doc_internal.php เพื่อลงข้อมูล
                type: "get", // method *แบบ GET
                data: {
                    // นำค่าจากข้างบนมาใส่
                    id_intnal: id_intnal,
                },
                success: function() {
                    //ถ้าลบสำเร็จจะเข้า  1 มา แต่ถ้าไม่สำเร็จต้องเข้า 0
                    Swal.fire("Deleted!", "รายการของคุณถูกลบแล้ว ", "success");
                    selectDoc_out();
                },
            });
        }
    });
});

//ปุ่มแก้ไขและแสดงค่าแก้ไข
$(document).on("click", "#edit_doc_internal", function(e) {
    var id_intnal = $(this).attr("id_intnal");

    $.ajax({
        url: "../action/action_doc_internal.php?op=selectEditIntnal",
        type: "GET",
        data: {
            id_intnal: id_intnal,
        },
        success: function(array) {
            var edit = JSON.parse(array);
            //ส่วนอันนี้ต้องใช้ edit [0] เพราะ เราดึงฐานข้อมูลมาหลายตัวหรือเขียนอีกแบบเก็บตัวอาเรย์ไว้ที่ 0
            $("#id_intnal").val(edit[0].id_intnal);
            $(".addnumber_edit").val(edit[0].addnumber);
            $(".form_name_edit").val(edit[0].form_name);
            $(".date_out_edit").val(edit[0].date_out);
            $(".to_name_edit").val(edit[0].to_name);
            //เอาไว้วาดก่อนและทำงานก่อนใครเขาเพื่อแบบการแก้บัค
            selectStatus(function() {
                var optionRecord1 = new Option(
                    edit[0].sname1,
                    edit[0].s_id1,
                    true,
                    true
                );
                $(".status2_edit").append(optionRecord1).trigger("change");
            });
            selectStatus1(function() {
                var optionRecord2 = new Option(
                    edit[0].sname2,
                    edit[0].s_id2,
                    true,
                    true
                );
                $(".status1_edit").append(optionRecord2).trigger("change");
            });
            $(".subject_edit").val(edit[0].subject);
            $(".dowl_out_edit").val(edit[0].dowl_out);
            $(".note_out_edit").val(edit[0].note_out);
            if (edit[0].list_doc == 1) {
                $("#sends-11").prop("checked", true);
            } else if (edit[0].list_doc == 2) {
                $("#sends-22").prop("checked", true);
            } else {
                $("#sends-33").prop("checked", true);
            }
            $("#myModal").modal("show");
        },
    });
});

//แสดงข้อมูล ในModalเพื่อโชว์หน้างานไว้เฉยๆ ให้ดูว่าข้อมูลครบไหม
$(document).on("click", "#show_doc_internal", function(e) {
    var id_intnal = $(this).attr("id_intnal");

    $.ajax({
        url: "../action/action_doc_internal.php?op=selectEditIntnal",
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