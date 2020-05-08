

	  function updateTable(msg){
    var obj = eval("("+msg+")");
		switch(obj.MsgSign) {
			 case "ProtocalProcessState":   
			 updateProtocalTable(obj);
              break;
       case "NewMessage":
       updateNewMessage(obj);
              break;
     		default:     
      } 
    };
    
    function updateNewMessage(obj){
      if(obj.MsgFlag=="ProctocalRevStart"){
        var table = jQuery('#protocal_tb').DataTable();
        rowCount = table.data().length;
        // alert(obj.MID+" "+obj.MainOrBackup+" "+obj.ProcessName);
        for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
          jQuery(table.row(i).nodes()).addClass("success");;
          break;
        }
      }
      }else if(obj.MsgFlag=="ProctocalRevEnd"){
        var table = jQuery('#protocal_tb').DataTable();
        rowCount = table.data().length;
        // alert(obj.MID+" "+obj.MainOrBackup+" "+obj.ProcessName);
        for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
          jQuery(table.row(i).nodes()).removeClass("success");
          break;
        }
      }
    }
  }
	  
	  function updateProtocalTable(obj){
      var table = jQuery('#protocal_tb').DataTable();
      rowCount = table.data().length;
      for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
          table.cell(i,0).data ( obj.updateTime);
          table.cell(i,1).data (obj.msgType);
          table.cell(i,2).data (obj.ID);
          table.cell(i,4).data (obj.BID);
          table.cell(i,5).data (obj.PID);
          table.cell(i,8).data (obj.Report.Report_type);
          table.cell(i,9).data (obj.Report.Command_type);
          table.cell(i,10).data (obj.Report.Command_result);
          table.cell(i,11).data (obj.Report.Recv_status_revert);
          table.cell(i,12).data (obj.Report.Recv_status);
          table.cell(i,13).data (obj.Report.First);
          table.cell(i,14).data (obj.Report.Last);
          table.cell(i,15).data (obj.Report.Recv_count);
          table.cell(i,16).data (obj.Report.Send_no);
          table.cell(i,17).data ('<a href="/protocal/commandpage?MsgType='+obj.msgType+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' );
          break;
        }
      }
	var currentPage = table.page();
   //refresh the current page
    table.page(currentPage).draw(false);
	  };

  