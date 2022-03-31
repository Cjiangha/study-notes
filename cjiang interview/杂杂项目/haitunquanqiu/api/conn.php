<?php
    // 建立连接
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $dbname = 'haitunquanqiu';
    $conn = new mysqli( $servername,$username, $password,$dbname );
    if($conn ->connect_error){
        die('连接失败:'.$conn->connect_error);
    }
    else{
        // echo '连接成功';
    }

?>