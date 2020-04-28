
	(function () {
		var events = {
		  default: {
			_OnNamespaceConnected: function (ns, msg) {                 
			  //stub:
			 // alert("connected")
			},
			_OnNamespaceDisconnect: function (ns, msg) {
			  //stub:
			  
			},
			communicate: function (ns, msg) {
				updateTable(msg.Body);
			}
		  }
		};
	  
		neffos.dial("ws://localhost:8080/echo", events).then(function (client) {
		  client.connect("default");
		});
	  })();
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
            var trStr = '';//动态拼接tablem
            trStr += '<tr>';//拼接处规范的表格形式
            trStr += '<td>'+ obj.msgType+'</td>';
            trStr += '<td>'+ obj.ID+'</td>';
            trStr += '<td>'+ obj.MID+'</td>';
            trStr += '<td>'+ obj.BID+'</td>';
		      	trStr += '<td>'+ obj.PID+'</td>';
			      trStr += '<td>'+ obj.MainOrBackup+'</td>';
            trStr += '<td>'+ obj.ProcessName+'</td>';
            trStr += '<td>'+ obj.Report.Report_type+'</td>';
            trStr += '<td>'+ obj.Report.Command_type+'</td>';
            trStr += '<td>'+ obj.Report.Command_result+'</td>';
            trStr += '<td>'+ obj.Report.Recv_status_revert+'</td>';
            trStr += '<td>'+ obj.Report.Recv_status+'</td>';
            trStr += '<td>'+ obj.Report.First+'</td>';
			      trStr += '<td>'+ obj.Report.Last+'</td>';
            trStr += '<td>'+ obj.Report.Recv_count+'</td>';
            trStr += '<td>'+ obj.Report.Send_no+'</td>';
            if(jQuery("#protocal_head_op").css("display")=='none'){
              trStr += '<td  style="display:none;"><a href="/protocal/commandpage?MsgType='+obj.msgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }else{
              trStr += '<td><a href="/protocal/commandpage?MsgType='+obj.msgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }
            trStr+='</tr>';
            jQuery('#protocal_tb').prepend(trStr);
	  }
	  function updateCTCCTable(obj){
            var trStr = '';//动态拼接table
            trStr += '<tr>';//拼接处规范的表格形式
            trStr += '<td>'+ obj.msgType+'</td>';
            trStr += '<td>'+ obj.processId+'</td>';
            trStr += '<td>'+ obj.sysId+'</td>';
            trStr += '<td>'+ obj.pattern+'</td>';
            trStr += '<td>'+ obj.channel+'</td>';
            trStr += '<td>'+ obj.isSend32KB+'</td>';
            trStr += '<td>'+ obj.isSendIPinIP+'</td>';
            trStr += '<td>'+ obj.isSaveFile+'</td>';
            trStr += '<td>'+ obj.isArchive+'</td>';
            trStr += '<td>'+ obj.resendShmHead+'</td>';
            trStr += '<td>'+ obj.resendShmTear+'</td>';
            trStr += '<td>'+ obj.resendWriteShmLoop+'</td>';
            trStr += '<td>'+ obj.resendReadShmLoop+'</td>';
			      trStr += '<td>'+ obj.resendWriteShmSpeed+'</td>';
            trStr += '<td>'+ obj.resendReadShmSpeed+'</td>';
            trStr += '<td>'+ obj.saveShmHead+'</td>';
            trStr += '<td>'+ obj.saveShmTear+'</td>';
            trStr += '<td>'+ obj.saveWriteShmLoop+'</td>';
            trStr += '<td>'+ obj.saveReadShmLoop+'</td>';
			      trStr += '<td>'+ obj.saveWriteShmSpeed+'</td>';
            trStr += '<td>'+ obj.saveReadShmSpeed+'</td>';
            trStr += '<td>'+ obj.recvBeats+'</td>';
            trStr += '<td>'+ obj.resendBeats+'</td>';
			      trStr += '<td>'+ obj.saveBeats+'</td>';
            trStr += '<td>'+ obj.recvBytes+'</td>';
            trStr += '<td>'+ obj.send32KFrames+'</td>';
            trStr += '<td>'+ obj.sendIPinIPFrames+'</td>';
            trStr += '<td>'+ obj.sendSmallCraftFrames+'</td>';
            trStr += '<td>'+ obj.timeStamp+'</td> ';
            if(jQuery("#cctc_head_op").css("display")=='none'){
              trStr += '<td style="display:none;"><a href="/ctcc/commandpage?MsgType='+obj.msgType+'&SysId='+obj.sysId+'&Pattern='+obj.pattern+'&Channel='+obj.channel+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }else{
              trStr += '<td><a href="/ctcc/commandpage?MsgType='+obj.msgType+'&SysId='+obj.sysId+'&Pattern='+obj.pattern+'&Channel='+obj.channel+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }
            trStr+='</tr>';
			jQuery('#ctcc_tb').prepend(trStr);
	  }
	  function updateNonRealTable(obj){
            var trStr = '';//动态拼接table
            trStr += '<tr>';//拼接处规范的表格形式
            trStr += '<td>'+ obj.msgTag+'</td>';
            trStr += '<td>'+ obj.msgType+'</td>';
            trStr += '<td>'+ obj.missionID+'</td>';
            trStr += '<td>'+ obj.subtype+'</td>';
            trStr += '<td>'+ obj.MSGID+'</td>';
            trStr += '<td>'+ obj.sender+'</td>';
            trStr += '<td>'+ obj.timestamp+'</td>';
            trStr += '<td>'+ obj.type+'</td>';
            trStr += '<td>'+ obj.sendSessionID+'</td>';
            trStr += '<td>'+ obj.fileName+'</td>';
            trStr += '<td>'+ obj.filePath+'</td>';
            trStr += '<td>'+ obj.status+'</td>';
            trStr += '<td>'+ obj.station+'</td>';
            if(jQuery("#nonreal_head_op").css("display")=='none'){
              trStr += '<td style="display:none;"><a href="/non_real/commandpage?MsgTag='+obj.msgTag+'&MsgType='+obj.msgType+'&MissionID='+obj.missionID+'&Subtype='+obj.subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.sender+'&SendSessionID='+obj.sendSessionID+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }else{
              trStr += '<td><a href="/non_real/commandpage?MsgTag='+obj.msgTag+'&MsgType='+obj.msgType+'&MissionID='+obj.missionID+'&Subtype='+obj.subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.sender+'&SendSessionID='+obj.sendSessionID+'" target="_blank" style="color:red;">发送命令</a></td> ';
            }            
            trStr+='</tr>';
			      jQuery('#nonreal_tb').prepend(trStr);
    }

    jQuery('#newMSg_tbody').bind('DOMNodeInserted', function () {
      var count = jQuery("#newMSg_tbody").find("tr").length;
      jQuery('#newMsgNum').text(count.toString());
      
  });

  jQuery('#ctcc_tbody').bind('DOMNodeInserted', function () {
    var count = jQuery("#ctcc_tbody").find("tr").length;
    jQuery('#ctccNum').text(count.toString());
    
});

  jQuery('#protocal_tbody').bind('DOMNodeInserted', function () {
    var count = jQuery("#protocal_tbody").find("tr").length;
    jQuery('#protocalNum').text(count.toString());
    
});
    
    jQuery('#nonreal_tbody').bind('DOMNodeInserted', function () {
      var count = jQuery("#nonreal_tbody").find("tr").length;
      jQuery('#nonRealNum').text(count.toString());
      
  });

