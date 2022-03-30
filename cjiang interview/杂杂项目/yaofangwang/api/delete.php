<?php

include 'conn.php';

$sid = isset($_REQUEST['sid'])?$_REQUEST['sid']:'42'; //当前页数


$sql = "DELETE from buycart where sid = $sid";

$res = $conn->query($sql);

if($res){
    echo 'yes';
}
else{
    echo 'no';
}

?>