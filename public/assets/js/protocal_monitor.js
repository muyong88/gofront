
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
			 case "ProtocalProcessState":   
			 updateProtocalTable(obj);
       			 break;
     		default:     
      } 
    };
    
	  
	  function updateProtocalTable(obj){
      var table = jQuery('#protocal_tb').DataTable();
    table.row.add([
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
      obj.Report.Send_no
    ]).draw();
	  };

