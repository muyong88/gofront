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
            startTime=date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + "_" + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) ;
        }
        var endTime="";
        if(jQuery("#datetimepicker2").val()!=""){
            let date = jQuery("#datetimepicker2").data("datetimepicker").getDate();
            let mon=(date.getMonth() + 1);
            let day=date.getDate();
            let hour=date.getHours();
            let minute=date.getMinutes();
            let second=date.getSeconds();
            endTime=date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + "_" + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) ;
        }
        let param={"msgType": jQuery("#msgTypeControl_NonReal").val(), "missionID": jQuery("#missionIDControl").val(),"startTime":startTime,"endTime":endTime};    
        jQuery.ajax({
        type: 'POST',  
        data: JSON.stringify(param),
        dataType:"JSON",
        contentType:"application/json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        url : "/non_real/query_db",
        success: function(data) {
            updateNonrealTable(data);
        },
        complete: function( xhr,data ){
        }
    });
    });
});
function updateNonrealTable(data){
    var objs = eval("("+data+")"); 
    var table = jQuery('#nonreal_tb').DataTable();
    table.clear();
    var curtime= new Date();
    jQuery.each(objs, function (index, obj) {
        var updatetime=new Date(obj.UpDateTime);
        var datediffSecond=Math.round((curtime.getTime()-updatetime.getTime())/1000);
        if(datediffSecond>300){
            table.row.add([
                '<font color="grey">'+obj.UpDateTime+'</font>',
                '<font color="grey">'+obj.MsgTag+'</font>',
                '<font color="grey">'+obj.MsgType+'</font>',
                '<font color="grey">'+obj.MissionID+'</font>',
                '<font color="grey">'+obj.Subtype+'</font>',
                '<font color="grey">'+obj.MSGID+'</font>',
                '<font color="grey">'+obj.Sender+'</font>',
                '<font color="grey">'+obj.Timestamp+'</font>',
                '<font color="grey">'+obj.Type+'</font>',
                '<font color="grey">'+obj.SendSessionID+'</font>',
                '<font color="grey">'+obj.FileName+'</font>',
                '<font color="grey">'+obj.FilePath+'</font>',
                '<font color="grey">'+obj.Status+'</font>',
                '<font color="grey">'+obj.Station+'</font>',
                '<a href="/non_real/commandpage?MsgTag='+obj.MsgTag+'&MsgType='+obj.MsgType+'&MissionID='+obj.MissionID+'&Subtype='+obj.Subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.Sender+'&SendSessionID='+obj.SendSessionID+'" target="_blank" style="color:red;">发送命令</a>'
            ]); 
        }else{
            table.row.add([
                '<font color="black">'+obj.UpDateTime+'</font>',
                '<font color="black">'+obj.MsgTag+'</font>',
                '<font color="black">'+obj.MsgType+'</font>',
                '<font color="black">'+obj.MissionID+'</font>',
                '<font color="black">'+obj.Subtype+'</font>',
                '<font color="black">'+obj.MSGID+'</font>',
                '<font color="black">'+obj.Sender+'</font>',
                '<font color="black">'+obj.Timestamp+'</font>',
                '<font color="black">'+obj.Type+'</font>',
                '<font color="black">'+obj.SendSessionID+'</font>',
                '<font color="black">'+obj.FileName+'</font>',
                '<font color="black">'+obj.FilePath+'</font>',
                '<font color="black">'+obj.Status+'</font>',
                '<font color="black">'+obj.Station+'</font>',
                '<a href="/non_real/commandpage?MsgTag='+obj.MsgTag+'&MsgType='+obj.MsgType+'&MissionID='+obj.MissionID+'&Subtype='+obj.Subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.Sender+'&SendSessionID='+obj.SendSessionID+'" target="_blank" style="color:red;">发送命令</a>'
            ]); 
        }
});
     
    var currentPage = table.page();
    table.page(currentPage).draw(false);
}