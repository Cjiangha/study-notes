## 1、mac地址是什么？有什么作用？在windows下面怎么查看相应的mac地址？    
  * **很官方的回答,参考下文章** [什么是mac地址 mac地址有什么作用【详细介绍】](https://product.pconline.com.cn/itbk/wlbg/network/1709/9971648.html)
    MAC(Media Access Control, 介质访问控制)，或称为 MAC位址、硬件位址，用来定义网络设备的位置。
    
    我的理解：MAC 和 IP 可以相互的映射

  * **通俗点的答案,参考下文章** [MAC地址是什么？它起着什么样的作用呢？](https://baijiahao.baidu.com/s?id=1675243896164363245&wfr=spider&for=pc)  

    **mac地址是什么？**
    MAC地址（英语：Media Access Control Address），
    媒体存取控制位址，也称为局域网地址（LAN Address），
    MAC位址，
    以太网地址（Ethernet Address）
    或物理地址（Physical Address）。

    **那么MAC地址是作用的是什么呢？**
    当路由器通过适配器连接到局域网时，适配器上的硬件地址就用来标志路由器的某个接口，在具体的通信过程中，通过交换机内部的交换表把 MAC地址和 IP 地址一一对应。当有发送给本地局域网内一台主机的数据报时，交换机首先将数据包接收下来，然后把数据包中的 IP 地址按照交换表中的对应关系映射成 MAC地址，然后将数据包转发到对应的 MAC地址的主机上去。

    如果出现某台主机去盗用了ip地址，但是这台主机没有相应的mac地址的话，是接收不到数据包的，发送和接收都不可。

  * 在windows下面怎么查看mac地址?参考下文章：[本机mac地址怎么查？查看本机mac地址两种方法介绍](https://product.pconline.com.cn/itbk/software/dnyw/1703/8950530.html)


     * 方法1

        按“win”+“R”键打开“运行”窗口

        在窗口中输入cmd，以进入Windows命令处理程序;或点击左下角的“win”标徽在搜索栏中输入cmd也可以达到同样的效果。

        在Windows命令处理程序中输入“getmac”

        传输名称处唯一有媒体连接的对应的物理地址就是你的MAC地址

      * 方法2
        单击右下角的网络
        

     　    在弹出的窗口中选择“打开网络和共享中心”
             
     　　 在网络和共享中心中点击你已连上的网络
             
     　　 此时会弹出网络连接的状态，在该窗口中点击”详细信息“
             
     　　 在物理地址一栏看到的就是你本机的MAC地址

  ```bash
    getmac
  ```


  **参考下文章:** 
  [什么是mac地址 mac地址有什么作用【详细介绍】](https://product.pconline.com.cn/itbk/wlbg/network/1709/9971648.html)
   [MAC地址是什么？它起着什么样的作用呢？](https://baijiahao.baidu.com/s?id=1675243896164363245&wfr=spider&for=pc)  
  [本机mac地址怎么查？查看本机mac地址两种方法介绍](https://product.pconline.com.cn/itbk/software/dnyw/1703/8950530.html)
