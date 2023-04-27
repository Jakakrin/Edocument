<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectStatus3') {
    selectStatus3();
} else if ($op == 'selectDoc_in2') {
    selectDoc_in2();
} else {
    echo $op;
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
