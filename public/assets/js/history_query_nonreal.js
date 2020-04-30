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
        jQuery('#nonreal_tb').html("");
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
    var table = jQuery('#nonreal_table').DataTable();
    jQuery.each(objs, function (index, obj) {
        table.row.add([
            obj.MsgTag,
            obj.MsgType,
            obj.MissionID,
            obj.Subtype,
            obj.MSGID,
            obj.Sender,
            obj.Timestamp,
            obj.Type,
            obj.SendSessionID,
            obj.FileName,
            obj.FilePath,
            obj.Status,
            obj.Station,
            '<a href="/non_real/commandpage?MsgTag='+obj.MsgTag+'&MsgType='+obj.MsgType+'&MissionID='+obj.MissionID+'&Subtype='+obj.Subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.Sender+'&SendSessionID='+obj.SendSessionID+'" target="_blank" style="color:red;">发送命令</a>'
        ]);    
});
     
var currentPage = table.page();
    rowCount = table.data().length-1;
    insertedRow = table.row(rowCount).data();
    var tempRow;    
    for (var i=rowCount;i>0;i--) {
    tempRow = table.row(i-1).data();
    table.row(i).data(tempRow);
    table.row(i-1).data(insertedRow);
   }     
   //refresh the current page
    table.page(currentPage).draw(false);
}