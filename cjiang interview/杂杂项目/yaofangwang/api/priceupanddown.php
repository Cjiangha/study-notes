<?php
    include 'conn.php';
    // 1、接受参数
    $order = isset($_REQUEST['order'])?$_REQUEST['order']:'asc';
    $page = isset($_REQUEST['page'])?$_REQUEST['page']:'1';//当前页数
    $num = isset($_REQUEST['num'])?$_REQUEST['num']:'40';//条数

    // 2、编写sql语句
    $index = ($page - 1) *$num;    
    // $index,$num =>下标，多少条，相应的index为 0,8,16,24,32,一

    $sql1= "select * from drug  order by price  $order limit $index,$num ";
    $sql2 = "select * from drug order by price  $order";//渲染

    // 3、执行语句
    $res = $conn ->query($sql1);
    $res2 = $conn ->query($sql2);

    $arr = $res ->fetch_all(MYSQLI_ASSOC);

    $data = array(
        // 关于计算总页数，条数共127条,后端拿到总数量和数量，可以进行页数的计算
        'total' =>  $res2->num_rows,//总量,num_rows为多少条记录
        'data' => $arr,//查询当前页的数据
        'page'=> $page,//当前页数
        'num' =>$num,//条数
        // 'order' =>$order//升降序
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

    $conn->set_charset('utf-8');
    //释放结果集
    $res->close();
    $res2->close();
    //关闭连接
    $conn->close();
?>