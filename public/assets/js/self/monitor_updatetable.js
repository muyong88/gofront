
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
      table.row.add([
        obj.updateTime,
        obj.msgType,
        obj.ID,
        obj.MID,
        obj.BID,
        obj.PID,
        obj.MainOrBackup,
        obj.ProcessName,
        obj.Report.Report_type,
        obj.Report.Command_type,
        obj.Report.Command_result,
        obj.Report.Recv_status_revert,
        obj.Report.Recv_status,
        obj.Report.First,
        obj.Report.Last,
        obj.Report.Recv_count,
      obj.Report.Send_no,
      '<a href="/protocal/commandpage?MsgType='+obj.msgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' 
    ]);
    var currentPage = table.page();
      rowCount = table.data().length-1;
      insertedRow = table.row(rowCount).data();
      var tempRow;    
      for (var i=rowCount;i>0;i--) {
      tempRow = table.row(i-1).data();
      table.row(i).data(tempRow);
      table.row(i-1).data(insertedRow);
    }     
    changeColor();
    //refresh the current page
     table.page(currentPage).draw(false);
	  };
	  function updateCTCCTable(obj){
      var table = jQuery('#ctcc_tb').DataTable();
      table.row.add([
        obj.updateTime,
        obj.msgType,
        obj.processId,
        obj.sysId,
        obj.pattern,
        obj.channel,
        obj.isSend32KB,
        obj.isSendIPinIP,
        obj.isSaveFile,
        obj.isArchive,
        obj.resendShmHead,
        obj.resendShmTear,
        obj.resendWriteShmLoop,
        obj.resendReadShmLoop,
        obj.resendWriteShmSpeed,
        obj.resendReadShmSpeed,
        obj.saveShmHead,
        obj.saveShmTear,
        obj.saveWriteShmLoop,
        obj.saveReadShmLoop,
        obj.saveWriteShmSpeed,
        obj.saveReadShmSpeed,
        obj.recvBeats,
        obj.resendBeats,
        obj.saveBeats,
        obj.recvBytes,
        obj.send32KFrames,
        obj.sendIPinIPFrames,
        obj.sendSmallCraftFrames,
        obj.timeStamp,
        '<a href="/ctcc/commandpage?MsgType='+obj.msgType+'&SysId='+obj.sysId+'&Pattern='+obj.pattern+'&Channel='+obj.channel+'" target="_blank" style="color:red;">发送命令</a> '
      ]);
      var currentPage = table.page();
      rowCount = table.data().length-1;
      insertedRow = table.row(rowCount).data();
      var tempRow;    
      for (var i=rowCount;i>0;i--) {
      tempRow = table.row(i-1).data();
      table.row(i).data(tempRow);
      table.row(i-1).data(insertedRow);
     }    
     changeColor();
      table.page(currentPage).draw(false);
      
	  }
	  function updateNonRealTable(obj){
      var table = jQuery('#nonreal_tb').DataTable();
    table.row.add([
    obj.updateTime,
		obj.msgTag,
		obj.msgType,
		obj.missionID,
		obj.subtype,
		obj.MSGID,
		obj.sender,
		obj.timestamp,
		obj.type,
		obj.sendSessionID,
		obj.fileName,
		obj.filePath,
		obj.status,
    obj.station,
		'<a href="/non_real/commandpage?MsgTag='+obj.msgTag+'&MsgType='+obj.msgType+'&MissionID='+obj.missionID+'&Subtype='+obj.subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.sender+'&SendSessionID='+obj.sendSessionID+'" target="_blank" style="color:red;">发送命令</a>'
	]);
	var currentPage = table.page();
    rowCount = table.data().length-1;
    insertedRow = table.row(rowCount).data();
    var tempRow;    
    for (var i=rowCount;i>0;i--) {
    tempRow = table.row(i-1).data();
    table.row(i).data(tempRow);
    table.row(i-1).data(insertedRow);
   }     
   changeColor();
   //refresh the current page
    table.page(currentPage).draw(false);
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


