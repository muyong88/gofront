jQuery(document).ready(function(){
    
    // jQuery("#batch_selector").dblclick(function(){
    //     jQuery("#batch_selector option").each(function(){
    //         if(this.selected==true){
    //             this.remove();
    //         }
    //     });
    // });

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
        param[i].msgType=jQuery("#msgTypeControl_Protocal").val();
        param[i].OrderName=jQuery("#OrderNameControl").val();
        param[i].ParaInfo={"MODE":jQuery("#MODEControl").val()};
        param[i].Protocal=param[i].ProcessName.split("_")[0];
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
        });
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