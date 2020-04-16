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
    var trStr = '';//动态拼接table  
    jQuery.each(objs, function (index, obj) {
        trStr += '<tr>';//拼接处规范的表格形式
        trStr += '<td>'+ obj.MsgTag+'</td>';
        trStr += '<td>'+ obj.MsgType+'</td>';
        trStr += '<td>'+ obj.MissionID+'</td>';
        trStr += '<td>'+ obj.Subtype+'</td>';
        trStr += '<td>'+ obj.MSGID+'</td>';
        trStr += '<td>'+ obj.Sender+'</td>';
        trStr += '<td>'+ obj.Timestamp+'</td>';
        trStr += '<td>'+ obj.Type+'</td>';
        trStr += '<td>'+ obj.SendSessionID+'</td>';
        trStr += '<td>'+ obj.FileName+'</td>';
        trStr += '<td>'+ obj.FilePath+'</td>';
        trStr += '<td>'+ obj.Status+'</td>';
        trStr += '<td>'+ obj.Station+'</td>';
        trStr+='</tr>';
});
    jQuery('#nonreal_tb').html(trStr);
}