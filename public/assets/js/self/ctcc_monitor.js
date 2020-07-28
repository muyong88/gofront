

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
      table.draw();
	  }	  

