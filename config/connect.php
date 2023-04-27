<?php

// $host = "localhost";
// $dbuser = "root";
// $dbpass = "";
// $dbname = "db_edocument";


// $host = "remotemysql.com";
// $dbuser = "y1KNQX0HTb";
// $dbpass = "ppoa37G46S";
// $dbname = "y1KNQX0HTb";

$host = "61.19.144.166";
$dbuser = "itdev_edocument";
$dbpass = "edocument1";
$dbname = "itdev_db_edocument";


$conn = mysqli_connect($host,$dbuser,$dbpass,$dbname);

// Change character set to utf8
mysqli_set_charset($conn,"utf8");

//echo "connect finish";
// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
