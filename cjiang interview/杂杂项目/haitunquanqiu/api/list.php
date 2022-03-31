<?php
    include 'conn.php';
    header("Content-type:text/html;charset=utf-8");
    // 前端传过来数据，当前页  和该页的数量
    $ipage = isset($_REQUEST['ipage'])?$_REQUEST['ipage']:'4';
    $num = isset($_REQUEST['num'])?$_REQUEST['num']:'40';
    $paixv = isset($_REQUEST['paixv'])?$_REQUEST['paixv']:'';//默认为升序
    $type = isset($_REQUEST['type'])?$_REQUEST['type']:'fenye';
    $left = isset($_REQUEST['left'])?$_REQUEST['left']:'';//输入的左边的金额
    $right = isset($_REQUEST['right'])?$_REQUEST['right']:'';//输入的右边的金额
    $mohu = isset($_REQUEST['mohu'])?$_REQUEST['mohu']:'';//模糊查询
    $index = ($ipage - 1) * $num ;    //当前条数的下标
    
    // 1、判断传过来的类型
    switch($type){
        case 'fenye':
        $sql = 'select * from haitunlist';//可以拿到总条数
        $sql2 = "select * from haitunlist LIMIT $index,$num";
        break;

        case 'paixv':
        $sql = "select * from haitunlist order by price $paixv";//可以拿到总条数
        $sql2 = "select * from haitunlist  order by price $paixv LIMIT $index,$num";
        break;

        case 'pinglunpaixv':
        $sql = "select * from haitunlist order by command $paixv";//可以拿到总条数
        $sql2 = "select * from haitunlist  order by command $paixv LIMIT $index,$num";
        break;

        case 'qujian':
        $sql = "select * from haitunlist where price BETWEEN $left and $right";
        $sql2 = "select * from haitunlist where price BETWEEN $left and $right  LIMIT $index,$num";
        break;

        case 'mohu':
        $sql = "select * from haitunlist  where title like '%$mohu%'";
        $sql2 = "select * from haitunlist  where title like '%$mohu%'  LIMIT $index,$num";
        break;
    }
    // 2、执行语句
    $res = $conn->query($sql);
    // 3、提取数据
    $res2 = $conn->query($sql2);
    $arr = $res2->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'total'=>$res->num_rows, //总条数
        'list' =>$arr, //拿到的数据，存为一个json对象
        'ipage'=>$ipage, //当前页数
        'num'=>$num
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    $conn->set_charset('utf8');//设置编码
    // 关闭连接
    // $res->close();
    // $conn->close();
?>