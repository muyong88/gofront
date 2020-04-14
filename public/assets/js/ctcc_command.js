jQuery(document).ready(function(){
    jQuery('#datetimepicker1').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        minuteStep: 1 ,
        autoclose: true,
        language: 'zh-CN'
    }).on('changeDate',function(e) { 
    jQuery('#ctccForm').data('bootstrapValidator') 
    .updateStatus('datetimepicker1', 'NOT_VALIDATED',null) 
    .validateField('datetimepicker1'); 
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
    jQuery('#ctccForm').data('bootstrapValidator') 
    .updateStatus('datetimepicker2', 'NOT_VALIDATED',null) 
    .validateField('datetimepicker2'); 
    var endtime=jQuery("#datetimepicker2").val();
    jQuery("#datetimepicker1").datetimepicker('setEndDate',endtime);
    jQuery("#datetimepicker2").datetimepicker('hide'); 
    });
    jQuery(document).on('changeDate', '#datetimepicker2', function () {
    jQuery('#ctccForm').data('bootstrapValidator') 
    .updateStatus('datetimepicker2', 'NOT_VALIDATED',null) 
    .validateField('datetimepicker2'); 
    });
    jQuery("#sendCTCCBtn").click(function(){
    var bv =jQuery('#ctccForm').data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
        let param={'msgType':jQuery("#msgTypeControl_CTCC").val(), 'Operation': jQuery("#operationControl").val(),
            "SysId": Number(jQuery("#sysIdControl").val()), "Pattern": Number(jQuery("#patternControl").val()), 
            "Channel": Number(jQuery("#channelControl").val()),"BeginTime":jQuery("#datetimepicker1").val(),
            "EndTime":jQuery("#datetimepicker2").val(),"MainHostName":jQuery("#mainHostNameControl").val(),
            "BackupHostName":jQuery("#backupHostNameControl").val()};    
        jQuery.ajax({
            type: 'POST',  
            data: JSON.stringify(param),
            dataType:"text",
            contentType:"application/json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            url : "/ctcc/send_command",
            success: function(data) {
                alert("send success!");
            },
            complete: function( xhr,data ){
                
            },
            error:function(XMLHttpRequest, textStatus){  
                alert(textStatus);
            }
        });
    }});
});
jQuery('#ctccForm').bootstrapValidator({
message: 'This value is not valid',
feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
},
fields: {            
    datetimepicker1: {
        group: '.col-sm-3',
        trigger: 'changeDate',
        validators: {
            notEmpty: {
                message: '日期不能为空'
            }
        }
    },
    datetimepicker2: {
        group: '.col-sm-3',
        trigger: 'changeDate',
        validators: {
            notEmpty: {
                message: '日期不能为空'
            }
        }
    }
}
});