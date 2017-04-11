<?php

$cookie_name = "voted";
$cookie_value = true;

if(!isset($_COOKIE[$cookie_name])) {
    
    //set the cookie   
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
    
   $Poll = strtolower(Trim(stripslashes($_POST['radio'])));

    $data = file_get_contents('data.json');
    if (!$data){
      header('Location: error.html');
    }

    $array = json_decode($data,true);

    $array[$Poll] = $array[$Poll]+1;

    $array['lastupdate'] = date('n/j/Y @ g:ia T');

    if (!file_put_contents('data.json', json_encode($array))){
      header('Location: error.html');
    }else{
      header('Location: thanks.html');
    } 
}
else
{
    header('Location: error.html');
}


?>