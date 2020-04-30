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
            // alert(jQuery(".main-content").height());
        },
        complete: function( xhr,data ){
        }
    });
    });
});


function updateCTCCTable(data){
    var objs = eval("("+data+")"); 
    var table = jQuery('#ctcc_table').DataTable();
    jQuery.each(objs, function (index, obj) {
        table.row.add([
            obj.MsgType,
            obj.ProcessId,
            obj.SysId,
            obj.Pattern,
            obj.Channel,
            obj.IsSend32KB,
            obj.IsSendIPinIP,
            obj.IsSaveFile,
            obj.IsArchive,
            obj.ResendShmHead,
            obj.ResendShmTear,
            obj.ResendWriteShmLoop,
            obj.ResendReadShmLoop,
            obj.ResendWriteShmSpeed,
            obj.ResendReadShmSpeed,
            obj.SaveShmHead,
            obj.SaveShmTear,
            obj.SaveWriteShmLoop,
            obj.SaveReadShmLoop,
            obj.SaveWriteShmSpeed,
            obj.SaveReadShmSpeed,
            obj.RecvBeats,
            obj.ResendBeats,
            obj.SaveBeats,
            obj.RecvBytes,
            obj.Send32KFrames,
            obj.SendIPinIPFrames,
            obj.SendSmallCraftFrames,
            obj.TimeStamp,
            '<a href="/ctcc/commandpage?MsgType='+obj.MsgType+'&SysId='+obj.SysId+'&Pattern='+obj.Pattern+'&Channel='+obj.Channel+'" target="_blank" style="color:red;">发送命令</a> '
          ]);
          var currentPage = table.page();
          table.page(currentPage).draw(false);
});
     
}

