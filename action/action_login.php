<?php
require '../config/function.php';

$op = $_GET['op'];

if ($op == 'login_edoc') {
    login_edoc();
} else if ($op == 'insertLogin') {
    insertLogin();
} 
else{
    echo $op;
}
function login_edoc()
{

    $user_log  = $_GET['user_log'];
    $pass_login  = $_GET['pass_login'];

    $login = select(
        "login_db",
        "where user_log = '$user_log' and pass_login = '$pass_login'"
    );
    $array = json_encode($login);
    echo $array;
}

function insertLogin()
{

    //ตรงนี้เอาไว้เพิ่มฐานข้อมูลในเว็บของเรา อันแรกกับอันสองต้องเหมือนกัน
    //และเปลี่ยน GET เป็น GEt$_GET เลย 
    $userlog_regis = $_GET['user_log'];
    $passlogin_regis = $_GET['pass_login'];
    $name_regis = $_GET['name_regis'];
    $last_regis = $_GET['last_regis'];
    $email_regis = $_GET['email_regis'];
    $telphone_regis = $_GET['telphone_regis'];

    //ส่วนอันนี้เป็นการเขียนอัพโหลดข้อมูลลงไปยังฐานข้อมูล อันแรกจะเป็นชื่อ ไฟล์ อันที่สอง เป็นชื่อฐานข้อมูล และอันสุดท้ายก็เป็นชื่อที่เราตั้งไว้ด้านบน และดึงตัวแปรด้านบนที่อัพโหลดมาใส่ในนี้
    $add = insert(
        "login_db",
        "user_log,pass_login,name_regis,last_regis,email_regis,telphone_regis",
        "'$userlog_regis','$passlogin_regis','$name_regis','$last_regis','$email_regis','$telphone_regis'"
    );
    // echo $add;
    // die;
    ///เช็คค่า
    if ($add) {
        echo ("1");
    } else {
        echo ("0");
    }
}
