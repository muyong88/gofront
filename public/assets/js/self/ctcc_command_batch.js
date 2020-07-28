jQuery(document).ready(function(){
    // jQuery("#batch_selector").dblclick(function(){
    //     jQuery("#batch_selector option").each(function(){
    //         if(this.selected==true){
    //             this.remove();
    //         }
    //     });
    // });
    jQuery('#datetimepicker1').datetimepicker({
        format: 'yyyymmddhhiiss',
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
        format: 'yyyymmddhhiiss',
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
            param[i].msgType=jQuery("#msgTypeControl_CTCC").val();
            param[i].Operation=jQuery("#operationControl").val();
            param[i].BeginTime=jQuery("#datetimepicker1").val();
            param[i].EndTime=jQuery("#datetimepicker2").val();
            param[i].MainHostName=jQuery("#mainHostNameControl").val();
            param[i].BackupHostName=jQuery("#backupHostNameControl").val();
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
    var strParms=getQueryVariable("value");
    if(strParms!=null){     
        var packJson= jQuery.parseJSON(unescape(strParms));
        for(var i in packJson){//遍历packJson 数组时，i为索引
            jQuery("#batch_selector").append( "<option selected>"+JSON.stringify(packJson[i])+"</option>");
        }
    }

});
jQuery('#ctccForm').bootstrapValidator({
message: 'This value is not valid',
feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
},
fields: {            
    // datetimepicker1: {
    //     group: '.col-sm-3',
    //     trigger: 'changeDate',
    //     validators: {
    //         notEmpty: {
    //             message: '日期不能为空'
    //         }
    //     }
    // },
    // datetimepicker2: {
    //     group: '.col-sm-3',
    //     trigger: 'changeDate',
    //     validators: {
    //         notEmpty: {
    //             message: '日期不能为空'
    //         }
    //     }
    // }
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