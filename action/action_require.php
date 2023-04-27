<?php

require '../config/function.php';

$op = $_GET['op'];

if ($op == 'insertRequire') {
    insertRequire();
} 
else if ($op == 'selectAppeal'){
    selectAppeal();
}
else if ($op == 'selectProvince'){
    selectProvince();
}


else {
    echo $op;
}

function insertRequire()
{
    $sub_require    = $_GET['sub_require']; 
    $story_require  = $_GET['story_require'];  
    $sugges_impro   = $_GET['sugges_impro']; 
    $name_require   = $_GET['name_require'];  
    $phone_require  = $_GET['phone_require'];  
    $email_require  = $_GET['email_require']; 

    $add = insert(
        "i_book_require",
        "sub_require,story_require,sugges_impro,name_require,phone_require,email_require",
        "'$sub_require','$story_require','$sugges_impro','$name_require','$phone_require','$email_require'"
    );

    // if($add){
    //     echo "1";

    // }else
    // {echo "0";}


    echo $add;
}

function selectAppeal()
{
    $appeal = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "topic_story",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($appeal);
    echo $array;
}
function selectProvince()
{
    $province = selects(     //อันนี้เกี่ยวกับดาต้าเบส
        "province",
        ""         //อันแรกเกี่ยวกับไฟล์อันสองเกี่ยวกับการหาrow เช่น where 1 หาเฉพาะเจาะจง
    );
    $array = json_encode($province);
    echo $array;
}


