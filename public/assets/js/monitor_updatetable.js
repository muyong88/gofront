
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
     		case "Non_Real_File_State":
			 updateNonRealTable(obj);
       		 	break;
			 case "CCTC_Process_State":   
			 updateCCTCTable(obj);
       			 break;
			case "Protocal_Process_State":      
			 updateProtocalTable(obj);
       			 break;
     		default:        
} 
	  }
	  function updateProtocalTable(obj){
            var trStr = '';//动态拼接table
            trStr += '<tr>';//拼接处规范的表格形式
            trStr += '<td>'+ obj.MsgType+'</td>';
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
			      trStr+='</tr>';
			jQuery('#protocal_tb').append(trStr);
	  }
	  function updateCCTCTable(obj){
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
			trStr+='</tr>';
			jQuery('#cctc_tb').append(trStr);
	  }
	  function updateNonRealTable(obj){
            var trStr = '';//动态拼接table
            trStr += '<tr>';//拼接处规范的表格形式
            trStr += '<td>'+ obj.MsgTag+'</td>';
            trStr += '<td>'+ obj.MsgType+'</td>';
            trStr += '<td>'+ obj.MissionID+'</td>';
            trStr += '<td>'+ obj.Subtype+'</td>';
            trStr += '<td>'+ obj.MSGID+'</td>';
            trStr += '<td>'+ obj.Sender+'</td>';
            trStr += '<td>'+ obj.Timestamp+'</td>';
            trStr += '<td>'+ obj.Type+'</td>';
            trStr += '<td>'+ obj.SendSessionID+'</td>';
            trStr += '<td>'+ obj.FileName+'</td>';
            trStr += '<td>'+ obj.FilePath+'</td>';
            trStr += '<td>'+ obj.Status+'</td>';
            trStr += '<td>'+ obj.Station+'</td>';
			      trStr+='</tr>';
			      jQuery('#nonreal_tb').append(trStr);
	  }

