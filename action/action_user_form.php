<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectStatuser') {
    selectStatuser(); //ฝ่าย
}
else if($op == 'selectProvinceus'){
    selectProvinceus(); // จังหวัด
} 
else if($op == 'insertmen'){
    insertmen();
}
else {
    echo $op;
}
function selectStatuser()
{
    $statuser = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "status",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($statuser);
    echo $array;
}

function selectProvinceus()
{
    $Province = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "province",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($Province);
    echo $array;
}
function insertmen()
{
    $filecheck = "";
    $file = "";
    if (isset($_FILES['file']['name'])) {
        $filecheck = $_FILES['file']['name'];
    }

    //print_r($_FILES);die;

    if ($filecheck != "") {
        $file = $_FILES['file']['name'];
        $infoExt = getimagesize($_FILES['file']['tmp_name']);
        if (strtolower($infoExt['mime']) == 'image/gif' || strtolower($infoExt['mime']) == 'image/jpeg' || strtolower($infoExt['mime']) == 'image/jpg' || strtolower($infoExt['mime']) == 'image/png') {
            $arrayimg = explode(".", $file);
            $file = date("Y-m-d-H-i-s") . "." . $arrayimg[1];
            $path = '../upload/' . $file;
            move_uploaded_file($_FILES['file']['tmp_name'], $path);
        }
    }


    //ตรงนี้เอาไว้เพิ่มฐานข้อมูลในเว็บของเรา อันแรกกับอันสองต้องเหมือนกัน
   
    $prefix = $_POST['prefix'];
    $name_user = $_POST['name_user'];
    $lestname_user = $_POST['lestname_user'];
    $phone_user = $_POST['phone_user'];
    $statuser = $_POST['statuser'];
    $address_improv = $_POST['address_improv'];
    $parish_improv = $_POST['parish_improv'];
    $district_improv = $_POST['district_improv'];
    $Pro_us = $_POST['Pro_us'];
    $post_improv = $_POST['post_improv'];
    $email_user = $_POST['email_user'];
    $photo_user = $_POST['photo_user'];

    //ส่วนอันนี้เป็นการเขียนอัพโหลดข้อมูลลงไปยังฐานข้อมูล อันแรกจะเป็นชื่อ ไฟล์ อันที่สอง เป็นชื่อฐานข้อมูล และอันสุดท้ายก็เป็นชื่อที่เราตั้งไว้ด้านบน
    $add = insert(
        "admin",
        "prefix,name_user,lestname_user,phone_user,statuser,address_improv,parish_improv,district_improv,Pro_us,post_improv,email_user,photo_user",
        "'$prefix','$name_user','$lestname_user','$phone_user','$statuser','$address_improv','$parish_improv','$district_improv','$Pro_us','$post_improv','$email_user','$path'"
    );
    ///เช็คค่า
    if ($add) {
        echo ("1");
    } else {
        echo ("0");
    }
    echo $add;
}