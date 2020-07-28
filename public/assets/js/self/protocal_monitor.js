

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
      table.draw()
	  };

