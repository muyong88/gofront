
	  function updateTable(msg){
    var obj = eval("("+msg+")");
		switch(obj.MsgSign) {
			 case "CTCCProcessState":   
			 updateCTCCTable(obj);
       			 break;
     		default:     
      } 
    }
    
	  
	  function updateCTCCTable(obj){

      var table = jQuery('#ctcc_tb').DataTable();
      table.row.add([
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
      obj.updateTime,
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
   //refresh the current page
    table.page(currentPage).draw(false);
	  }	  

