
jQuery(document).ready(function(){ 

    jQuery('#datetimepicker1').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        minuteStep: 1 ,
        autoclose: true,
        language: 'zh-CN'
    }).on('changeDate',function(e) { 
        var starttime=jQuery("#datetimepicker1").val();
        jQuery("#datetimepicker2").datetimepicker('setStartDate',starttime);
        jQuery("#datetimepicker1").datetimepicker('hide');
        }); 
        jQuery('#datetimepicker2').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            minuteStep: 1 ,
            autoclose: true,
            language: 'zh-CN'
        }).on('changeDate',function(e) { 
        var endtime=jQuery("#datetimepicker2").val();
        jQuery("#datetimepicker1").datetimepicker('setEndDate',endtime);
        jQuery("#datetimepicker2").datetimepicker('hide'); 
        });                
    jQuery("#queryBtn").click(function(){
        var startTime="";
        if(jQuery("#datetimepicker1").val()!=""){
            let date = jQuery("#datetimepicker1").data("datetimepicker").getDate();
            let mon=(date.getMonth() + 1);
            let day=date.getDate();
            let hour=date.getHours();
            let minute=date.getMinutes();
            let second=date.getSeconds();
            startTime=date.getFullYear()  + (mon < 10 ? "0" + mon : mon) + (day < 10 ? "0" + day : day)  + (hour < 10 ? "0" + hour : hour)  + (minute < 10 ? "0" + minute : minute)  + (second < 10 ? "0" + second : second) ;
        }
        var endTime="";
        if(jQuery("#datetimepicker2").val()!=""){
            let date = jQuery("#datetimepicker2").data("datetimepicker").getDate();
            let mon=(date.getMonth() + 1);
            let day=date.getDate();
            let hour=date.getHours();
            let minute=date.getMinutes();
            let second=date.getSeconds();
            endTime=date.getFullYear()  + (mon < 10 ? "0" + mon : mon)  + (day < 10 ? "0" + day : day)  + (hour < 10 ? "0" + hour : hour)  + (minute < 10 ? "0" + minute : minute)  + (second < 10 ? "0" + second : second) ;
        }
        let param={"MainOrBackup": Number(jQuery("#MainOrBackupControl").val()),"MID": jQuery("#MIDControl").val(), "ProcessName": jQuery("#ProcessNameControl").val(),"Report":{"Report_type":jQuery("#Report_typeControl").val()},"startTime":startTime,"endTime":endTime};    
        jQuery.ajax({
        type: 'POST',  
        data: JSON.stringify(param),
        dataType:"JSON",
        contentType:"application/json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        url : "/protocal/query_db",
        success: function(data) {
            updateProtocalTable(data);
        },
        complete: function( xhr,data ){
        }
    });
    });
});
function updateProtocalTable(data){
    var table = jQuery('#protocal_tb').DataTable();
    table.clear();
    var objs = eval("("+data+")"); 
    // var curtime= new Date();
    jQuery.each(objs, function (index, obj) {
            table.row.add([
                obj.UpDateTime,
                obj.MsgType,
                obj.ID,
                obj.MID,
                obj.BID,
                obj.PID,
                obj.MainOrBackup,
                obj.ProcessName,
                obj.ReportType,
                obj.CommandType,
                obj.CommandResult,
                obj.RecvStatusRevert,
                obj.RecvStatus,
                obj.First,
                obj.Last,
                obj.RecvCount,
                obj.SendNo,
                '<a href="/protocal/commandpage?PID='+obj.PID+'&MainOrBackup='+obj.MainOrBackup+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' 
              ]);
        // var updatetime=new Date(obj.UpDateTime);
        // var datediffSecond=Math.round((curtime.getTime()-updatetime.getTime())/1000);
        // if(datediffSecond>300){
        //     table.row.add([
        //         '<font color="grey">'+obj.UpDateTime+'</font>',
        //         '<font color="grey">'+obj.MsgType+'</font>',
        //         '<font color="grey">'+obj.ID+'</font>',
        //         '<font color="grey">'+obj.MID+'</font>',
        //         '<font color="grey">'+obj.BID+'</font>',
        //         '<font color="grey">'+obj.PID+'</font>',
        //         '<font color="grey">'+obj.MainOrBackup+'</font>',
        //         '<font color="grey">'+obj.ProcessName+'</font>',
        //         '<font color="grey">'+obj.ReportType+'</font>',
        //         '<font color="grey">'+obj.CommandType+'</font>',
        //         '<font color="grey">'+obj.CommandResult+'</font>',
        //         '<font color="grey">'+obj.RecvStatusRevert+'</font>',
        //         '<font color="grey">'+obj.RecvStatus+'</font>',
        //         '<font color="grey">'+obj.First+'</font>',
        //         '<font color="grey">'+obj.Last+'</font>',
        //         '<font color="grey">'+obj.RecvCount+'</font>',
        //         '<font color="grey">'+obj.SendNo+'</font>',
        //         '<a href="/protocal/commandpage?MsgType='+obj.MsgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' 
        //       ]);
        // }else{
        //     table.row.add([
        //         '<font color="black">'+obj.UpDateTime+'</font>',
        //         '<font color="black">'+obj.MsgType+'</font>',
        //         '<font color="black">'+obj.ID+'</font>',
        //         '<font color="black">'+obj.MID+'</font>',
        //         '<font color="black">'+obj.BID+'</font>',
        //         '<font color="black">'+obj.PID+'</font>',
        //         '<font color="black">'+obj.MainOrBackup+'</font>',
        //         '<font color="black">'+obj.ProcessName+'</font>',
        //         '<font color="black">'+obj.ReportType+'</font>',
        //         '<font color="black">'+obj.CommandType+'</font>',
        //         '<font color="black">'+obj.CommandResult+'</font>',
        //         '<font color="black">'+obj.RecvStatusRevert+'</font>',
        //         '<font color="black">'+obj.RecvStatus+'</font>',
        //         '<font color="black">'+obj.First+'</font>',
        //         '<font color="black">'+obj.Last+'</font>',
        //         '<font color="black">'+obj.RecvCount+'</font>',
        //         '<font color="black">'+obj.SendNo+'</font>',
        //         '<a href="/protocal/commandpage?MsgType='+obj.MsgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' 
        //       ]);
        // }
    });
    var currentPage = table.page();
    table.page(currentPage).draw(false);
}