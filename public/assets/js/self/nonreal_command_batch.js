
    // jQuery("#batch_selector").dblclick(function(){
    //     jQuery("#batch_selector option").each(function(){
    //         if(this.selected==true){
    //             this.remove();
    //         }
    //     });
    // });
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
            let str="[";
            jQuery("#batch_selector option:selected").each(function(){
                if(str=="["){
                    str = str + this.value;
                }else{
                    str = str +","+ this.value;
                }
            });
            str = str + "]";
            let param = jQuery.parseJSON(str); 
            // let param = jQuery.parseJSON( unescape(getQueryVariable("value")) ); 
            for(var i in param){
                param[i].msgTag=jQuery("#msgTagControl").val();
                param[i].missionID=jQuery("#missionIDControl").val();
                param[i].msgType=jQuery("#msgTypeControl_NonReal").val();
                param[i].subtype=jQuery("#subtypeControl").val();
                param[i].MSGID=jQuery("#MSGIDControl").val();
                param[i].sender=jQuery("#senderControl").val();
                param[i].timestamp=jQuery("#datetimepicker1").val();
                param[i].content={"sendSessionID":jQuery("#sendSessionIDControl").val(),
                "filename":jQuery("#filenameControl").val(),"filePath":jQuery("#filePathControl").val(),
                    "destination":param[i].station};
            }
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
    
    var strParms=getQueryVariable("value");
        if(strParms!=null){     
            var packJson= jQuery.parseJSON(unescape(strParms));
            for(var i in packJson){//遍历packJson 数组时，i为索引
                jQuery("#batch_selector").append( "<option selected>"+JSON.stringify(packJson[i])+"</option>");
            }
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