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
    jQuery(document).on('changeDate', '#datetimepicker1', function () {
    jQuery('#ctccForm').data('bootstrapValidator') 
    .updateStatus('datetimepicker1', 'NOT_VALIDATED',null) 
    .validateField('datetimepicker1'); 
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
        jQuery('#ctcc_tb').html("");
        let param={"msgType": jQuery("#msgTypeControl_CTCC").val(),"sysId": Number(jQuery("#sysIdControl").val()),"startTime":startTime,"endTime":endTime};    
        jQuery.ajax({
        type: 'POST',  
        data: JSON.stringify(param),
        dataType:"JSON",
        contentType:"application/json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        url : "/ctcc/query_db",
        success: function(data) {
            updateCTCCTable(data);
        },
        complete: function( xhr,data ){
        }
    });
    });
});
function updateCTCCTable(data){
    var objs = eval("("+data+")"); 
    var trStr = '';//动态拼接table  
    jQuery.each(objs, function (index, obj) {
    trStr += '<tr>';//拼接处规范的表格形式
    trStr += '<td>'+ obj.MsgType+'</td>';
    trStr += '<td>'+ obj.ProcessId+'</td>';
    trStr += '<td>'+ obj.SysId+'</td>';
    trStr += '<td>'+ obj.Pattern+'</td>';
    trStr += '<td>'+ obj.Channel+'</td>';
    trStr += '<td>'+ obj.IsSend32KB+'</td>';
    trStr += '<td>'+ obj.IsSendIPinIP+'</td>';
    trStr += '<td>'+ obj.IsSaveFile+'</td>';
    trStr += '<td>'+ obj.IsArchive+'</td>';
    trStr += '<td>'+ obj.ResendShmHead+'</td>';
    trStr += '<td>'+ obj.ResendShmTear+'</td>';
    trStr += '<td>'+ obj.ResendWriteShmLoop+'</td>';
    trStr += '<td>'+ obj.ResendReadShmLoop+'</td>';
    trStr += '<td>'+ obj.ResendWriteShmSpeed+'</td>';
    trStr += '<td>'+ obj.ResendReadShmSpeed+'</td>';
    trStr += '<td>'+ obj.SaveShmHead+'</td>';
    trStr += '<td>'+ obj.SaveShmTear+'</td>';
    trStr += '<td>'+ obj.SaveWriteShmLoop+'</td>';
    trStr += '<td>'+ obj.SaveReadShmLoop+'</td>';
    trStr += '<td>'+ obj.SaveWriteShmSpeed+'</td>';
    trStr += '<td>'+ obj.SaveReadShmSpeed+'</td>';
    trStr += '<td>'+ obj.RecvBeats+'</td>';
    trStr += '<td>'+ obj.ResendBeats+'</td>';
    trStr += '<td>'+ obj.SaveBeats+'</td>';
    trStr += '<td>'+ obj.RecvBytes+'</td>';
    trStr += '<td>'+ obj.Send32KFrames+'</td>';
    trStr += '<td>'+ obj.SendIPinIPFrames+'</td>';
    trStr += '<td>'+ obj.SendSmallCraftFrames+'</td>';
    trStr += '<td>'+ obj.TimeStamp+'</td> ';
    trStr+='</tr>';
});
    jQuery('#ctcc_tb').html(trStr);
}