<?php

$EmailFrom = "Kelsie Stark website";
$EmailTo = "kyleastark@gmail.com"; /* test */
$Subject = "Website form submission";
$Name = Trim(stripslashes($_POST['Name']));  
$Phone = Trim(stripslashes($_POST['Interest'])); 
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message'])); 

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
$Body .= "Interested in: ";
$Body .= $Interest;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";


// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>