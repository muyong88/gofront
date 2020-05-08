

	  function updateTable(msg){
    var obj = eval("("+msg+")");
		switch(obj.MsgSign) {
			 case "ProtocalProcessState":   
			 updateProtocalTable(obj);
       			 break;
     		default:     
      } 
    };
    
	  
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
   //refresh the current page
    table.page(currentPage).draw(false);
	  };

