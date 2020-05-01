jQuery('#datetimepicker1').datetimepicker({
    format: 'yyyy-mm-dd hh:ii:ss',
    minuteStep: 1 ,
    autoclose: true,
    language: 'zh-CN'
    }).on('changeDate',function(e) { 
        jQuery('#non_realForm').data('bootstrapValidator') 
        .updateStatus('datetimepicker1', 'NOT_VALIDATED',null) 
        .validateField('datetimepicker1'); 
    });
    jQuery(document).on('changeDate', '#datetimepicker1', function () {
        jQuery('#non_realForm').data('bootstrapValidator') 
        .updateStatus('datetimepicker1', 'NOT_VALIDATED',null) 
        .validateField('datetimepicker1'); 
    });
jQuery(document).ready(function(){
    jQuery('#non_realForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {               
        MSGID: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '数据类型不能为空'
                }
            },

        },
        sendSessionID: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '发送会话标识不能为空'
                }
            }
        },
        filename: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '文件名不能为空'
                }
            }
        },
        filePath: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '文件路径不能为空'
                }
            }
        },
        destination: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '目的地不能为空'
                }
            }
        },
        datetimepicker1: {
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
    jQuery("#sendNonRealBtn").click(function(){
        var bv =jQuery('#non_realForm').data('bootstrapValidator');
        bv.validate();
        if (bv.isValid()) {
        let param={'msgTag':jQuery("#msgTagControl").val(), 'missionID': jQuery("#missionIDControl").val(),
                "msgType": jQuery("#msgTypeControl_NonReal").val(), "subtype": jQuery("#subtypeControl").val(), 
                "MSGID": jQuery("#MSGIDControl").val(),"sender":jQuery("#senderControl").val(),
                "timestamp":jQuery("#datetimepicker1").val(),"content":{"sendSessionID":jQuery("#sendSessionIDControl").val(),
                "filename":jQuery("#filenameControl").val(),"filePath":jQuery("#filePathControl").val(),
                    "destination":jQuery("#destinationControl").val()}};    
        jQuery.ajax({
                type: 'POST',  
                data: JSON.stringify(param),
                dataType:"text",
                contentType:"application/json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url : "/non_real/send_command",
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
    if(getQueryVariable("MsgTag")!=null){
        jQuery("#msgTagControl").val(getQueryVariable("MsgTag"));
        jQuery("#msgTagControl").attr("disabled",true);
    }
    if(getQueryVariable("MsgType")!=null){
        jQuery("#msgTypeControl_NonReal").val(getQueryVariable("MsgType"));
        jQuery("#msgTypeControl_NonReal").attr("disabled",true);
    }
    if(getQueryVariable("MissionID")!=null){
        jQuery("#missionIDControl").val(getQueryVariable("MissionID"));
        jQuery("#missionIDControl").attr("disabled",true);
    }
    if(getQueryVariable("Subtype")!=null){
        jQuery("#subtypeControl").val(getQueryVariable("Subtype"));
        jQuery("#subtypeControl").attr("disabled",true);
    }
    if(getQueryVariable("MSGID")!=null){
        jQuery("#MSGIDControl").val(getQueryVariable("MSGID"));
        jQuery("#MSGIDControl").attr("disabled",true);
    }
    if(getQueryVariable("Sender")!=null){
        jQuery("#senderControl").val(getQueryVariable("Sender"));
        jQuery("#senderControl").attr("disabled",true);
    }
    if(getQueryVariable("SendSessionID")!=null){
        jQuery("#sendSessionIDControl").val(getQueryVariable("SendSessionID"));
        jQuery("#sendSessionIDControl").attr("disabled",true);
    }
    });			

    function getQueryVariable(variable)
    {
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == variable){return pair[1];}
           }
           return(null);
    }