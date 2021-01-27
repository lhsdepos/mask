//Data Code
function GetServTime_ajax()//ajax 获取服务器时间
{
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: _str_root+'include/get_time.php',
		dataType: 'text',
		success: function(data) {arr_data=data},
		error: function(XMLHttpRequest, textStatus, errorThrown) {return 'null';}
	});
	return arr_data;
}
function GetConfig_ajax(str_prj)//ajax 获取项目配置信息
{
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: '../'+str_prj+'/config_a.php',
		dataType: 'json',
		data: {sxs: 'sxs'},
		success: function(data) {arr_data=data},
		error: function(XMLHttpRequest, textStatus, errorThrown) {return 'null';}
	});
	return arr_data;
}
function GetConfig_ajax1(str_url)//ajax 获取项目配置信息
{
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: str_url,
		dataType: 'json',
		data: {sxs: 'sxs'},
		success: function(data) {arr_data=data},
		error: function(XMLHttpRequest, textStatus, errorThrown) {return 'null';}
	});
	return arr_data;
}
function GetJSJDK_ajax(str_appid,str_sec)//ajax 获取微信JSJDK授权
{
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: _str_root+'include/wx_getJDk.php?appid='+str_appid+'&secret='+str_sec,
		//url: 'http://oa.gxayw.com/Mask/include/wx_getJDk.php?appid='+str_appid+'&secret='+str_sec,
		dataType: 'json',
		success: function(data) {arr_data=data},
		error: function(XMLHttpRequest, textStatus, errorThrown) {return errorThrown;}
	});
	return arr_data;
}
function GetScope_ajax()//ajax 获取微信用户授权信息
{
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: _str_root+'include/get_wx_userinfo.php',
		dataType: 'json',
		data: {sxs: 'sxs'},
		success: function(data) {arr_data=data},
		error: function(XMLHttpRequest, textStatus, errorThrown) {return 'null';}
	});
	return arr_data;
}
function GetData_ajax(str_getData_url,str_method,str_tb,str_fb,str_whe,str_val)//ajax 获取数据库数据
{
	var str_dt='json';
	if(str_method!='list')str_dt='text';
	var arr_data;
	$.ajax({
		async: false,
		type: "POST",
		url: str_getData_url,
		dataType:str_dt,
		data: {
			method:str_method ,
			tb: str_tb,
			fd: str_fb,
			whe: str_whe,
			val:str_val
		},
		success: function(data) {arr_data=data;},
		error: function(XMLHttpRequest, textStatus, errorThrown){return errorThrown;return 'null';}
	});
	return arr_data;
}
function GetData_ajax_async(str_getData_url,str_method,str_tb,str_fb,str_whe,str_val,callback)//ajax 获取数据库数据
{
	var str_dt='json';
	if(str_method!='list')str_dt='text';
	$.ajax({
		async: true,
		type: "POST",
		url: str_getData_url,
		dataType: str_dt,
		data: {
			method:str_method ,
			tb: str_tb,
			fd: str_fb,
			whe: str_whe,
			val:str_val
		},
		success: function(data) {callback(data);},
		error: function(XMLHttpRequest, textStatus, errorThrown){callback(null);console.log('select '+str_fb+' from '+str_tb+' where 1=1 '+str_whe+' '+str_getData_url+';');console.log(XMLHttpRequest)}
	});
}
//Data Code End

//Variable Code
function SetRandom(i_min,i_max){return i_min+Math.round(Math.random()*(i_max-i_min));}//生成范围随机数
function str_pad(num, length){return (Array(length).join('0') + num).slice(-length);}//格式化补0
function isArr(o){return Object.prototype.toString.call(o)=='[object Array]';}//是否数组
function LimitStr(str_t,i_lim,str_last)//限制str_t字符串长度，超过i_lim，则之后的显示str_last
{
	if(str_t.length>i_lim)str_t=str_t.substr(0,i_lim)+str_last;
	return str_t;
}
function SeachArr(arr,str_seach)//查找N维数组，返回坐标（数组）
{
	var arr_res=[];
	$.each(arr,function(k,v)
	{
		SeachArr_ex(v,str_seach,k)
	})
	function SeachArr_ex(arr_v,str_seach,i_k)
	{
		var i_pre_k=-1
		if(isArr(arr_v))
		{
			i_pre_k=SeachArr_ex(v,str_seach,k);
			if(i_pre_k!=-1){arr_res.push(k);return k;}
			else return -1;
		}
		else
		{
			if(v==str_seach){arr_res.push(k);return k;}
			else return -1;
		}
	}
}
function GetQueryString(str_para)//获取页面QueryString
{
	var lot = location.search;
	if(lot.indexOf(str_para)>=0)
	{
    	var reg = new RegExp(".*" + str_para + "\\s*=([^=&#]*)(?=&|#|).*","g");
    	return decodeURIComponent(lot.replace(reg, "$1"));
	}else return '';
}
function GetQS(str_key)//获取GetQueryString
{
	var str_t='';
	var str_qs = location.search;
	var arr_qs=new Array();
	var arr_t=new Array();
	arr_qs=str_qs.split('&');
	arr_qs[0]=arr_qs[0].replace('?','');
	$.each(arr_qs,function(k,v)
	{
		arr_t=v.split('=');
		if(arr_t[0]==str_key)str_t=arr_t[1];
	})
	return str_t;
}
function GetTimeDiff(dt1,dt2,is_ms)//计算时间间隔
{
	var i_d_d=0,i_h_d=0,i_m_d=0,i_s_d=0;
	var str_d='';
	i_diff=Math.abs(dt2.getTime()-dt1.getTime());
	if(i_diff>=86400000)
	{
		i_d_d=Math.floor(i_diff/86400000);
		i_diff=i_diff%86400000;
		str_d=i_d_d+'天';
	}
	if(i_diff>=3600000)
	{
		i_d_h=Math.floor(i_diff/3600000);
		i_diff=i_diff%3600000;
		str_d=str_d+i_d_h+'小时';
	}
	if(i_diff>=60000)
	{
		i_m_d=Math.floor(i_diff/60000);
		i_diff=i_diff%60000;
		str_d=str_d+i_m_d+'分';
	}
	if(i_diff>=1000)
	{
		i_s_d=Math.floor(i_diff/1000);
		i_diff=i_diff%1000;
		str_d=str_d+i_s_d;
	}
	if(is_ms)str_d=str_d+'.'+i_diff
	return {'d':i_d_d,'h':i_d_h,'m':i_m_d,'s':i_s_d}
}
Date.prototype.Format = function(fmt)//格式化时间
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}/*
Array.prototype.distinct=function()
{
	var a=[],b=[];
	for(var prop in this)
	{
		var d = this[prop];
		if (d===a[prop]) continue; //防止循环到prototype
		if (b[d]!=1){a.push(d);b[d]=1;}
	}
	return a;
}*/
//Variable Code End

////////////Page Code///////////////
function preloadimages(arr,str_cb)//预加载图片
{
	var newimages=[], loadedimages=0
    var postaction=function(){}  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //此处返回一个空白对象的done方法
        done:function(f){
            postaction=f || postaction
        }
    }
}
function PreLoadImgEX(i_len,arr_imgs,str_cb,str_cb_end)//预加载改良
{
	var i_t_len=arr_imgs.length;
	if(i_t_len>0)
	{
		var img_t=new Image();
		img_t.src=arr_imgs[0];
		img_t.onload=function()
		{
			arr_imgs.shift();
			if(i_t_len==1){str_cb(1);str_cb_end();}
			else{PreLoadImgEX(i_len,arr_imgs,str_cb,str_cb_end);str_cb((i_len-i_t_len)/i_len);}
		}
	}
}
function ShowProcBar(i_proc,str_cb)
{
	var str_txt=parseInt(i_proc*100)+'%'
	if(i_proc==0)
	{
		$('body').append('<div id="div_proc_m" style="position:absolute;top:55%;left:0;width:100%;z-index:20001;text-align:center;"><div style="margin:auto;width:80%;height:20px;border:3px solid #fff;border-radius:50px;"><div id="proc_my" style="width:0;height:100%;background:#fff;"></div></div><strong id="txt_proc" style="color:#fff;"></strong></div>');
	}
	else if(i_proc>=1)
	{
		$('#txt_proc').html(str_txt)
		$('#proc_my').width(str_txt)
		$('#div_proc_m').fadeOut()
		setTimeout(function(){$('#div_proc_m').remove();str_cb;},2000)
	}
	else
	{
		$('#txt_proc').html(str_txt)
		$('#proc_my').width(str_txt)
	}
}
function ShowProcess(str_func)//显示等待
{
	$('#div_content').append('<div id="div_load" style="top:0;left:0;z-index:20001;" class="div_bg_a" align="center"><div style="height:30vh"></div><img src="css/img/loading.gif" /></div>');
	$('#div_load').fadeIn(500);
	var obj_back=eval(str_func);
	setTimeout(function(){$('#div_load').remove();},500);
	return obj_back;
}
function ShowTips(str_tname,str_tit,str_cont,str_callback)//自定义弹框
{
	var str_obj="$('#"+str_tname+"').remove();"+str_callback;
	$('body').append('<div id="'+str_tname+'" class="div_pop" style="display:block;z-index:30000;"><div id="'+str_tname+'_bg" style="position:fixed;height:12em;width:60vw;left:20vw;top:40vh;background:#FFF;color:#000;text-align:center;"><div id="'+str_tname+'_top"  style="width:100%;height:20%;background:#3385FF;color:#fff;line-height:2;">'+str_tit+'</div><div style="padding:2em 1em 1em 1em;">'+str_cont+'</div><input type="button" value="确定" onclick="'+str_obj+'" style="width:30%;font-size:4vw;padding:10px;" /></div></div>');
}
function CreateAjaxUpload(obj_parent,str_upobj_name,str_valobj_name,str_up_url,str_callback)//新建上传控件
{
	obj_parent.append('<form id="fm_uplaod'+str_upobj_name+'" action="'+str_up_url+'" enctype="multipart/form-data" method="post" target="frm_uplaod'+str_upobj_name+'"><iframe name="frm_uplaod'+str_upobj_name+'" style="display:none"></iframe><input type="file" id="'+str_upobj_name+'" name="'+str_upobj_name+'" onchange="'+"$('#div_load').show();$('#fm_uplaod"+str_upobj_name+"').submit();"+'"><input type="hidden" name="inp_valobj_name" value="'+str_valobj_name+'"><input type="hidden" id="'+str_valobj_name+'"><input type="hidden" name="inp_upobj_name" value="'+str_upobj_name+'"><input type="button" style="display:none;" id="btn_callback_'+str_upobj_name+'" onclick="'+str_callback+'" /></form>');
}
function GetRank(arr_conf)
{
	var div_list=$('body').append('<div id="div_list" class="div_pop"><div style="margin:auto;width:90%;height:85vh;overflow:auto;"><div style="height:5vh"></div><table id="tb_list"></table></div><div class="div_btn_wx" onClick="'+"$('#div_list').slideUp(function(){$('#div_list').remove()})"+'">返回</div></div>');
	
	$('#div_list').slideDown();
	$('#div_load').show();console.log(arr_conf.token)
	GetData_ajax_async(arr_conf.getData_url,'list',arr_conf.tb_u,'*','and token="'+arr_conf.token+'" group by opid order by CONVERT(email,SIGNED) DESC','',function(data)
	{
		$('#div_load').hide();
		if(data==null)return false;
		$("#tb_list").html('<tr class="tr_list2"><td>排名</td><td>昵称</td><td>姓名</td><td>电话</td><td>分数</td><td>opid</td></tr>');//<td>头像</td>
		$.each(data,function(k,v)
		{
			$("#tb_list").append('<tr class="tr_list1"><td>'+(k+1)+'</td><td>'+decodeURIComponent(v.nickname)+'</td><td>'+v.uname+'</td><td>'+v.phone+'</td><td>'+v.email+'</td><td>'+v.opid+'</td></tr>');//<td width="20%" align="center"><img src="'+v.headimgurl+'" width="50%" /></td>
		})
	})
}
function GetRank1(arr_conf)
{
	var div_list=$('body').append('<div id="div_list" class="div_pop"><div style="margin:auto;width:90%;height:85vh;overflow:auto;"><div style="height:5vh"></div><table id="tb_list"></table></div><div class="div_btn_wx" onClick="'+"$('#div_list').slideUp(function(){$('#div_list').remove()})"+'">返回</div></div>');
	
	$('#div_list').slideDown();
	$('#div_load').show();
	GetData_ajax_async(arr_conf.getData_url,'list',arr_conf.tb_u,'*','and token="'+arr_conf.token+'" and email<>"" and email is not null group by opid order by CONVERT(email,SIGNED) DESC limit 30','',function(data)
	{
		$('#div_load').hide();
		if(data==null)return false;
		$("#tb_list").html('<tr class="tr_list2"><td>排名</td><td>头像</td><td>昵称</td><td>分数</td></tr>');
		$.each(data,function(k,v)
		{
			$("#tb_list").append('<tr class="tr_list1"><td>'+(k+1)+'</td><td width="20%" align="center"><img src="'+v.headimgurl+'" width="50%" /></td><td>'+decodeURIComponent(v.nickname)+'</td><td>'+v.email+'</td></tr>');
		})
	})
}
function GetRank_ex(arr_data,str_token,cb)
{
	var div_list=$('body').append('<div id="div_list" class="div_pop"><div style="margin:auto;width:90%;height:85vh;overflow:auto;"><div style="height:5vh"></div><table id="tb_list"></table></div><div class="div_btn_wx" onClick="'+"$('#div_list').slideUp(function(){$('#div_list').remove()})"+'">返回</div></div>');
	
	$('#div_list').slideDown();
	$('#div_load').show();
	var str_fields=arr_data[0][0]
	$.each(arr_data[0],function(k,v){if(k!=0)str_fields+=','+v})
	GetData_ajax_async(arr_conf.getData_url,'list','wx_users',str_fields,'and token="'+str_token+'" group by opid order by CONVERT(email,SIGNED) DESC','',function(data)
	{
		$('#div_load').hide();
		if(data==null)return false;
		var str_tit=''
		$.each(arr_data[1],function(k,v){str_tit+='<td>'+v+'</td>'})//'<td></td><td></td><td></td><td></td><td></td><td>opid</td></tr>'
		$("#tb_list").html('<tr class="tr_list2">'+str_tit+'</tr>');
		str_tit=''
		$.each(data,function(k,v)
		{
			str_tit+='<tr class="tr_list1">'
			$.each(arr_data[0],function(i,j){str_tit+='<td>'+decodeURIComponent(v[i])+'</td>'})
			str_tit+='</tr>'
		})
		$("#tb_list").append(str_tit)
		
		cb()
	})
}
function AddAud(i_aud,str_mus,is_play)//添加音乐控件
{
	
	var str_h='<div class="div_ad" onclick="SetAud()"><audio id="aud_'+i_aud+'" src="'+str_mus+'" loop preload></audio></div><script>function SetAud(){if($(".div_ad").hasClass("div_audio")){aud_'+i_aud+'.pause();$(".div_ad").removeClass("div_audio")}else{aud_'+i_aud+'.play();$(".div_ad").addClass("div_audio")}}</script>'
	$('body').append(str_h)
	if(is_play){$(".div_ad").addClass("div_audio");AutoPlay_IOS('aud_'+i_aud);}
}
function AutoPlay_IOS(str_obj)
{
	var aud_1=document.getElementById(str_obj)
	document.addEventListener("WeixinJSBridgeReady", function(){aud_1.play()},false)
}
/////page code end//////
//Check Code
function SetNumLoop(i_cur,i_len,i_direc)
{
	var i;
	if(i_direc>=0)for(i=0;i<i_direc;i++)
	{
		if(i_cur==(i_len-1))i_cur=0;
		else i_cur++;
	}
	else for(i=0;i>i_direc;i--)
	{
		if(i_cur==0)i_cur=i_len-1;
		else i_cur--;
	}
	return i_cur;
}
function LimitLen(obj,len)//限制长度
{
	if(obj.val().length>len)
	{
		alert('超过“'+len+'”个字的限制，请修改！');
		obj.focus();
		return false;
	}else return true;
}
function CheckNull(obj,str_name)//判断是否为空
{
	var str_c=obj.val().trim()
	if(obj.val()=='')
	{
		alert('“'+str_name+'”不能留空！');
		obj.focus();
		return false;
	}else return true;
}
function CheckMemo(obj,i_min,i_max,str_obj_tit)//检查控件长度，在i_min和i_max之间
{
	if(obj.val().length<i_min||obj.val().length>i_max)
	{
		var str_ale='“'+str_obj_tit+'”输入请介于'+i_min+'到'+i_max+'个字之间！';
		if(obj.val().length>i_max)str_ale+='(已超出'+(obj.val().length-i_max)+'个字)';
		alert(str_ale);
		obj.focus();
		return false;
	}else return true;
}
function CheckSafeStr(obj,str_name)//判断是否为安全字符
{
	if(!checkQuote(obj.val()))
	{
		alert('请正确填写“'+str_name+'”，不能为空，或包含有非法字符！');
		obj.focus();
		return false;
	}else return true;
}
function checkMobile(s)//手机号验证
{
	return /^(1[3,4,5,7,8][0-9])\d{8}$/.test(s);
}
function checkPhone(strPhone)//座机号验证
{ 
    var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/; 
    var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/; 
    //var prompt = "您输入的电话号码不正确!" 
    if (strPhone.length > 9)
	{ 
        if (phoneRegWithArea.test(strPhone))return true; 
        else return false; 
    }
	else
	{ 
        if (phoneRegNoArea.test(strPhone))return true; 
        else return false;
    }
} 
function checkIDCard(str)//身份证验证
{
    var arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//15位数身份证正则表达式 
    var arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;//18位数身份证正则表达式 
    if (str.match(arg1) == null && str.match(arg2) == null) return false; 
    else return true; 
} 
function checkQuote(str)//特殊字符验证
{ 
    var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")"); 
    items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//",',','.','"'); 
    //items.push("admin", "administrators", "administrator", "管理员", "系统管理员");//系统预留名称
    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate"); //SQL注入关键字
    str = str.toLowerCase();
    for (var i = 0; i < items.length; i++)if (str.indexOf(items[i]) >= 0)return false;
    return true; 
} 
function checkEmail(strEmail)//Email验证
{ 
	//var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 
	var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/; 
	if( emailReg.test(strEmail) )return true; 
	else return false; 
} 
function isInteger( str )//整数验证
{
	var regu = /^[-]{0,1}[0-9]{1,}$/; 
	return regu.test(str); 
} 
function isNumber( s )//正整数验证
{
	var regu = "^[1-9]+$";
	var re = new RegExp(regu);
	if (s.search(re) != -1)return true;
	else return false;
} 
function isDecimal( str )//正浮点数验证
{ 
	//if(isNumber(str)) return true;
	//var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
	var re=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	if (re.test(str))
	{ 
		if(RegExp.$1==0&&RegExp.$2==0)return false; 
		return true;
	}
	else return false;
}
function CheckChinese(str_check)//中文验证
{
	return /^[\u4e00-\u9fa5]+$/gi.test(str_check);
}
function IsChinese( s )//中文验证
{
	//var regu = "^\s*$|^[\u4e00-\u9fa5]+$";//可以为空值
	var regu = "^[\u4e00-\u9fa5]+$";
	var re = new RegExp(regu); 
	if (re.test(s)) return true; 
	else return false;
}
function isEnglish(s)//英文验证
{
	//var regu = "^\s*$|^[a-zA-Z]+$"; //可以为空值
	var regu = "^[a-z A-Z]+$"; 
	var re = new RegExp(regu); 
	if (re.test(s)) return true; 
	else return false;
}
function isSafeStr( s )//判断是否为空且是汉字、字母、数字组成
{
	//var regu = "^\s*$|^[0-9a-zA-Z\u4e00-\u9fa5]+$"; //可以为空值
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
	var re = new RegExp(regu); 
	if (re.test(s))return true; 
	else return false; 
} 
function isSafeStrSe(s,m)//判断是否为空且汉字、字母、数字、中文字符组成
{
	var regu;
	switch(m)
	{
		case 1:
			regu = "^\s*$|^[0-9a-zA-Z\u4e00-\u9fa5\uFF00-\uFFFF]+$"; //可以为空值
		break;
		case 2:
			regu = "^[0-9a-zA-Z\u4e00-\u9fa5\uFF00-\uFFFF]+$";//不可为空
		break;
		default:
			regu = "^[0-9a-zA-Z\u4e00-\u9fa5\uFF00-\uFFFF]+$";//默认不可为空
	}
	var re = new RegExp(regu); 
	if (re.test(s))return true; 
	else return false; 
}
function IdentityCodeValid(code)
{
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var tip = "";
	var pass= true;

	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){tip = "身份证号格式错误";pass = false;}
	else if(!city[code.substr(0,2)]){tip = "地址编码错误";pass = false;}
	else
	{
		if(code.length == 18)//18位身份证需要验证最后一位校验位
		{
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];//加权因子
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];//校验位
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++)
			{
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]){tip="校验位错误";pass =false;}
		}
	}
	return tip;
}
//Check Code End
function ListenFunc(str_end,i_delay,cb){var siv_1=setInterval(function(){if(eval(str_end)){cb();clearInterval(siv_1);return false;}},i_delay)}