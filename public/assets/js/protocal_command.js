jQuery(document).ready(function(){
    jQuery('#proctocalForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {               
        BID: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '数据类型不能为空'
                },
                regexp: {
                    regexp: /^[a-fA-F0-9]+$/,
                    message: '必须十六进制字符串组合'
                },
                stringLength: {
                    min: 8,
                    max: 8,
                    message: '必须8位'
                }
            },

        },
        OrderSeq: {
            group: '.col-sm-3',
            validators: {
                notEmpty: {
                    message: '命令序号不能为空'
                },
                regexp: {
                    regexp: /^[0-9]+$/,
                    message: '必须0开始递增整数'
                }
            }
        }
    }
});
jQuery("#sendProtocalBtn").click(function(){
    var bv =jQuery('#proctocalForm').data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
    let param={'msgType':jQuery("#msgTypeControl").val(), 'ID': Number(jQuery("#IDControl").val()),
                "MID": jQuery("#MIDControl").val(), "BID": jQuery("#BIDControl").val(), 
                "ProcessName": jQuery("#ProcessNameControl").val(),"OrderSeq":Number(jQuery("#OrderSeqControl").val()),
                "OrderName":jQuery("#OrderNameControl").val(),"ParaInfo":{"MODE":jQuery("#MODEControl").val()
                },"Protocal":jQuery("#ProtocalControl").val()};    
    jQuery.ajax({
                type: 'POST',  
                data: JSON.stringify(param),
                dataType:"text",
                contentType:"application/json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url : "/protocal/send_command",
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