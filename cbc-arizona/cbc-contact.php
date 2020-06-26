<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="assets/favicon.png">

    <title>Contact Form Error - CBC Arizona</title>
	<link rel="stylesheet" href="css/main.css" type="text/css">
</head>

<?php

        $email;$comment;$captcha;
        if(isset($_POST['email'])){
          $email=$_POST['email'];
        }if(isset($_POST['comment'])){
          $email=$_POST['comment'];
        }if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(!$captcha){
          echo '<div class="captchaerror"><strong>Please complete the captcha form.</strong><br/><a href="javascript:history.back()">Go Back</a></div>';
          exit;
        }
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Leo4xcTAAAAAAADBFHPNfcTlcmlwakMjZgwqkB3&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
       /* if($response.success==true)            
        {
          echo '<p>Thanks for posting comment.</h2>';
        } */
?>

<?php

$EmailFrom = "CBC Arizona website";
$EmailTo = "vince@cbcarizona.com"; //cbcarizona99@gmail.com
$Subject = "cbcarizona.com form submission";
$Name = Trim(stripslashes($_POST['Name']));  
$Phone = Trim(stripslashes($_POST['Phone'])); 
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message'])); 
$headers = 'From: vince@cbcarizona.com' . "\r\n" .
'Reply-To: vince@cbcarizona.com' . "\r\n" .
'X-Mailer: PHP/' . phpversion();

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email Address: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $Phone;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";


// send email 
$success = mail($EmailTo, $Subject, $Body, $headers);

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks.php#thanks\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>