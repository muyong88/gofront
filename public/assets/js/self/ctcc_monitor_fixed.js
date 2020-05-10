

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
      rowCount = table.data().length;
      for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.sysId && table.cell(i,5).data()==obj.channel){
          table.cell(i,0).data (obj.updateTime);
          table.cell(i,1).data (obj.msgType);
          table.cell(i,2).data (obj.processId);
          table.cell(i,4).data (obj.pattern);
          table.cell(i,6).data (obj.isSend32KB);
          table.cell(i,7).data (obj.isSaveFile);
          table.cell(i,8).data (obj.isArchive);
          table.cell(i,9).data (obj.resendShmHead);
          table.cell(i,10).data (obj.resendShmTear);
          table.cell(i,11).data (obj.resendWriteShmLoop);
          table.cell(i,12).data (obj.resendReadShmLoop);
          table.cell(i,13).data (obj.resendWriteShmSpeed);
          table.cell(i,14).data (obj.resendReadShmSpeed);
          table.cell(i,15).data (obj.saveShmHead);
          table.cell(i,16).data (obj.saveShmTear);
          table.cell(i,17).data (obj.saveWriteShmLoop);
          table.cell(i,18).data (obj.saveReadShmLoop);
          table.cell(i,19).data (obj.saveWriteShmSpeed);
          table.cell(i,20).data (obj.saveReadShmSpeed);
          table.cell(i,21).data (obj.resendWriteShmSpeed);
          table.cell(i,22).data (obj.recvBeats);
          table.cell(i,23).data (obj.resendBeats);
          table.cell(i,24).data (obj.saveBeats);
          table.cell(i,25).data (obj.recvBytes);
          table.cell(i,26).data (obj.send32KFrames);
          table.cell(i,27).data (obj.sendIPinIPFrames);
          table.cell(i,28).data (obj.sendSmallCraftFrames);
          table.cell(i,29).data (obj.timeStamp);
          table.cell(i,30).data ('<a href="/ctcc/commandpage?MsgType='+obj.msgType+'&SysId='+obj.sysId+'&Pattern='+obj.pattern+'&Channel='+obj.channel+'" target="_blank" style="color:red;">发送命令</a> ');
          break;
        }
      }
      changeColor();
    var currentPage = table.page();
   //refresh the current page
    var rownode=table.page(currentPage).draw(false);
	  }	  

