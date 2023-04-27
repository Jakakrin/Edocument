<?php
require "connect.php";
//แทรกข้อมูลลง db
function insert($table,$field,$value)

{
    global $conn;
    $sql = "insert into $table ($field) values ($value)";
    // echo $sql; die;
    $result = $conn->query($sql);
    return $result;
    // echo $sql;
}

//ลบข้อมูล
function del($table, $condition)
{
    global $conn;
    $sql = "delete from $table $condition";
    // return $sql; die;
    $result = $conn->query($sql);
    return $result;
}
//แก้ไขข้อมูล
function update($table, $command, $condition)
{
    global $conn;
    $sql = "UPDATE $table SET $command $condition";
    // echo $sql; die;
    $result = $conn->query($sql);
    return $result;
}
//เลือกข้อมูล
function select($table, $condition)
{
    global $conn;
    $sql = "select * from $table $condition";
    // return $sql; die;
    $dbquery = $conn->query($sql);
    $result = $dbquery->fetch_array();
    return $result;
}
//เลือกหลายแถว
function selects($table, $condition)
{
    global $conn;
    $sql = "select * from $table $condition";
    // echo $sql; die;
    $dbquery = $conn->query($sql);
    $rows = array();
    while ($result = mysqli_fetch_array($dbquery)) {
        $rows[] = $result;
    }
    return $rows;
}
