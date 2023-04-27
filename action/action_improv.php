<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectTopic_story') {
    selectTopic_story();
}
else if($op == 'selectProvince'){
    selectProvince();
} 
else if($op == 'insetImprovement'){
    insetImprovement();
}
else {
    echo $op;
}

function selectTopic_story()
{
    $topic_story = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "topic_story",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($topic_story);
    echo $array;
}

function selectProvince()
{
    $Province = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "province",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($Province);
    echo $array;
}

function insetImprovement()
{
    //ตรงนี้เอาไว้เพิ่มฐานข้อมูลในเว็บของเรา อันแรกกับอันสองต้องเหมือนกัน
    $Topic_story = $_GET['Topic_story'];
    $infor_improv = $_GET['infor_improv'];
    $idea_improv = $_GET['idea_improv'];
    $name_improv = $_GET['name_improv'];
    $address_improv = $_GET['address_improv'];
    $Province = $_GET['Province'];
    $post_improv = $_GET['post_improv'];
    $phone_improv = $_GET['phone_improv'];
    $email_improv = $_GET['email_improv'];
    //ส่วนอันนี้เป็นการเขียนอัพโหลดข้อมูลลงไปยังฐานข้อมูล อันแรกจะเป็นชื่อ ไฟล์ อันที่สอง เป็นชื่อฐานข้อมูล และอันสุดท้ายก็เป็นชื่อที่เราตั้งไว้ด้านบน
    $add = insert(
        "i_book_improv",
        "sub_topic,infor_improv,idea_improv,name_improv,address_improv,city_improv,post_improv,phone_improv,email_improv",
        "'$Topic_story','$infor_improv','$idea_improv','$name_improv','$address_improv','$Province','$post_improv','$phone_improv','$email_improv'"
    );
    ///เช็คค่า
    // if ($add) {
    //     echo ("1");
    // } else {
    //     echo ("0");
    // }
    echo $add;
}