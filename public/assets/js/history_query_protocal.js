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
        jQuery('#protocal_tb').html("");
        let param={"MID": jQuery("#MIDControl").val(), "ProcessName": jQuery("#ProcessNameControl").val(),"Report":{"Report_type":jQuery("#Report_typeControl").val()},"startTime":startTime,"endTime":endTime};    
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
    var objs = eval("("+data+")"); 
    var trStr = '';//动态拼接table  
    jQuery.each(objs, function (index, obj) {
        trStr += '<tr>';//拼接处规范的表格形式
        trStr += '<td>'+ obj.MsgType+'</td>';
        trStr += '<td>'+ obj.ID+'</td>';
        trStr += '<td>'+ obj.MID+'</td>';
        trStr += '<td>'+ obj.BID+'</td>';
        trStr += '<td>'+ obj.PID+'</td>';
        trStr += '<td>'+ obj.MainOrBackup+'</td>';
        trStr += '<td>'+ obj.ProcessName+'</td>';
        trStr += '<td>'+ obj.ReportType+'</td>';
        trStr += '<td>'+ obj.CommandType+'</td>';
        trStr += '<td>'+ obj.CommandResult+'</td>';
        trStr += '<td>'+ obj.RecvStatusRevert+'</td>';
        trStr += '<td>'+ obj.RecvStatus+'</td>';
        trStr += '<td>'+ obj.First+'</td>';
        trStr += '<td>'+ obj.Last+'</td>';
        trStr += '<td>'+ obj.RecvCount+'</td>';
        trStr += '<td>'+ obj.SendNo+'</td>';
        if(jQuery("#protocal_head_op").css("display")=='none'){
            trStr += '<td style="display:none;"><a href="/protocal/commandpage?MsgType='+obj.MsgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a></td> ';
        }else{
            trStr += '<td><a href="/protocal/commandpage?MsgType='+obj.MsgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a></td> ';
        }
        trStr+='</tr>';
});
    jQuery('#protocal_tb').html(trStr);
}