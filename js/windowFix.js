var i_w_h=$(window).height();
var i_w_w=$(window).width();
var i_d_h=$(window).scrollTop();
var i_d_w=$(window).scrollLeft();
function SetWH(str_obj)
{
	$('#'+str_obj).width(i_w_w);
	$('#'+str_obj).height(i_w_h);
}

function SetDH(str_obj)
{
	$('#'+str_obj).width(i_d_w);
	$('#'+str_obj).height(i_d_h);
}

function GetDeviceType()
{
	var arr_types = new Array("Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod");
	var str_ua = navigator.userAgent;
	var is_pc=true;
	for(var i=0;i<arr_types.length;i++)
	{
		if(str_ua.indexOf(arr_types[i])>0)is_pc=false;
	}
	if(is_pc)return 'pc';
	else return 'phone'
}
function GetPhoneType()
{
	var arr_types = new Array("Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod");
	var str_ua = navigator.userAgent;
	var str_type='';
	for(var i=0;i<arr_types.length;i++)
	{
		if(str_ua.indexOf(arr_types[i])>0)str_type=arr_types[i];
	}
	if(str_type=='')str_type='pc';
	return str_type;
}