<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectStatus') {
    selectStatus();
} else if ($op == 'selectStatus1') {
    selectStatus1();
} else if ($op == 'selectDoc_out') {
    selectDoc_out();
} else if ($op == 'selectEditIntnal') {
    selectEditIntnal();
} else if ($op == 'updateIntnal') {
    updateIntnal();
} else if ($op == 'delete_out') {
    delete_out();
} else if ($op == 'insertIntnal') {
    insertIntnal();
} else {
    echo $op;
}
//เลือกข้อมูลผู้ส่งเอกสารภายใน
function selectStatus()
{
    $status2 = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "status",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($status2);
    echo $array;
}
//เลือกข้อมูลผู้รับเอกสารภายใน
function selectStatus1()
{
    $status1 = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "status",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($status1);
    echo $array;
}

//แสดงตารางข้อมูลในตาราง
function selectDoc_out()
{
    global $conn;
    // $sql = "select * from doc_internal";
    $sql = "
    select*, 

     status1.s_id AS s_id1,status2.s_id AS s_id2 ,
     status1.s_name AS sname1,status2.s_name AS sname2  
     from doc_internal
     left join status AS status1 on doc_internal.groups_from = status1.s_id 
     left join status AS status2  on doc_internal.gruops_to= status2.s_id
     ORDER BY doc_internal.id_intnal DESC
    ";

    $dbquery = $conn->query($sql);
    $rows = array();
    $number = 1;
    while ($result = mysqli_fetch_array($dbquery)) {
        //อันนี้เข้าเงื่อนไขว่าถ้าเกิน10ตัวมันจะ ... แต่กำหนดให้มันโชว์ถึง เท่าไร ยกตัวอย่างเช่น 0-5 คือแสดง 5 ตัว 
        $chk = strlen($result['note_out']);
        if ($chk >= 10) {
            $result['note_out'] = mb_substr($result['note_out'], 0, 5, 'UTF-8') . "  ......";
        }
        $chk1 = strlen($result['subject']);
        if ($chk1 >= 10) {
            $result['subject'] = mb_substr($result['subject'], 0, 8, 'UTF-8') . "  ......";
        }

        $chk2 = strlen($result['dowl_out']);
        if ($chk2 >= 10) {
            $result['dowl_out'] = mb_substr($result['dowl_out'], 0, 8, 'UTF-8') . "  ......";
        }

        $chk3 = strlen($result['addnumber']);
        if ($chk3 >= 10) {
            $result['addnumber'] = mb_substr($result['addnumber'], 0, 8, 'UTF-8') . "  ......";
        }
        //ส่วนอันนี้จะเป็นการนับลำดับเลขและเรียงเลขให้เราจากน้อยไปมาก
        $result['number'] = $number;

        if ($result['list_doc'] == '1') {
            $result['list_doc'] = 'หนังสือเวียน';
        } else if ($result['list_doc'] == '2') {
            $result['list_doc'] = 'หนังสือทั่วไป';
        } else if ($result['list_doc'] == '3') {
            $result['list_doc'] = 'หนังสือด่วน';
        } else {
        }

        $result['show_btn'] =
            //อันนี้จะเป็นการกำหนดปุ่ม มี แสดง แก้ไข ลบ กำหนดตัวแปล  js php 
            '<button class= "btn btn-outline-success" id = "show_doc_internal" id_intnal="' . $result['id_intnal'] . '"data-target="#myModalshow"><span class="fas fa-eye"></span></button>
        <button type="button" class="btn btn-outline-warning" id="edit_doc_internal" id_intnal ="' . $result['id_intnal'] . '" data-target="#myModal"><span class="far fa-edit"></span></button>
        <button class= "btn btn-outline-danger" id = "delete_out" id_intnal="' . $result['id_intnal'] . '"><span class="fas fa-trash-alt"></span></button>
        ';
        $rows[] = $result;
        $number++;
    }
    //เปลีย่นจาก php => json
    $array = json_encode($rows);
    echo $array;
}
//เพิ่มข้อมูลในฐานข้อมูล
function insertIntnal()
{
    //ทำไรไม่ได้ให้ทำเองก่อนค่อยไปก็อปโค้ดหน้าอื่นและถามเพื่อนที่ทำงาน
    //ตรงนี้ัฟังก์ชั่นการทำงานของการอัพโหลดไฟล์
    // print_r($_FILES);print_r($_GET);die;
    $filecheck = "";
    $file = "";
    if (isset($_FILES['file']['name'])) {
        $filecheck = $_FILES['file']['name'];
    }
    if ($filecheck != "") {
        $file = $_FILES['file']['name'];
        //อันนี้หาชื่อไฟล์เองและนามสกุลไฟล์
        // $nameflie = pathinfo($file, PATHINFO_EXTENSION);
        // $filename = $file . "." .$nameflie ;
        $path = '../upload/' . $file;
        move_uploaded_file($_FILES['file']['tmp_name'], $path);
    }
    //ตรงนี้เอาไว้เพิ่มฐานข้อมูลในเว็บของเรา อันแรกกับอันสองต้องเหมือนกัน
    //และเปลี่ยน GET เป็น POST เลย 
    $addnumber = $_POST['addnumber'];
    $form_name = $_POST['form_name'];
    $status2 = $_POST['status2'];
    $date_out = $_POST['date_out'];
    $to_name = $_POST['to_name'];
    $status1 = $_POST['status1'];
    $subject = $_POST['subject'];
    $dowl_out = $_POST['dowl_out'];
    $note_out = $_POST['note_out'];
    $sends = $_POST['sends'];

    //ส่วนอันนี้เป็นการเขียนอัพโหลดข้อมูลลงไปยังฐานข้อมูล อันแรกจะเป็นชื่อ ไฟล์ อันที่สอง เป็นชื่อฐานข้อมูล และอันสุดท้ายก็เป็นชื่อที่เราตั้งไว้ด้านบน และดึงตัวแปรด้านบนที่อัพโหลดมาใส่ในนี้
    $add = insert(
        "doc_internal",
        "addnumber,form_name,groups_from,date_out,to_name,groups_to,subject,dowl_out,note_out,list_doc",
        "'$addnumber','$form_name','$status2','$date_out','$to_name','$status1','$subject','$file','$note_out','$sends'"
    );
    // echo $add; die;
    ///เช็คค่า
    if ($add) {
        echo ("1");
    } else {
        echo ("0");
    }
}
// ลบข้อมูลหน้า producttype
function delete_out()
{
    $id_intnal = $_GET['id_intnal'];

    $delete_out = del(
        "doc_internal", // แฟ้มข้อมูล ใน database
        "where  id_intnal = '$id_intnal'" // field ใน database และตัวแปร
    );
    echo $delete_out;
}
//เพืมข้อมูลที่แก้ไข
function updateIntnal()
{
    $filecheck = "";
    $file = "";
    if (isset($_FILES['file']['name'])) {
        $filecheck = $_FILES['file']['name'];
    }
    if ($filecheck != "") {
        $file = $_FILES['file']['name'];
        //อันนี้หาชื่อไฟล์เองและนามสกุลไฟล์
        // $nameflie = pathinfo($file, PATHINFO_EXTENSION);
        // $filename = $file . "." .$nameflie ;
        $path = '../upload/' . $file;
        move_uploaded_file($_FILES['file']['tmp_name'], $path);
    }
    $id_intnal = $_POST['id_intnal'];
    $addnumber_edit = $_POST['addnumber'];
    $form_name_edit = $_POST['form_name'];
    $status2_edit = $_POST['status2'];
    $date_out_edit = $_POST['date_out'];
    $to_name_edit = $_POST['to_name'];
    $status1_edit = $_POST['status1'];
    $subject_edit = $_POST['subject'];
    $dowl_out_edit = $_POST['dowl_out'];
    $note_out_edit = $_POST['note_out'];
    $sends = $_POST['sends'];

    $data = update(
        "doc_internal",
        "
        addnumber = '$addnumber_edit',form_name = '$form_name_edit' ,groups_from = '$status2_edit',
        date_out = '$date_out_edit',to_name = '$to_name_edit',groups_to = '$status1_edit',subject = '$subject_edit',
        dowl_out = '$file',note_out = '$note_out_edit',list_doc = '$sends'",

        "where id_intnal ='$id_intnal'"
    );
    if ($data) {
        echo "1";
    } else {
        echo "0";
    }
}

//แสดงข้อมูล editIntnal
function selectEditIntnal()
{
    //print_r ($_GET); die;
    global $conn;
    $id_intnal = $_GET['id_intnal'];
    $sql = "
    select*, 

     status1.s_id AS s_id1,status2.s_id AS s_id2 ,
     status1.s_name AS sname1,status2.s_name AS sname2  
     from doc_internal
     left join status AS status1 on doc_internal.groups_from = status1.s_id 
     left join status AS status2  on doc_internal.groups_to= status2.s_id
     where id_intnal = '$id_intnal'

    ";
    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {

        $rows[] = $result;
    }
    $array = json_encode($rows);
    echo $array;
}
