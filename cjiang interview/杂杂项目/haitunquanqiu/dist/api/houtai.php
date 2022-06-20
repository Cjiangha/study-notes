<?php
    $servername = 'localhost';
    $username= 'root';
    $password = 'root';
    $dbname='test2';
    //建立连接
    $conn = new mysqli($servername,$username,$password,$dbname); 

        //1、接受数据
    $page = isset($_GET['page'])?$_GET['page']:'1'; //当前页数
    $num = isset($_GET['num'])?$_GET['num']:'4';//条数
    $password = isset($_GET['password'])?$_GET['password']:'4';//密码
    $email = isset($_GET['email'])?$_GET['email']:'4';//条数
    $username = isset($_GET['email'])?$_GET['email']:'username';//条数
    $type = isset($_GET['type'])?$_GET['type']:'xuanrang';//条数

      //1、 写sql语句
      $index = ($page - 1) *$num;    
      // $index,$num =>下标，多少条，相应的index为 0,8,16,24,32,一
    switch($type){
        case 'updatepsw':
           $sql1 = "update user set `password` = $password where username = '红鑫' limit $index,$num";
           $sql2 = 'SELECT * FROM user';
           break;
        case 'updateemail':
           $sql1 = "update user set `email` = $email where username = '红鑫' limit $index,$num";
           $sql2 = 'SELECT * FROM user';
           break;
        case 'delete':
           $sql1 = "delete from user WHERE username = $username limit $index,$num;";
           $sql2 = 'SELECT * FROM user';
        case 'xuanrang':
           $sql1 = "select * from user limit $index,$num";
           $sql2 = 'SELECT * FROM user';
           break;
    }
    //   $sql1 = "select * from user limit $index,$num";
    

      //2、执行语句
      $res = $conn->query($sql1);
      $res2 = $conn->query($sql2);//查询到所有数据
  
      //3、提取数据
      $arr = $res ->fetch_all(MYSQLI_ASSOC);

      //拿出来的是一个对象
        $data = array(
                // 关于计算总页数，条数共34条,后端拿到总数量和数量，可以进行页数的计算
                'total' =>  $res2->num_rows,//总量,num_rows为多少条记录
                'data' => $arr,//查询当前页的数据
                'page'=> $page,//当前页数
                'num' =>$num//条数
        );
        //4、把对象转成字符串
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
      //   echo 'yes';
        $conn->set_charset('utf-8');
?>