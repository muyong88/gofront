jQuery(document).ready(function(){               
    jQuery("#queryBtn").click(function(){
        let param={"msgType": "CTCCFRONTEND_CONTROL", "Operation": "Open",
        "SysId": 1, "Pattern": 1, 
        "Channel": 1,"BeginTime":"202002291020","EndTime":"202002291020","MainHostName":"","BackupHostName":""};    
        jQuery.ajax({
        type: 'POST',  
        data: JSON.stringify(param),
        dataType:"JSON",
        contentType:"application/json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        url : "/cctc/query_db",
        success: function(data) {
            updateCCTCTable(data);
        },
        complete: function( xhr,data ){
        }
    });
    });
});
function updateCCTCTable(data){
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
    jQuery('#cctc_tb').html(trStr);
}