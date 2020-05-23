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

        }
    }
});
jQuery("#OrderNameControl").change(function(){
    var opt=jQuery("#OrderNameControl").val();
    if(opt=="MODE"){
        jQuery("#MODEControl").val("");
        jQuery("#MODEControl").attr("disabled",false);
    }else{
        jQuery("#MODEControl").val("");
        jQuery("#MODEControl").attr("disabled",true);
    }
});
jQuery("#sendProtocalBtn").click(function(){
    var bv =jQuery('#proctocalForm').data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
    let param=[{'msgType':jQuery("#msgTypeControl_Protocal").val(), 'ID': Number(jQuery("#IDControl").val()),
                "MID": jQuery("#MIDControl").val(), "BID": jQuery("#BIDControl").val(), 
                "ProcessName": jQuery("#ProcessNameControl").val(),"PID":jQuery("#PIDControl").val(),"MainOrBackup":jQuery("#MAINORBACKUPControl").val(),
                "OrderName":jQuery("#OrderNameControl").val(),"ParaInfo":{"MODE":jQuery("#MODEControl").val()
                },"Protocal":jQuery("#ProtocalControl").val()}];    
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
        if(getQueryVariable("ID")!=null){
            jQuery("#IDControl").val(getQueryVariable("ID"));
            jQuery("#IDControl").attr("disabled",true);
        }
        if(getQueryVariable("MID")!=null){
            jQuery("#MIDControl").val(getQueryVariable("MID"));
            jQuery("#MIDControl").attr("disabled",true);
        }
        if(getQueryVariable("BID")!=null){
            jQuery("#BIDControl").val(getQueryVariable("BID"));
            jQuery("#BIDControl").attr("disabled",true);
        }
        if(getQueryVariable("ProcessName")!=null){
            jQuery("#ProcessNameControl").val(getQueryVariable("ProcessName"));
            jQuery("#ProcessNameControl").attr("disabled",true);
            jQuery("#ProtocalControl").val(getQueryVariable("ProcessName").split("_")[0]);
            jQuery("#ProtocalControl").attr("disabled",true);
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