<?php
  include 'conn.php';
  //1、接受数据
   $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';//用户名
   $psw = isset($_REQUEST['psw']) ? $_REQUEST['psw'] : '';//密码
 
   //2、些插入语句
  
   $sql1 = "select * from user where username = '$username'";
   $res = $conn->query($sql1);
   $count = $res->num_rows;
   if($count){//判断是否有该用户名
    $json = json_encode(array(
      'resultCode'=>500,
      'message'=>'注册失败！,用户名存在'
    ));
    echo $json;
   }
   else{
       $insert = "INSERT INTO user (username,password) VALUES('$username','$psw')";
       $res2 = $conn->query( $insert);
       if($res2==1){
         $json = json_encode(array(
            'resultCode'=>200,
            'message'=>'注册成功！'
          ));
         echo $json;

       }else{
        $json = json_encode(array(
          'resultCode'=>500,
          'message'=>'注册失败！发生错误。'
        ));
        echo $json;
       }
   } 

  
?>