
jQuery(window).load(function()
{
  changeColor();
});

function changeColor(){
  changeColorSingle('#ctcc_tb');
  changeColorSingle('#protocal_tb');
  changeColorSingle('#nonreal_tb');
};

function changeColorSingle(id){
  var table = jQuery(id).DataTable();
  rowCount = table.data().length;
  for(var i=0;i<rowCount;i++){
    var curtime= new Date();
    var updatetime=new Date(table.cell(i,0).data());
    var datediffSecond=Math.round((curtime.getTime()-updatetime.getTime())/1000);
    if(datediffSecond<=60){
      jQuery(table.row(i).nodes()).css("color","green");
    }else if(datediffSecond<=300){
      jQuery(table.row(i).nodes()).css("color","black");
    }else{
      jQuery(table.row(i).nodes()).css("color","grey");
    }
  }
};



var int=self.setInterval("clock()",5000);
function clock()
{
  changeColor();
};
