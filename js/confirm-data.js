(function($) {
	$.alerts = {
		confirm: function(title, message,callback) {
			
			if (title == null) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if (callback) callback(result);
			});
		},
		_show: function(title, msg, value, type, callback) {

			var _html = "";

			_html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title +
				'<img src="img/cross.png" style="cursor: pointer;margin-left:589px;margin-top:-49px" class="Cross"></span>';
			_html += '<div id="mb_msg"> 航空公司目录 </div><div id="mb_btnbox">';
			_html +=
				'<div class="mb_content"><div>航空公司类别编码</div><select  name="" style="width:150px;height:26px" class="Select1"><option value="">请选择</option><option value="国内">国内</option><option value="国外">国外</option></select></div>';
			_html +=
				'<div class="mb_content"><div>航空公司类别名称</div><select  name="" style="width:150px;height:26px" class="Select2"><option value="">请选择</option><option value="15">15</option><option value="14">14</option></select></div>';
			_html += '<div class="mb_content"><div>航空公司编码</div><input type="text" class="Input1"></input></div>';
			_html += '<div class="mb_content"><div>航空公司名称</div><input type="text" class="Input2"></input></div>';
			_html += '<div class="mb_content"><div>航空公司类别编码</div><input type="text" class="Input3"></input></div>';			
			if (type == "confirm") {
				_html += '<input id="mb_btn_ok" type="button" value="确定"/>';
			}
			_html += '</div></div>';

			//必须先将_html添加到body，再设置Css样式  
			$("body").append(_html);
			GenerateCss();
            if(msg!=""){
            	// console.log(msg);//需要修改的数据
            	$(".Select1 option[value='"+msg.Type+"']").attr("selected","selected");
            	$(".Select2 option[value='"+msg.Name+"']").attr("selected","selected");
            	$(".Input1").val(msg.ParentName);
            	$(".Input2").val(msg.Level);
            	$(".Input3").val(msg.Desc);	
            }
			switch (type) {
				case 'confirm':
					$("#mb_btn_ok").click(function() {
						if ($(".Select1 option:selected").text() != "请选择" && $(".Select2 option:selected").text() != "请选择" && $(".Input1").val() != "" && $(".Input2").val() != "" && $(".Input3").val() != "") {
							var data_shuzu = {};
							data_shuzu["Type"]=$(".Select1 option:selected").text();
							data_shuzu["Name"]=$(".Select2 option:selected").text();
							data_shuzu["ParentName"]=$(".Input1").val();
							data_shuzu["Level"]=$(".Input2").val();
							data_shuzu["Desc"]=$(".Input3").val();
							$.alerts._hide();
							if (callback) callback(data_shuzu);
						}else{
							alert("请输入完整数据");
						}
					});
					$(".Cross").click(function() {
						var mymessage = confirm("退出将无法保存");
						if (mymessage == true) {
							$.alerts._hide();
						} else {
							if (callback) callback(false);
						}

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
			width: '608px',
			height: '472px',
			position: 'fixed',
			backgroundColor: 'rgba(242,242,242,1)',
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
			marginBottom: '20px',
			fontSize: '20px',
			color: '#4c4c4c'
		});
		$(".mb_content").css({
			margin: '0 auto',
			width: '310px',
			fontSize: '14px',
			marginBottom: '20px'

		});
		$(".mb_content div").css({
			display: 'inline-block',
			float: 'left'
		});
		$(".mb_content input").css({
			width: '150px'
		});
		$("#mb_ico").css({
			display: 'block',
			position: 'absolute',
			right: '10px',
			top: '9px',
			border: '1px solid Gray',
			width: '18px',
			height: '18px',
			textAlign: 'center',
			lineHeight: '16px',
			cursor: 'pointer',
			borderRadius: '12px',
			fontFamily: '微软雅黑'
		});

		$("#mb_btnbox").css({
			textAlign: 'right',
			height: '70px'
		});
		$("#mb_btn_ok,#mb_btn_no").css({
			width: '80px',
			borderRadius: '4px'
		});
		$("#mb_btn_ok").css({
			height: '34px',
			color: 'rgba(173,153,153,1)',
			position: 'absolute',
			bottom: '92px',
			left: '262px'
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
