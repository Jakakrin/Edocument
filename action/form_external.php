<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectStatus3') {
    selectStatus3();
} else if ($op == 'selectBook_doc') {
    selectBook_doc();
} else if ($op == 'insertBook_doc') {
    insertBook_doc();
} else if ($op == 'selectEditformdoc') {
    selectEditformdoc();
} else if ($op == 'delete_doc') {
    delete_doc();
} else if ($op == 'updateFormdoc') {
    updateFormdoc();
} else {
}


// เลือกแผนก/กลุ่มงาน/งานผู้ส่งเอกสารภายนอก
function selectStatus3()
{
    $status3 = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "status",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($status3);
    echo $array;
}

//แสดงตารางข้อมูลในตาราง
function selectBook_doc()
{
    global $conn;

    $sql = "select *, 
    status3.s_id AS s_id3,status3.s_name AS sname3
    from i_book_doc
    left join status AS status3 on i_book_doc.groups_from_doc = status3.s_id
    ORDER BY i_book_doc.id_doc DESC               
    ";

    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {

        $result['show_doc'] =
            // icon รูปตาเเสดงข้อมูลในตารางให้เปลี่ยนเป็นแสดงข้อมูลผ่าน pop up เพื่อให้ง่ายต่อการมองเห็นข้อมูลได้สะดวกมากขึ้น
            //Ex.1 <button class= "btn btn-outline-success" id = "delete_doc" id_doc="' . $result['id_doc'] . '"><span class="fas fa-eye"></span></button>  

            '<button class= "btn btn-outline-success" id ="show_external" id_doc="' . $result['id_doc'] . '"data-target="#myModalShow"><span class="fas fa-eye"></span></button>
            <button type="button" class="btn btn-outline-warning" id="edit_external" id_doc="' . $result['id_doc'] . '"data-target="#myModalEdit" ><span class="far fa-edit"></span></button>
            <button class= "btn btn-outline-danger" id ="delete_doc" id_doc="' . $result['id_doc'] . '"><span class="fas fa-trash-alt"></span></button>
            ';

        $rows[] = $result;
    }

    //เปลีย่นจาก php => json
    $array = json_encode($rows);
    echo $array;
}

//เพิ่มข้อมูลในฐานข้อมูล
function insertBook_doc()
{
    // อ่านก่อนๆๆๆๆ

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
        //     //อันนี้หาชื่อไฟล์เองและนามสกุลไฟล์
        //     // $nameflie = pathinfo($file, PATHINFO_EXTENSION);
        //     // $filename = $file . "." .$nameflie ;
        $path = '../upload/' . $file;
        move_uploaded_file($_FILES['file']['tmp_name'], $path);
    }

    //ตรงนี้เอาไว้เพิ่มฐานข้อมูลในเว็บของเรา อันแรกกับอันสองต้องเหมือนกัน
    //และเปลี่ยน GET เป็น POST เลย 
    $number_doc = $_POST['number_doc'];
    $form_doc = $_POST['form_doc'];
    $status3 = $_POST['status3'];
    $date_doc = $_POST['date_doc'];
    $tto_doc = $_POST['tto_doc'];
    $groups_to_doc = $_POST['groups_to_doc'];
    $subject_doc = $_POST['subject_doc'];
    $dowl_doc = $_POST['dowl_doc'];
    $note_doc = $_POST['note_doc'];
    //ส่วนอันนี้เป็นการเขียนอัพโหลดข้อมูลลงไปยังฐานข้อมูล อันแรกจะเป็นชื่อ ไฟล์ อันที่สอง เป็นชื่อฐานข้อมูล และอันสุดท้ายก็เป็นชื่อที่เราตั้งไว้ด้านบน
    $add = insert(
        "i_book_doc",
        "number_doc,form_doc,groups_from_doc,date_doc,tto_doc,groups_to_doc,subject_doc,dowl_doc,note_doc",
        "'$number_doc','$form_doc','$status3','$date_doc','$tto_doc','$groups_to_doc','$subject_doc','$file','$note_doc'"
    );

    // echo $add; die;
    ///เช็คค่า
    if ($add) {
        echo ("1");
    } else {
        echo ("0");
    }
}

// ลบข้อมูลก่อนหน้านี้
function delete_doc()
{
    $id_doc = $_GET['id_doc'];

    $delete_doc = del(
        "i_book_doc", // แฟ้มข้อมูล ใน database
        "where  id_doc = '$id_doc'" // field ใน database และตัวแปร
    );
    echo $delete_doc;
}

//เพิ่มข้อมูลที่แก้ไขเเล้ว
function updateFormdoc()
{
    //ตรงนี้ัฟังก์ชั่นการทำงานของการอัพโหลดไฟล์
    // print_r($_FILES);print_r($_GET);die;
    $filecheck = "";
    $file = "";
    if (isset($_FILES['file']['name'])) {
        $filecheck = $_FILES['file']['name'];
    }
    if ($filecheck != "") {
        $file = $_FILES['file']['name'];
        //     //อันนี้หาชื่อไฟล์เองและนามสกุลไฟล์
        //     // $nameflie = pathinfo($file, PATHINFO_EXTENSION);
        //     // $filename = $file . "." .$nameflie ;
        $path = '../upload/' . $file;
        move_uploaded_file($_FILES['file']['tmp_name'], $path);
    }
    $id_doc = $_POST['id_doc'];
    $number_doc_edit = $_POST['number_doc'];
    $form_doc_edit = $_POST['form_doc'];
    $status3_edit = $_POST['status3'];
    $date_doc_edit = $_POST['date_doc'];
    $tto_doc_edit = $_POST['tto_doc'];
    $groups_to_doc_edit = $_POST['groups_to_doc'];
    $subject_doc_edit = $_POST['subject_doc'];
    $dowl_doc_edit = $_POST['dowl_doc'];
    $note_doc_edit = $_POST['note_doc'];

    $data = update(
        "i_book_doc",
        "
        number_doc = '$number_doc_edit',form_doc = '$form_doc_edit' ,groups_from_doc = '$status3_edit',
        date_doc = '$date_doc_edit',tto_doc = '$tto_doc_edit',groups_to_doc = '$groups_to_doc_edit',subject_doc = '$subject_doc_edit',
        dowl_doc = '$file',note_doc = '$note_doc_edit'
        ",

        "where id_doc = $id_doc"
    );

    if ($data) {
        echo "1";
    } else {
        echo "0";
    }
}

//แสดงข้อมูล editformdoc
function selectEditformdoc()
{
    global $conn;
    $id_doc = $_GET['id_doc'];
    $sql = "select *,
    status3.s_id AS s_id3,
    status3.s_name AS sname3 
    from i_book_doc 
    left join status AS status3 on i_book_doc.groups_from_doc = status3.s_id 
    where id_doc = '$id_doc'
    ";

    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {

        $rows[] = $result;
    }

    //เปลีย่นจาก php => json
    $array = json_encode($rows);

    echo $array;
}
