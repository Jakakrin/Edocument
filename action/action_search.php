<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectDoc_out') {
    selectDoc_out();
} else if ($op == 'selectBook_doc') {
    selectBook_doc();
} else if ($op == 'selectDoc_in'){
    selectDoc_in();
} else if ($op == 'selectDoc_in2'){
    selectDoc_in2();
} else {
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
     left join status AS status2  on doc_internal.groups_to= status2.s_id
     ORDER BY doc_internal.id_intnal DESC
    ";

    $dbquery = $conn->query($sql);
    $rows = array();
    $number = 1;
    while ($result = mysqli_fetch_array($dbquery)) {
        //อันนี้เข้าเงื่อนไขว่าถ้าเกิน10ตัวมันจะ ... แต่กำหนดให้มันโชว์ถึง เท่าไร ยกตัวอย่างเช่น 0-5 คือแสดง 5 ตัว 
        $chk = strlen($result['note_out']);
        if ($chk >= 10) {
            $result['note_out'] = mb_substr($result['note_out'], 0, 5, 'UTF-8') . "......";
        }
        $chk1 = strlen($result['subject']);
        if ($chk1 >= 10) {
            $result['subject'] = mb_substr($result['subject'], 0, 8, 'UTF-8') . "......";
        }

        $chk2 = strlen($result['dowl_out']);
        if ($chk2 >= 10) {
            $result['dowl_out'] = mb_substr($result['dowl_out'], 0, 8, 'UTF-8') . "......";
        }

        $chk3 = strlen($result['addnumber']);
        if ($chk3 >= 10) {
            $result['addnumber'] = mb_substr($result['addnumber'], 0, 8, 'UTF-8') . "......";
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


function selectDoc_in()
{
    global $conn;
    $user_log = $_GET['user_log'];
    $statusadmin = $_GET['statusadmin'];
    if($statusadmin == 1){
        $where = '';
    }
    else{
        $where = 'where doc_internal.to_name = "'.$user_log.'"';
    }

    $sql = 
    "select form_name,groups_from ,subject, date_out, note_out ,dowl_out, list_doc, 
    status1.s_id AS s_id1,status1.s_name AS sname1
    from doc_internal
    left join status AS status1 on doc_internal.groups_from = status1.s_id 
    $where
    ORDER BY doc_internal.id_intnal DESC
    
   ";
    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {
        if ($result['list_doc'] == '1') {
            $result['list_doc'] = 'หนังสือเวียน';
        } else if ($result['list_doc'] == '2') {
            $result['list_doc'] = 'หนังสือทั่วไป';
        } else if ($result['list_doc'] == '3') {
            $result['list_doc'] = 'หนังสือด่วน';
        } else {
        }
        if($result['dowl_out'] != ''){
            $result['show_inter'] = ' <a shape="circle" coords="90,58,3" alt="Mercury" href="../upload/'.$result['dowl_out'].'" download>Download</a>';
        }
        else{
            $result['show_inter'] = 'ฮาจะไปฮู้!!!!!!!!!!';
        }
            
        // '<button class= "btn btn-outline-success" id = "show_re_internal" id_intnal="' . $result['id_intnal'] . '"data-target="#myModalshow"><span class="fas fa-eye"></span></button>
        // ';
        $rows[] = $result;
    }

    //เปลีย่นจาก php => json
    $array = json_encode($rows);
    echo $array;
}


//แสดงตารางข้อมูลในตาราง
function selectDoc_in2()
{
    global $conn;
    $user_log = $_GET['user_log'];
    $statusadmin = $_GET['statusadmin'];
    if ($statusadmin == 1) {
        $where = '';
    } else {
        $where = 'where i_book_doc.tto_doc = "' . $user_log . '"';
    }

    $sql = "
    select form_doc,groups_from_doc,date_doc,subject_doc,dowl_doc,note_doc,
    status4.s_id AS s_id4,status4.s_name AS sname4
    from i_book_doc
    left join status AS status4 on i_book_doc.groups_from_doc = status4.s_id
    $where
    ORDER BY i_book_doc.id_doc DESC               
    ";

    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {

       if($result['dowl_doc'] != ''){
           $result['dowl_external'] = '<a shape="circle" coords="90,58,3" alt="Mercury" href="../upload/'.$result['dowl_doc'].'" download>Download</a>';
 } 
 else{
     $result['dowl_external'] = 'หลอกง่าย แถมโอนไว🤪!';
 }
            // icon รูปตาเเสดงข้อมูลในตารางให้เปลี่ยนเป็นแสดงข้อมูลผ่าน pop up เพื่อให้ง่ายต่อการมองเห็นข้อมูลได้สะดวกมากขึ้น
            //Ex.1 <button class= "btn btn-outline-success" id = "delete_doc" id_doc="' . $result['id_doc'] . '"><span class="fas fa-eye"></span></button>  

        
        $rows[] = $result;
    }

    //เปลีย่นจาก php => json
    $array = json_encode($rows);
    echo $array;
}