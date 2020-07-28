


	  function updateTable(msg){
    var obj = eval("("+msg+")");
		switch(obj.MsgSign) {
     		case "NonRealFileState":
			 updateNonRealTable(obj);
       		 	break;
			 case "CTCCProcessState":   
			 updateCTCCTable(obj);
       			 break;
      case "ProtocalProcessState":    
			 updateProtocalTable(obj);
              break;
      case "NewMessage":
        updateNewMessage(obj);
        break;
     		default:     
      } 
    }
    function updateNewMessage(obj){
      var trStr = '';
      trStr += '<td>'+ obj.TimeStamp+'</td>';
      trStr += '<td>'+ obj.MsgSummary+'</td>'; 
      if(obj.MsgFlag=="CTCCHB"){
        if(obj.SuccessFlag=="warning"){
          jQuery('#ctccRow').addClass("warning");
          jQuery('#ctccRow').removeClass("success");
        }else{
          jQuery('#ctccRow').addClass("success");
          jQuery('#ctccRow').removeClass("warning");
        }        
        jQuery('#ctccRow').html(trStr);
      }else if(obj.MsgFlag=="ProctocalHB"){
        if(obj.SuccessFlag=="warning"){
          jQuery('#protocalRow').addClass("warning");
          jQuery('#protocalRow').removeClass("success");
        }else{
          jQuery('#protocalRow').addClass("success");
          jQuery('#protocalRow').removeClass("warning");
        }    
        jQuery('#protocalRow').html(trStr);
      }else if(obj.MsgFlag=="NonRealHB"){
        if(obj.SuccessFlag=="warning"){
          jQuery('#NonRealRow').addClass("warning");
          jQuery('#NonRealRow').removeClass("success");
        }else{
          jQuery('#NonRealRow').addClass("success");
          jQuery('#NonRealRow').removeClass("warning");
        }    
        jQuery('#NonRealRow').html(trStr);
      }else if(obj.MsgFlag=="ProctocalRevStart"){
        var tmpStr ='<tr class="success">'+'<td>'+ obj.TimeStamp+'</td>'+'<td>'+ obj.MsgSummary+'</td>'+'</tr>';
        jQuery('#newMSg_tbody').append(tmpStr);
      }else if(obj.MsgFlag=="ProctocalRevEnd"){
        jQuery('#newMSg_tbody td').filter(function() {
          return jQuery(this).text() === obj.MsgSummary;
        }).closest("tr").remove();
      }
    }
	  function updateProtocalTable(obj){
      var table = jQuery('#protocal_tb').DataTable();
      table.draw()
	  };
	  function updateCTCCTable(obj){
      var table = jQuery('#ctcc_tb').DataTable();
      table.draw();
      
	  }
	  function updateNonRealTable(obj){
      var table = jQuery('#nonreal_tb').DataTable();
      table.draw();
    }

    jQuery('#newMSg_tbody').bind('DOMNodeInserted', function () {
      var count = jQuery("#newMSg_tbody").find("tr").length;
      jQuery('#newMsgNum').text(count.toString());
      
  });

  jQuery('#ctcc_tbody').bind('DOMNodeInserted  DOMNodeRemoved', function () {
    var count = jQuery("#ctcc_tb").DataTable().data().length;
    jQuery('#ctccNum').text(count.toString());
    
});

  jQuery('#protocal_tbody').bind('DOMNodeInserted  DOMNodeRemoved', function () {
    var count = jQuery("#protocal_tb").DataTable().data().length;
    jQuery('#protocalNum').text(count.toString());
    
});
    
    jQuery('#nonreal_tbody').bind('DOMNodeInserted  DOMNodeRemoved', function () {
      var count = jQuery("#nonreal_tb").DataTable().data().length;
      jQuery('#nonRealNum').text(count.toString());
      
  });


