


  jQuery(document).ready(function()
      {
          var table = jQuery("#ctcc_tb_fixed").dataTable({
              // "sPaginationType": "bootstrap",
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
            //               if(parm[i].sysId==rows[j][3]&&parm[i].pattern==rows[j][4]&&parm[i].channel==rows[j][5]){
            //                 found=true;
            //               }
            //             }
            //             if(found==false){
            //               parm.push({'sysId':Number(rows[j][3]),'pattern':Number(rows[j][4]),'channel':Number(rows[j][5])}) ;
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

      var table = jQuery('#ctcc_tb_fixed').DataTable();
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

