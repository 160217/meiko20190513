(function($) {
	$.alerts = {
		confirm: function(title, message, callback) {

			if (title == null) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if (callback) callback(result);
			});
		},
		_show: function(title, msg, value, type, callback) {

			var _html = "";

			_html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title +
				'<img src="img/cross.png" style="cursor: pointer;margin-left:875px;margin-top:-49px" class="Cross"></span>';
			_html += 
			    '<div id="mb_msg">配餐计划</div><div id="mb_btnbox">';
			_html +=
				'<div class="Contentleft"><div class="Content"><div style="float:left"><span>航班号</span></div><div style="float:right"><input type="text" class="Input1"></input></div></div>';
			_html +=
				'<div class="Content"><div style="float:left"><span>关联配餐航班号</span></div><div style="float:right"><input type="text" class="Input2"></input></div></div>';
			_html +=
				'<div class="Content"><div style="float:left"><span>离港时刻</span></div><div style="float:right"><input type="text" class="Input3"></input></div></div>';
			_html +=
				'<div class="Content"><div style="float:left"><span>班期</span></div><div style="float:right"><input type="text" class="Input6"></input></div></div>';
			if(title=="配餐计划明细"){
				_html +=
					'<div class="Content"><div style="float:left"><span>起始日期</span></div><div style="float:right"><input type="text" class="Input4"></input></div></div>';
				_html +=
					'<div class="Content"><div style="float:left"><span>截止日期</span></div><div style="float:right"><input type="text" class="Input5"></input></div></div></div>';
			}else{
			_html +=
				'<div class="Content"><div style="float:left"><span>截止日期</span></div><div style="float:right;width:114px;height:23px"><div class="form-group"><div class="input-group date form_datetime col-md-6" data-link-field="dtp_input1"><input type="text" class="Input5" size="16" type="text" value="" readonly></input>';
			_html +='<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span></div><input type="hidden" id="dtp_input1" value="" /><br /></div></div></div>';
			_html +=
				'<div class="Content"><div style="float:left"><span>截止日期</span></div><div style="float:right;width:114px;height:23px"><div class="form-group"><div class="input-group date form_datetime col-md-6" data-link-field="dtp_input1"><input type="text" class="Input5" size="16" type="text" value="" readonly></input>';
			_html +=
			    '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span></div><input type="hidden" id="dtp_input1" value="" /><br /></div></div></div></div>';
			}
			
			_html += '<div class="Contentright"><div><span>餐品</span><span>机供品</span><span>服务用具</span><span>备注</span>';
			_html +='<div class="Operate" style="display:none"><p><img src="img/zengjia.png">增加行</p><p><img src="img/jian.png">删除行</p><p><img src="img/fuzhi.png">复制行</p></div>'
			_html +=
				'<table border="1" class="Hidetable"></table></div>';
			_html += '<input id="mb_btn_ok" type="button" value="确定"/>';
			//必须先将_html添加到body，再设置Css样式  
			$("body").append(_html);
			GenerateCss();
			if (msg != "") {
				console.log(msg); //需要显示的数据
				$(".Input1").val(msg.Flightnum);
				$(".Input2").val(msg.Associate);
				$(".Input3").val(msg.Route);
				$(".Input4").val(msg.Stratdate);
				$(".Input5").val(msg.Enddate);
				$(".Input6").val(msg.Time);
			}
			// 
			if(title=="配餐计划明细"){
				$('.Contentleft input').attr('readOnly','readOnly');
				$(".Operate").hide();
				
			}	
			 // 判断input的状态
			 $(".Contentright span:nth-child(1)").css({
			 	'background-color':'rgba(204,204,204,1)'
			 });
			 function Inputstat(){
				  if(title=="配餐计划明细"){
				 	 $('.Contentright input').attr('readOnly','readOnly');
					 $('.Hidetable input').css({
					 	background:'rgba(242,242,242,1)',
					 	border:0,
						width:'100%',
					 	textAlign:'center'
					 })
				  }else if(title=="编辑配餐计划"||title=="复制新增"){
				 	$('.Contentleft input').removeAttr('readOnly');
				 	$('.Contentright input').removeAttr('readOnly');
				 	$('.Hidetable input').css({
				 		border:0,
				 		width:'100%',
				 		textAlign:'center'
				 	})
				 } ;
				  $('table tr th').css({
				 	  textAlign:'center'
				 });				 				 
			}
			// 
			function Show(){
				$('.Hidetable tr').remove();
				// 航段地址先分割
				console.log(msg.Route.split('-'));
				var city = msg.Route.split('-');
				// 餐品的查看
				html1='<tr><th width="15%">所属配餐段</th><th width="15%">航段</th><th width="10%">舱位</th><th width="40%">餐食标准名称</th><th width="20%">固定数量</th></tr>';
				$('.Hidetable').append(html1);
				for (var i = 0; i < city.length - 1; i++) {
					var html3='';
					var html2='';
					// 餐品种类
					// 根据舱位来确定对应的餐别 F C Y W CREW
				  var Caterdata=['头午正餐','公午正餐','普午正餐','高普午正餐','机午正餐'];	 
				   for(var j=0;j<msg.Seat.length;j++){
					   if(j==0){
						   var html1='<td rowspan="'+msg.Seat.length+'">'+(i+1)+'</td><td rowspan="'+msg.Seat.length+'"><input type="text" value="'+city[i] + '-' + city[i+1]+'"></td>';
						   var html2='<tr>'+html1+'<td><input type="text" value="'+msg.Seat[j]+'"></td><td><input type="text" value="'+Caterdata[j]+'"></td><td><input type="text" value="'+msg.Detail.Cater[i][j]+'"></td></tr>';
					   }else{
						   var html2='<tr><td><input type="text" value="'+msg.Seat[j]+'"></td><td><input type="text" value="'+Caterdata[j]+'"></td><td><input type="text" value="'+msg.Detail.Cater[i][j]+'"></td></tr>';
					   }      
					  $('.Hidetable').append(html2);
				   } 
				   }
				Inputstat();
					
			}
			Show();
			// 判断button和操作键是否出现
			if(title=="编辑配餐计划"||title=="复制新增"){
				$("#mb_btn_ok").css({
					display:'block'
				})
				$(".Operate").show();
			}
			// 根据msg中Detail的值来判断有几个配餐段 航段是什么 固定数量是多少
			$(".Contentright span").bind('click', function() {
				$(".Contentright span").css({
					'background-color':'rgba(255,255,255,1)'
				});
				$(this).css({
					'background-color':'rgba(204,204,204,1)'
				});
				if ($(this).text() == "餐品") {
					Show();
					
				}else if($(this).text() == "机供品"){
					   // 机供品的查看
					   $('.Hidetable tr').remove();
					   html1='<tr><th width="50%">所属配餐段</th><th width="50%">航段</th></tr><tr><td><input type="text" value="'+msg.Route+'"></td><td><input type="text" value="'+msg.Detail.Type+'"></td></tr>';
					   $('.Hidetable').append(html1);
					   Inputstat();
				}else if($(this).text() == "服务用具"){
					   $('.Hidetable tr').remove();
					   html1='<tr><th width="50%">机型</th><th width="50%">服务用具标准名称</th></tr><tr><td><input type="text" value="A310"></td><td><input type="text" value="吉祥A310"></td></tr>';
					   $('.Hidetable').append(html1);
					   Inputstat();
			   }else{
				       $('.Hidetable tr').remove();
					   html1='<tr><th width="100%">备注</th></tr><td><input type="text" value="基本常识"></td></tr>';
					   $('.Hidetable').append(html1);
					   Inputstat();
			   }
			  
			});

			

			switch (type) {
				case 'confirm':
					$("#mb_btn_ok").click(function() {
						if ($(".Input1").val()!= "" && $(".Input1").val()&& $(".Input3").val() != "" && $(".Input4").val() != "" && $(".Input5").val() != "") {
							var data_shuzu = {};//返回给页面的值
							$.alerts._hide();
							if (callback) callback(data_shuzu);
						}else{
							alert("请输入完整数据");
						}
					});
					if(title=="编辑配餐计划"||title=="复制新增"){
						$(".Cross").click(function() {
							var mymessage = confirm("退出将无法保存");
							if (mymessage == true) {
								$.alerts._hide();
							} else {
								if (callback) callback(false);
							}
									
					    });	
					 }
					// 查看详细时  点击x号界面消失
					$(".Cross").click(function() {
						$.alerts._hide();
					});
					$("#mb_btn_ok").keypress(function(e) {
						if (e.keyCode == 13) $("#mb_btn_ok").trigger('click');
					});
					break;
			}
		},
		_hide: function() {
			$("#mb_box,#mb_con").remove();
		}
	}
	// Shortuct functions  
	myConfirm = function(title, message, callback) {
		$.alerts.confirm(title, message, callback);
	};
	//生成Css  
	var GenerateCss = function() {

		$("#mb_box").css({
			width: '100%',
			height: '100%',
			zIndex: '4',
			position: 'fixed',
			filter: 'Alpha(opacity=60)',
			backgroundColor: 'black',
			top: '0',
			left: '0',
			opacity: '0.6'
		});

		$("#mb_con").css({
			zIndex: '4',
			width: '900px',
			height: '600px',
			position: 'fixed',
			backgroundColor: 'rgba(242,242,242,1)',
			border: '2px solid rgba(121,121,121,1)'
		});

		$("#mb_tit").css({
			display: 'inline-block',
			width: '113px',
			fontSize: '13px',
			backgroundColor: 'rgba(204,204,204,1)',
			height: '25px',
			textAlign: 'center',
			lineHeight: '25px'
		});

		$("#mb_msg").css({
			lineHeight: '50px',
			textAlign: 'center',
			marginTop: '-28px',
			fontSize: '20px',
			color: '#4c4c4c'
		});
		$(".Contentleft").css({
			float: 'left',
			border: '2px solid rgba(121,121,121,1)',
			width: '260px',
			height: '460px',
			marginLeft: '12px'
		});
		
		$(".Contentleft .Content").css({
			width: '230px',
			margin: '0 auto',
			marginTop: '22px',
			overflow: 'hidden'
		});
		$(".Contentleft input").css({
			width: '114px',
			fontSize: '12px'
		});
		// 日历
		$(".form_datetime").datetimepicker({
			pickerPosition: 'top-right',
			format: 'yyyy/mm/dd',
			weekStart: 0,
			todayBtn: 1,
			autoclose: true,
			startView: 2,
			minView: "month",
			forceParse: false,
			language: 'cn',
			
		});
		$(".input-group-addon").css({
			// display:'inline-block',
			position:'relative',
			top:'-7px',
			left:'-40px',
		})
		$(".Contentright").css({
			float: 'right',
			border: '2px solid rgba(121,121,121,1)',
			width: '604px',
			height: '460px',
			marginRight: '12px',
			})
		$(".Contentright span").css({
			display: 'inline-block',
			width: '67px',
			height: '25px',
			lineHeight: '24px',
			textAlign: 'center',
			border: '1px solid rgba(121,121,121,1)',
			cursor:'pointer'
		});
		$(".Operate p").css({
			display: 'inline-block',
			width: '67px',
			height: '25px',
			lineHeight: '24px',
			textAlign: 'center',
			border: '1px solid rgba(121,121,121,1)',
			cursor:'pointer',
			marginTop:'10px'
		});
		$(".Operate p img").css({
			display: 'inline-block',
			width: '15px',
			height: '15px',
			marginTop:'-2px'
		});
		$(".Hidetable").css({
			width: '584px',
			textAlign: 'center',
			margin: '0 auto',
			marginTop: '10px'
		});
		// 

		$("#mb_btn_ok").css({
			height: '34px',
			color: 'rgba(173,153,153,1)',
			position: 'absolute',
			bottom: '17px',
			left: '408px',
			width: '80px',
			borderRadius: '4px',
			display:'none'
		});

		$("#mb_btn_ok").mouseover(function() {
			$("#mb_btn_ok").css("color", "black");
		});
		$("#mb_btn_ok").mouseleave(function() {
			$("#mb_btn_ok").css("color", "rgba(173,153,153,1)");
		});

		var _widht = document.documentElement.clientWidth; //屏幕宽  
		var _height = document.documentElement.clientHeight; //屏幕高  

		var boxWidth = $("#mb_con").width();
		var boxHeight = $("#mb_con").height();

		//让提示框居中  
		$("#mb_con").css({
			top: (_height - boxHeight) / 2 + "px",
			left: (_widht - boxWidth) / 2 + "px"
		});
	}

})(jQuery);
