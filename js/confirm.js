(function($) {        
    $.alerts = {         
        confirm: function(title, message, callback) {  
            if( title == null ) title = 'Confirm';  
            $.alerts._show(title, message, null, 'confirm', function(result) {  
                if( callback ) callback(result);  
            });  
        },     
        _show: function(title, msg, value, type, callback) {  
            
                    var _html = "";  
   
                    _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '<img src="img/cross.png" style="margin-left:332px;cursor: pointer;" class="Cross"></span>';  
                    _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';   
                    if (type == "confirm") {  
                      _html += '<input id="mb_btn_no" type="button" value="取消" />';  
                      _html += '<input id="mb_btn_ok" type="button" value="确定" />';  
                    }  
                    _html += '</div></div>';  
                   
                    //必须先将_html添加到body，再设置Css样式  
                    $("body").append(_html); GenerateCss();  
           
            switch( type ) {   
                case 'confirm':  
                     
                    $("#mb_btn_ok").click( function() {  
                        $.alerts._hide();  
                        if( callback ) callback(true);  
                    });  
                    $("#mb_btn_no").click( function() {  
                        $.alerts._hide();  
                        if( callback ) callback(false);  
                    });
					$(".Cross").click( function() {  
                        $.alerts._hide();  
                        if( callback ) callback(false);  
                    });
                    $("#mb_btn_no").focus();  
                    $("#mb_btn_ok, #mb_btn_no").keypress( function(e) {  
                        if( e.keyCode == 13 ) $("#mb_btn_ok").trigger('click');  
                        if( e.keyCode == 27 ) $("#mb_btn_no").trigger('click');  
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
  var GenerateCss = function () {  
   
    $("#mb_box").css({ width: '100%', height: '100%', zIndex: '4', position: 'fixed',  
      filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'  
    });  
   
    $("#mb_con").css({ zIndex: '4', width: '448px',height:'230px', position: 'fixed',  
      backgroundColor: 'White',  
    });  
   
    $("#mb_tit").css({ display: 'block', fontSize: '18px', color: '#444', padding: '10px 15px', 
	  height:'48px',
      backgroundColor: 'rgba(242,242,242,1)',  
      fontWeight:900,
	  borderBottom:'1px solid rgba(204,204,204,1)'
    });  
   
    $("#mb_msg").css({ height:'112px', backgroundColor: 'rgba(249,249,249,1)',lineHeight:'50px',padding:'10px 15px',
      fontSize: '16px' ,color:'#4c4c4c' 
    });  
   
    $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',  
      border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',  
      lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'  
    });  
   
    $("#mb_btnbox").css({textAlign: 'right' ,backgroundColor: 'rgba(242,242,242,1)',height:'70px',borderTop:'1px solid rgba(204,204,204,1)'});  
    $("#mb_btn_ok,#mb_btn_no").css({ width: '80px', borderRadius:'4px'});  
    $("#mb_btn_ok").css({ backgroundColor: 'white',height:'34px',marginTop:'18px',marginRight:'10px',marginLeft:'33px',color:'rgba(173,153,153,1)' });  
    $("#mb_btn_no").css({ height:'34px',marginTop:'18px',color:'rgba(173,153,153,1)',outline:'none',border:'none',backgroundColor:'rgba(242,242,242,1)'});  
	$("#mb_btn_no").mouseover(function(){
	  $("#mb_btn_no").css("color","black");
	 });
	$("#mb_btn_no").mouseleave(function(){
	   $("#mb_btn_no").css("color","rgba(173,153,153,1)");
	  });
    $("#mb_btn_ok").mouseover(function(){
	  $("#mb_btn_ok").css("color","black");
	 });
    $("#mb_btn_ok").mouseleave(function(){
       $("#mb_btn_ok").css("color","rgba(173,153,153,1)");
      });
   
    var _widht = document.documentElement.clientWidth; //屏幕宽  
    var _height = document.documentElement.clientHeight; //屏幕高  
   
    var boxWidth = $("#mb_con").width();  
    var boxHeight = $("#mb_con").height();  
   
    //让提示框居中  
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });  
  }  
   
  
})(jQuery);