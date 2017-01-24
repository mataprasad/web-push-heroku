<?php
//next example will insert new conversation
$service_url = 'http://web-push.apphb.com/ajax.aspx/settoken';
$curl = curl_init($service_url);
$curl_post_data = array(
        'token' => 'test message'
);
$str_json = file_get_contents('php://input');
echo 'str_json'.$str_json;
echo 'token'.$_POST['token'];
echo '--data--'.$_POST['data'];
$data = array("token" => "Hagrid");                                                                    
$curl_post_data = json_encode($data); 
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json',));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
$curl_response = curl_exec($curl);
if ($curl_response === false) {
    $info = curl_getinfo($curl);
    curl_close($curl);
    die('error occured during curl exec. Additioanl info: ' . var_export($info));
}
curl_close($curl);
$decoded = json_decode($curl_response);
if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
    die('error occured: ' . $decoded->response->errormessage);
}
echo 'response ok!';
var_export($decoded);
?>
