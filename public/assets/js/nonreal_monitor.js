
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
		'<a href="/non_real/commandpage?MsgTag='+obj.msgTag+'&MsgType='+obj.msgType+'&MissionID='+obj.missionID+'&Subtype='+obj.subtype+'&MSGID='+obj.MSGID+'&Sender='+obj.sender+'&SendSessionID='+obj.sendSessionID+'" target="_blank" style="color:red;">发送命令</a>'
    ]).draw();
	  };

