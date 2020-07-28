
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
		table.draw();
	  };

