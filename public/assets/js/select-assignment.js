jQuery(document).ready(function(){
    
    //CTCC前端
    //1.消息类型
    jQuery("#msgTypeControl_CTCC").append( 
        "<option>CTCCFRONTEND_STATE_REPORT</option>\
         <option>CTCCFRONTEND_CONTROL</option>"
    );
    //2.软件标识
    jQuery("#sysIdControl").append( 
        "<option>1</option>\
         <option>2</option>"
    );
    //3.命令名称
    jQuery("#operationControl").append( 
        "<option>OPEN</option>\
         <option>CLOSE</option>\
         <option>KILL</option>\
         <option>START</option>\
         <option>STOP</option>\
         <option>CLEAR</option>"
    );
    //4.软件模式
    jQuery("#patternControl").append( 
        "<option>1</option>\
         <option>2</option>"
    );
    //5.下行通道
    jQuery("#channelControl").append( 
        "<option>1</option>\
         <option>2</option>"
    );
    //6.主份软件主机名称
    jQuery("#mainHostNameControl").append( 
        "<option>undetermined</option>"
    );
    //7.备份软件主机名称
    jQuery("#backupHostNameControl").append( 
        "<option>undetermined</option>"
    );

    //协议
    //1.来源站
    jQuery("#sourceStationControl").append( 
        "<option>ALL</option>"
    );
    //2.任务号
    jQuery("#MIDControl").append( 
        "<option>HXC</option>\
         <option>CLOSE</option>"
    );
    //3.协议进程名称
    jQuery("#ProcessNameControl").append( 
        "<option>ALL</option>\
        <option>LINK_CTCC-TL1A1_POAC</option>"
    );
    //4.消息类型
    jQuery("#msgTypeControl_Protocal").append( 
        "<option>ProtocalReport</option>"
    );
    //5.软件标识
    jQuery("#IDControl").append( 
        "<option>1</option>\
         <option>2</option>"
    );
    //6.命令名称
    jQuery("#OrderNameControl").append( 
        "<option>START</option>\
        <option>STOP</option>\
        <option>MODE</option>\
        <option>OPEN</option>\
        <option>CLOSE</option>\
        <option>SEND</option>\
        <option>RESET</option>\
        <option>REPORT</option>\
        <option>ARCHIVE</option>"
    );
    //7.协议名称
    jQuery("#ProtocalControl").append( 
        "<option>LINK</option>"
    );
    //8.报告类型
    jQuery("#Report_typeControl").append( 
        "<option>ALL</option>\
        <option>CP_REPORT_INIT</option>\
        <option>CP_REPORT_CLOSE</option>\
        <option>CP_REPORT_ON_TIMER</option>\
        <option>CP_REPORT_ON_CMD</option>\
        <option>CP_REPORT_ON_STATUS_CHANGE</option>"
    );

    //非实时
    //1.任务号
    jQuery("#missionIDControl").append( 
        "<option>eerr</option>\
         <option>ABAb</option>"
    );
    //2.消息类型
    jQuery("#msgTypeControl_NonReal").append( 
        "<option>SJTZ</option>"
    );
    //3.消息标识
    jQuery("#msgTagControl").append( 
        "<option>MCSMES</option>"
    );
    //4.子消息类型
    jQuery("#subtypeControl").append( 
        "<option>WJCSZT</option>"
    );
    //5.消息发送者
    jQuery("#senderControl").append( 
        "<option>OIM</option>\
        <option>FEPRECP</option>"
    );

});