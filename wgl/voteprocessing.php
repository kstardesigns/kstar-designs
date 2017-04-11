<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="assets/favicon.png">

    <title>Who Got Lucille'd?</title>
	<link rel="stylesheet" href="css/main.css" type="text/css">
</head>

<?php

$EmailFrom = "Who got Lucille'd?";
$EmailTo = "whogotlucilled@gmail.com"; 
$Poll = Trim(stripslashes($_POST['radio'])); 
$Subject = "Vote: ";
$Subject .= $Poll; 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Vote: ";
$Body .= $Poll;


// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
}
?> 