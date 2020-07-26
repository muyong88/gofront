
    jQuery(document).ready(function()
    {
        var table = jQuery("#protocal_tb_fixed").dataTable({
            // "sPaginationType"s: "bootstrap",
            // "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            // "bStateSave": true,
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
          //             var found=false;
          //             for(var i in parm){
          //               if(parm[i].ID==rows[j][2]&&parm[i].BID==rows[j][4]&&parm[i].MID==rows[j][3]&&parm[i].ProcessName==rows[j][7]&&parm[i].PID==rows[j][5]&&parm[i].MainOrBackup==rows[j][6]){
          //                 found=true;
          //               }
          //             }
          //             if(found==false){
          //               parm.push({'ID':Number(rows[j][2]),'MID':rows[j][3],'BID':rows[j][4],'ProcessName':rows[j][7],"MainOrBackup":rows[j][6],"PID":rows[j][5]}) ;
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
        var table = jQuery('#protocal_tb_fixed').DataTable();
        rowCount = table.data().length;
        // alert(obj.MID+" "+obj.MainOrBackup+" "+obj.ProcessName);
        for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
          jQuery(table.row(i).nodes()).addClass("success");
          break;
        }
      }
      }else if(obj.MsgFlag=="ProctocalRevEnd"){
        var table = jQuery('#protocal_tb_fixed').DataTable();
        rowCount = table.data().length;
        // alert(obj.MID+" "+obj.MainOrBackup+" "+obj.ProcessName);
        for(var i=0;i<rowCount;i++){
        if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
          jQuery(table.row(i).nodes()).removeClass("warning");
          break;
        }
      }
    }else if(obj.MsgFlag=="ProctocalRevMedium"){
      var table = jQuery('#protocal_tb_fixed').DataTable();
      rowCount = table.data().length;
      // alert(obj.MID+" "+obj.MainOrBackup+" "+obj.ProcessName);
      for(var i=0;i<rowCount;i++){
      if(table.cell(i,3).data()==obj.MID && table.cell(i,6).data()==obj.MainOrBackup && table.cell(i,7).data()==obj.ProcessName){
        jQuery(table.row(i).nodes()).removeClass("success");
        jQuery(table.row(i).nodes()).addClass("warning");;
        break;
      }
    }
  }
  }
	  
	  function updateProtocalTable(obj){
      var table = jQuery('#protocal_tb_fixed').DataTable();
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
          table.cell(i,17).data ('<a href="/protocal/commandpage?PID='+obj.PID+'&MainOrBackup='+obj.MainOrBackup+'&ID='+obj.ID+'&MID='+obj.MID+'&BID='+obj.BID+'&ProcessName='+obj.ProcessName+'" target="_blank" style="color:red;">发送命令</a>' );
          jQuery(table.row(i).nodes()).css("color","green");
          break;
        }
      }
      changeColor();
	var currentPage = table.page();
   //refresh the current page
    table.page(currentPage).draw(false);
	  };

  