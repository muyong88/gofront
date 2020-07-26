


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
      table.draw()
	  };
	  function updateCTCCTable(obj){
      var table = jQuery('#ctcc_tb').DataTable();
      table.draw();
      
	  }
	  function updateNonRealTable(obj){
      var table = jQuery('#nonreal_tb').DataTable();
      table.draw();
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



jQuery(document).ready(function()
    {
        var table = jQuery("#ctcc_tb").dataTable({
			processing: true,
            serverSide: true,
            ajax: function (data, callback, settings) {
            //封装请求参数
			// console.log(data);
            let param={};    
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            // console.log(param.limit)
            param.start = data.start;//开始的记录序号
            // param.page = (data.start / data.length)+1;//当前页码
            // param.order = data.order[0]
            // console.log(param);
            //ajax请求数据
            jQuery.ajax({
                type: "POST",
                url: "/ctcc/query_db_init",
                cache: false,  //禁用缓存
                data: JSON.stringify(param),  //传入组装的参数
                dataType: "json",
                success: function (result) {                    
                    //封装返回数据
                    // console.log(result);
                    var resultJson=eval("("+result+")");
                    // console.log(resultJson.count);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = resultJson.count;//返回数据全部记录
                    returnData.recordsFiltered = resultJson.count;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = resultJson.data; //返回的数据列表
                    // console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);                        
                }
            });
			},	
			columns: [
					{ data: "UpDateTime" },
					{ data: "MsgType" },
					{ data: "ProcessID" },
					{ data: "SysID" },
					{ data: "Pattern" },
					{ data: "Channel" },
					{ data: "IsSend32KB" },
					{ data: "IsSendIPinIP" },
					{ data: "IsSaveFile" },
					{ data: "IsArchive" },
					{ data: "ResendShmHead" },
                    { data: "ResendShmTear" },
					{ data: "ResendWriteShmLoop" },
					{ data: "ResendReadShmLoop" },
                    { data: "ResendWriteShmSpeed" },
                    { data: "ResendReadShmSpeed" },
                    { data: "SaveShmHead" },
					{ data: "SaveShmTear" },
					{ data: "SaveWriteShmLoop" },
					{ data: "SaveReadShmLoop" },
                    { data: "SaveWriteShmSpeed" },
					{ data: "SaveReadShmSpeed" },
					{ data: "RecvBeats" },
                    { data: "ResendBeats" },
                    { data: "SaveBeats" },
                    { data: "RecvBytes" },
                    { data: "Send32KFrames" },
					{ data: "SendIPinIPFrames" },
					{ data: "SendSmallCraftFrames" },
                    { data: "TimeStamp" }
				],	
			"columnDefs": [{
                "render": function ( data, type, row ) {
						return  '<a href="/ctcc/commandpage?MsgType='+row["MsgType"]+'&SysId='+row["SysID"]+'&Pattern='+row["Pattern"]+'&Channel='+row["Channel"]+'" target="_blank" style="color:red;">发送命令</a> '
                	},
                "targets": 30
            	}],
            "order": [[ 0, "desc" ]],
            // dom: 'Bfrtip',
            // buttons: [
            //     {
            //         text: '批量发送命令',
            //         action: function ( e, dt, node, config ) {
            //           var rows = dt.rows('.selectRow').data()
            //           if(rows.length==0){
            //               alert("至少选择一行！");
            //               return;
            //           }
            //           let parm=[];
            //           for (var j=0;j<rows.length;j++){
            //             var found=false;
            //             for(var i in parm){
            //               if(parm[i].sysId==rows[j]["SysID"]&&parm[i].pattern==rows[j]["Pattern"]&&parm[i].channel==rows[j]["Channel"]){
            //                 found=true;
            //               }
            //             }
            //             if(found==false){
            //               parm.push({'sysId':Number(rows[j]["SysID"]),'pattern':Number(rows[j]["Pattern"]),'channel':Number(rows[j]["Channel"])}) ;
            //             }
            //           }    
                                   
            //           window.open( "/ctcc/batch_commandpage?value="+ escape(JSON.stringify(parm)) );
            //         }
            //     },
            //     {
            //         text: '全选',
            //         action: function ( e, dt, node, config ) {
            //           rowCount = dt.data().length;
            //           for (var i=0;i<rowCount;i++) {
            //             jQuery(dt.row(i).nodes()).addClass("selectRow");
            //           }     
            //         }
            //     },
            //     {
            //         text: '全不选',
            //         action: function ( e, dt, node, config ) {
            //           rowCount = dt.data().length;
            //           for (var i=0;i<rowCount;i++) {
            //             jQuery(dt.row(i).nodes()).removeClass("selectRow");
            //           }     
            //         }
            //     },
            //     {
            //         text: '反选',
            //         action: function ( e, dt, node, config ) {
            //           rowCount = dt.data().length;
            //           for (var i=0;i<rowCount;i++) {
            //             jQuery(dt.row(i).nodes()).toggleClass("selectRow");
            //           }     
            //         }
            //     }
            // ]
		});
        // table.columnFilter({
        //     "sPlaceHolder" : "head:after"
        // });		
        // jQuery('table tbody').on( 'click', 'tr', function () {
        // jQuery(this).toggleClass('selectRow');
        // } );		
     });


    jQuery(document).ready(function()
    {
        var table = jQuery("#protocal_tb").dataTable({
            // "sPaginationType"s: "bootstrap",
            // "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            // "bStateSave": true,
            processing: true,
            serverSide: true,
            ajax: function (data, callback, settings) {
            //封装请求参数
			// console.log(data);
            let param={};    
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            // param.page = (data.start / data.length)+1;//当前页码
            // param.order = data.order[0]
            // console.log(param);
            //ajax请求数据
            jQuery.ajax({
                type: "POST",
                url: "/protocal/query_db_init",
                cache: false,  //禁用缓存
                data: JSON.stringify(param),  //传入组装的参数
                dataType: "json",
                success: function (result) {                    
                    //封装返回数据
                    // console.log(result);
                    var resultJson=eval("("+result+")");
                    // console.log(resultJson.count);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = resultJson.count;//返回数据全部记录
                    returnData.recordsFiltered = resultJson.count;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = resultJson.data; //返回的数据列表
                    // console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);                        
                }
            });
			},	
			columns: [
					{ data: "UpDateTime" },
					{ data: "MsgType" },
					{ data: "ID" },
					{ data: "MID" },
					{ data: "BID" },
					{ data: "PID" },
					{ data: "MainOrBackup" },
					{ data: "ProcessName" },
					{ data: "ReportType" },
					{ data: "CommandType" },
					{ data: "CommandResult" },
                    { data: "RecvStatusRevert" },
					{ data: "RecvStatus" },
					{ data: "First" },
                    { data: "Last" },
                    { data: "RecvCount" },
                    { data: "SendNo" }
				],	
			"columnDefs": [{
                "render": function ( data, type, row ) {
						return '<a href="/protocal/commandpage?PID='+row["PID"]+'&MainOrBackup='+row["MainOrBackup"]+'&ID='+row["ID"]+'&MID='+row["MID"]+'&BID='+row["BID"]+'&ProcessName='+row["ProcessName"]+'" target="_blank" style="color:red;">发送命令</a>' 
                	},
                "targets": 17
            	}],


            "order": [[ 0, "desc" ]],
          //   dom: 'Bfrtip',
          //   buttons: [
          //     {
          //         text: '批量发送命令',
          //         action: function ( e, dt, node, config ) {
          //           var rows = dt.rows('.selectRow').data()
          //           if(rows.length==0){
          //               alert("至少选择一行！");
          //               return;
          //           }
          //           let parm=[];
          //           for (var j=0;j<rows.length;j++){
					//   var found=false;
          //             for(var i in parm){
          //               if(parm[i].ID==rows[j]["ID"]&&parm[i].BID==rows[j]["BID"]&&parm[i].MID==rows[j]["MID"]&&parm[i].ProcessName==rows[j]["ProcessName"]&&parm[i].PID==rows[j]["PID"]&&parm[i].MainOrBackup==rows[j]["MainOrBackup"]){
          //                 found=true;
          //               }
					//   }
					  
          //             if(found==false){
          //               parm.push({'ID':Number(rows[j]["ID"]),'MID':rows[j]["MID"],'BID':rows[j]["BID"],'ProcessName':rows[j]["ProcessName"],"MainOrBackup":rows[j]["MainOrBackup"],"PID":rows[j]["PID"]}) ;
          //             }
          //           }    
                                 
          //           window.open( "/protocal/batch_commandpage?value="+ escape(JSON.stringify(parm)));
          //         }
          //     },
          //       {
          //           text: '全选',
          //           action: function ( e, dt, node, config ) {
          //             rowCount = dt.data().length;
          //             for (var i=0;i<rowCount;i++) {
          //               jQuery(dt.row(i).nodes()).addClass("selectRow");
          //             }     
          //           }
          //       },
          //       {
          //           text: '全不选',
          //           action: function ( e, dt, node, config ) {
          //             rowCount = dt.data().length;
          //             for (var i=0;i<rowCount;i++) {
          //               jQuery(dt.row(i).nodes()).removeClass("selectRow");
          //             }     
          //           }
          //       },
          //       {
          //           text: '反选',
          //           action: function ( e, dt, node, config ) {
          //             rowCount = dt.data().length;
          //             for (var i=0;i<rowCount;i++) {
          //               jQuery(dt.row(i).nodes()).toggleClass("selectRow");
          //             }     
          //           }
          //       }
          // ]
        });
        // table.columnFilter({
        //     "sPlaceHolder" : "head:after"
        // });		
        // jQuery('table tbody').on( 'click', 'tr', function () {
        // jQuery(this).toggleClass('selectRow');
        // } );		
     });

   jQuery(document).ready(function()
    {
        var table = jQuery("#nonreal_tb").dataTable({
			processing: true,
            serverSide: true,
            ajax: function (data, callback, settings) {
            //封装请求参数
			// console.log(data);
            let param={};      
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            // param.page = (data.start / data.length)+1;//当前页码
            // param.order = data.order[0]
            // console.log(param);
            //ajax请求数据
            jQuery.ajax({
                type: "POST",
                url: "/non_real/query_db_init",
                cache: false,  //禁用缓存
                data: JSON.stringify(param),  //传入组装的参数
                dataType: "json",
                success: function (result) {                    
                    //封装返回数据
                    // console.log(result);
                    var resultJson=eval("("+result+")");
                    // console.log(resultJson.count);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = resultJson.count;//返回数据全部记录
                    returnData.recordsFiltered = resultJson.count;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = resultJson.data; //返回的数据列表
                    // console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);                        
                }
            });
			},	
			columns: [
					{ data: "UpDateTime" },
					{ data: "MsgTag" },
					{ data: "MsgType" },
					{ data: "MissionID" },
					{ data: "Subtype" },
					{ data: "MSGID" },
					{ data: "Sender" },
					{ data: "Timestamp" },
					{ data: "Type" },
					{ data: "SendSessionID" },
					{ data: "FileName" },
                    { data: "FilePath" },
					{ data: "Status" },
					{ data: "Station" }
				],	
			"columnDefs": [{
                "render": function ( data, type, row ) {
						return    '<a href="/non_real/commandpage?MsgTag='+row["MsgTag"]+'&MsgType='+row["MsgType"]+'&MissionID='+row["MissionID"]+'&Subtype='+row["Subtype"]+'&MSGID='+row["MSGID"]+'&Sender='+row["Sender"]+'&SendSessionID='+row["SendSessionID"]+'" target="_blank" style="color:red;">发送命令</a>'
                	},
                "targets": 14
            	}],
            "order": [[ 0, "desc" ]],
            // dom: 'Bfrtip',
            // buttons: [
            //     {
            //         text: '批量发送命令',
            //         action: function ( e, dt, node, config ) {
            //           var rows = dt.rows('.selectRow').data()
            //       if(rows.length==0){
            //           alert("至少选择一行！");
            //           return;
            //       }
            //       let parm=[];
            //       for (var j=0;j<rows.length;j++){
            //         var found=false;
            //         for(var i in parm){
            //           if(parm[i].station==rows[j]["Station"]){
            //             found=true;
            //           }
            //         }
            //         if(found==false){
            //           parm.push({'station':rows[j]["Station"]}) ;
            //         }
            //       }    
                               
            //       window.open( "/non_real/batch_commandpage?value="+ escape(JSON.stringify(parm)) );
            //         }
            //     },
            //   {
            //       text: '全选',
            //       action: function ( e, dt, node, config ) {
            //         rowCount = dt.data().length;
            //         for (var i=0;i<rowCount;i++) {
            //           jQuery(dt.row(i).nodes()).addClass("selectRow");
            //         }     
            //       }
            //   },
            //   {
            //       text: '全不选',
            //       action: function ( e, dt, node, config ) {
            //         rowCount = dt.data().length;
            //         for (var i=0;i<rowCount;i++) {
            //           jQuery(dt.row(i).nodes()).removeClass("selectRow");
            //         }     
            //       }
            //   },
            //   {
            //       text: '反选',
            //       action: function ( e, dt, node, config ) {
            //         rowCount = dt.data().length;
            //         for (var i=0;i<rowCount;i++) {
            //           jQuery(dt.row(i).nodes()).toggleClass("selectRow");
            //         }     
            //       }
            //   }
            // ]
		});
        // table.columnFilter({
        //     "sPlaceHolder" : "head:after"
        // });		
        // jQuery('table tbody').on( 'click', 'tr', function () {
        // jQuery(this).toggleClass('selectRow');
        // } );		
     });

