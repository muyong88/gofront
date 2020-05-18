  


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
        let param={"channel": Number(jQuery("#channelControl").val()),"sysId": Number(jQuery("#sysIdControl").val()),"startTime":startTime,"endTime":endTime};    
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
    var table = jQuery('#ctcc_tb').DataTable();
    table.clear();
    // var curtime= new Date();
    jQuery.each(objs, function (index, obj) {
             table.row.add([
                obj.UpDateTime,
                obj.MsgType,
                obj.ProcessID,
                obj.SysID,
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
        // var updatetime=new Date(obj.UpDateTime);
        // var datediffSecond=Math.round((curtime.getTime()-updatetime.getTime())/1000);
        // if(datediffSecond>300){
        //     table.row.add([
        //         '<font color="grey">'+obj.UpDateTime+'</font>',
        //         '<font color="grey">'+obj.MsgType+'</font>',
        //         '<font color="grey">'+obj.ProcessID+'</font>',
        //         '<font color="grey">'+obj.SysID+'</font>',
        //         '<font color="grey">'+obj.Pattern+'</font>',
        //         '<font color="grey">'+obj.Channel+'</font>',
        //         '<font color="grey">'+obj.IsSend32KB+'</font>',
        //         '<font color="grey">'+obj.IsSendIPinIP+'</font>',
        //         '<font color="grey">'+obj.IsSaveFile+'</font>',
        //         '<font color="grey">'+obj.IsArchive+'</font>',
        //         '<font color="grey">'+obj.ResendShmHead+'</font>',
        //         '<font color="grey">'+obj.ResendShmTear+'</font>',
        //         '<font color="grey">'+obj.ResendWriteShmLoop+'</font>',
        //         '<font color="grey">'+obj.ResendReadShmLoop+'</font>',
        //         '<font color="grey">'+obj.ResendWriteShmSpeed+'</font>',
        //         '<font color="grey">'+obj.ResendReadShmSpeed+'</font>',
        //         '<font color="grey">'+obj.SaveShmHead+'</font>',
        //         '<font color="grey">'+obj.SaveShmTear+'</font>',
        //         '<font color="grey">'+obj.SaveWriteShmLoop+'</font>',
        //         '<font color="grey">'+obj.SaveReadShmLoop+'</font>',
        //         '<font color="grey">'+obj.SaveWriteShmSpeed+'</font>',
        //         '<font color="grey">'+obj.SaveReadShmSpeed+'</font>',
        //         '<font color="grey">'+obj.RecvBeats+'</font>',
        //         '<font color="grey">'+obj.ResendBeats+'</font>',
        //         '<font color="grey">'+obj.SaveBeats+'</font>',
        //         '<font color="grey">'+obj.RecvBytes+'</font>',
        //         '<font color="grey">'+obj.Send32KFrames+'</font>',
        //         '<font color="grey">'+obj.SendIPinIPFrames+'</font>',
        //         '<font color="grey">'+obj.SendSmallCraftFrames+'</font>',
        //         '<font color="grey">'+obj.TimeStamp+'</font>',
        //         '<a href="/ctcc/commandpage?MsgType='+obj.MsgType+'&SysId='+obj.SysId+'&Pattern='+obj.Pattern+'&Channel='+obj.Channel+'" target="_blank" style="color:red;">发送命令</a> '
        //       ]);
        // }else{
        //     table.row.add([
        //         '<font color="black">'+obj.UpDateTime+'</font>',
        //         '<font color="black">'+obj.MsgType+'</font>',
        //         '<font color="black">'+obj.ProcessID+'</font>',
        //         '<font color="black">'+obj.SysID+'</font>',
        //         '<font color="black">'+obj.Pattern+'</font>',
        //         '<font color="black">'+obj.Channel+'</font>',
        //         '<font color="black">'+obj.IsSend32KB+'</font>',
        //         '<font color="black">'+obj.IsSendIPinIP+'</font>',
        //         '<font color="black">'+obj.IsSaveFile+'</font>',
        //         '<font color="black">'+obj.IsArchive+'</font>',
        //         '<font color="black">'+obj.ResendShmHead+'</font>',
        //         '<font color="black">'+obj.ResendShmTear+'</font>',
        //         '<font color="black">'+obj.ResendWriteShmLoop+'</font>',
        //         '<font color="black">'+obj.ResendReadShmLoop+'</font>',
        //         '<font color="black">'+obj.ResendWriteShmSpeed+'</font>',
        //         '<font color="black">'+obj.ResendReadShmSpeed+'</font>',
        //         '<font color="black">'+obj.SaveShmHead+'</font>',
        //         '<font color="black">'+obj.SaveShmTear+'</font>',
        //         '<font color="black">'+obj.SaveWriteShmLoop+'</font>',
        //         '<font color="black">'+obj.SaveReadShmLoop+'</font>',
        //         '<font color="black">'+obj.SaveWriteShmSpeed+'</font>',
        //         '<font color="black">'+obj.SaveReadShmSpeed+'</font>',
        //         '<font color="black">'+obj.RecvBeats+'</font>',
        //         '<font color="black">'+obj.ResendBeats+'</font>',
        //         '<font color="black">'+obj.SaveBeats+'</font>',
        //         '<font color="black">'+obj.RecvBytes+'</font>',
        //         '<font color="black">'+obj.Send32KFrames+'</font>',
        //         '<font color="black">'+obj.SendIPinIPFrames+'</font>',
        //         '<font color="black">'+obj.SendSmallCraftFrames+'</font>',
        //         '<font color="black">'+obj.TimeStamp+'</font>',
        //         '<a href="/ctcc/commandpage?MsgType='+obj.MsgType+'&SysId='+obj.SysId+'&Pattern='+obj.Pattern+'&Channel='+obj.Channel+'" target="_blank" style="color:red;">发送命令</a> '
        //       ]);
        // }

});
    var currentPage = table.page();
    table.page(currentPage).draw(false);
}