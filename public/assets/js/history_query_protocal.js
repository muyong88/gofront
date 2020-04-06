jQuery(document).ready(function(){               
    jQuery("#queryBtn").click(function(){
        jQuery('#protocal_tb').html("");
        let param={"MID": jQuery("#MIDControl").val(), "ProcessName": jQuery("#ProcessNameControl").val()};    
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
        trStr += '<td>'+ obj.Report_type+'</td>';
        trStr += '<td>'+ obj.Command_type+'</td>';
        trStr += '<td>'+ obj.Command_result+'</td>';
        trStr += '<td>'+ obj.Recv_status_revert+'</td>';
        trStr += '<td>'+ obj.Recv_status+'</td>';
        trStr += '<td>'+ obj.First+'</td>';
        trStr += '<td>'+ obj.Last+'</td>';
        trStr += '<td>'+ obj.Recv_count+'</td>';
        trStr += '<td>'+ obj.Send_no+'</td>';
        trStr+='</tr>';
});
    jQuery('#protocal_tb').html(trStr);
}