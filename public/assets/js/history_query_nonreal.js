jQuery(document).ready(function(){               
    jQuery("#queryBtn").click(function(){
        jQuery('#nonreal_tb').html("");
        let param={"msgType": jQuery("#msgTypeControl").val(), "missionID": jQuery("#missionIDControl").val()};    
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