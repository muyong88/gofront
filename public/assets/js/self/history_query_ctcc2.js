
jQuery(document).ready(function(){           
    jQuery('#datetimepicker1').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        minuteStep: 1 ,
        autoclose: true,
        language: 'zh-CN'
    }).on('changeDate',function(e) { 
    var starttime=jQuery("#datetimepicker1").val();
    jQuery("#datetimepicker2").datetimepicker('setStartDate',starttime);
    jQuery("#datetimepicker1").datetimepicker('hide');
    });
    jQuery(document).on('changeDate', '#datetimepicker1', function () {
    jQuery('#ctccForm').data('bootstrapValidator') 
    .updateStatus('datetimepicker1', 'NOT_VALIDATED',null) 
    .validateField('datetimepicker1'); 
    });
    jQuery('#datetimepicker2').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        minuteStep: 1 ,
        autoclose: true,
        language: 'zh-CN'
    }).on('changeDate',function(e) { 
    var endtime=jQuery("#datetimepicker2").val();
    jQuery("#datetimepicker1").datetimepicker('setEndDate',endtime);
    jQuery("#datetimepicker2").datetimepicker('hide'); 
    });
    jQuery("#queryBtn").click(function(){
        var table = jQuery('#ctcc_tb_query').DataTable();
        table.draw();
    });
});



jQuery(document).ready(function()
    {
        var table = jQuery("#ctcc_tb_query").dataTable({
			processing: true,
            serverSide: true,
            ajax: function (data, callback, settings) {
            //封装请求参数
			// console.log(data);
            var startTime="";
            if(jQuery("#datetimepicker1").val()!=""){
                let date = jQuery("#datetimepicker1").data("datetimepicker").getDate();
                let mon=(date.getMonth() + 1);
                let day=date.getDate();
                let hour=date.getHours();
                let minute=date.getMinutes();
                let second=date.getSeconds();
                startTime=date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + "_" + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) ;
            }
            var endTime="";
            if(jQuery("#datetimepicker2").val()!=""){
                let date = jQuery("#datetimepicker2").data("datetimepicker").getDate();
                let mon=(date.getMonth() + 1);
                let day=date.getDate();
                let hour=date.getHours();
                let minute=date.getMinutes();
                let second=date.getSeconds();
                endTime=date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + "_" + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) ;
            }  
            let param={"channel": Number(jQuery("#channelControl").val()),"sysId": Number(jQuery("#sysIdControl").val()),"startTime":startTime,"endTime":endTime};    
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            // console.log(param.limit)
            param.start = data.start;//开始的记录序号
            // param.page = (data.start / data.length)+1;//当前页码
            // param.order = data.order[0]
            // console.log(param);
            //ajax请求数据
            jQuery.ajax({
                type: "POST",
                url: "/ctcc/query_db",
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