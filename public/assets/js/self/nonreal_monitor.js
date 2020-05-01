
	  function updateTable(msg){
    var obj = eval("("+msg+")");
		switch(obj.MsgSign) {
			 case "NonRealFileState":   
			 updateNonRealTable(obj);
       			 break;
     		default:     
      } 
    };
    
	  
	  function updateNonRealTable(obj){
      var table = jQuery('#nonreal_tb').DataTable();
    table.row.add([
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
		obj.updateTime,
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
   //refresh the current page
    table.page(currentPage).draw(false);
	  };

