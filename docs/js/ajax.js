
  var common_ip = "http://127.0.0.1:17001";
  var common_type = 'get';


// -----------------------lefttop-------------------------------------------------------------------
  var left_top_url = '/iot-main/iot-portal/rest/iotDeviceT/queryDeviceNum';
   left_topAjax(common_type,common_ip,left_top_url);//left_top 
// -----------------------lefttop------------------------------------------------------------------


// -----------------------leftmid-------------------------------------------------------------------
  var leftmid_url = "/iot-main/iot-portal/rest/iotDeviceT/deviceTypeSum/";
  left_midAjax(common_type,common_ip,leftmid_url)
// -----------------------leftmid-------------------------------------------------------------------


// ------------------------left_bottom---------------------------------------------------------------
  var left_bottom_url = "/iot-main/iot-portal/rest/iotDeviceT/deviceInteractSum/";
  leftbottom_ajax(common_type,common_ip,left_bottom_url)
// ------------------------left_bottom---------------------------------------------------------------



// ------------------------right_top---------------------------------------------------------------
//   var right_top_url = "/iot-main/iot-portal/rest/iotDeviceT/deviceInteractSum/";
//   right_top_ajax(common_type,common_ip,right_top_url)
// ------------------------right_top---------------------------------------------------------------
// 

// ------------------------right_mid---------------------------------------------------------------
  var right_mid_url = "/iot-main/iot-portal/rest/iotSumshorttime/tslCount";
  right_mid_ajax(common_type,common_ip,right_mid_url)
// ------------------------right_mid---------------------------------------------------------------


// ------------------------right_bottom---------------------------------------------------------------
  var right_bottom_url = "/iot-main/iot-portal/rest/iotSumshorttime/statCount";
  right_bottomAjax(common_type,common_ip,right_bottom_url)
// ------------------------right_bottom---------------------------------------------------------------