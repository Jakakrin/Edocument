<?php
require '../config/function.php';

$op = $_GET['op'];

if ($op == 'selectStatus2') {
    selectStatus2();
} else if ($op == 'selectDoc_in') {
    selectDoc_in();
}
else if ($op == 'selectEditIntnalre') {
    selectEditIntnalre();
}

 else {
    echo $op;
}

function selectStatus2()
{
    $status = selects(
        "status",
        ""
    );
    $array = json_encode($status);
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
            $result['show_inter'] = 'ไม่มีไฟล์';
        }
            
        // '<button class= "btn btn-outline-success" id = "show_re_internal" id_intnal="' . $result['id_intnal'] . '"data-target="#myModalshow"><span class="fas fa-eye"></span></button>
        // ';
        $rows[] = $result;
    }

    //เปลีย่นจาก php => json
    $array = json_encode($rows);
    echo $array;
}

function selectEditIntnalre()
{
    //print_r ($_GET); die;
    global $conn;
    $id_intnal = $_GET['id_intnal'];
    $sql = "
    select*, 

     status1.s_id AS s_id1, status1.s_name AS sname1
     from doc_internal
     left join status AS status1 on doc_internal.groups_from = status1.s_id 
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


