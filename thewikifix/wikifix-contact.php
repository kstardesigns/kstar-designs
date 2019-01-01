<?php

$EmailFrom = "The WikiFix";
$EmailTo = "thewikifix@gmail.com";
$Subject = "Fact submission";
$Name = Trim(stripslashes($_POST['Name'])); 
$Source = Trim(stripslashes($_POST['Source'])); 
$Fact = Trim(stripslashes($_POST['Fact'])); 
$Topic = Trim(stripslashes($_POST['Topic'])); 

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
$Body .= "Source: ";
$Body .= $Source;
$Body .= "\n";
$Body .= "Fact: ";
$Body .= $Fact;
$Body .= "\n";
$Body .= "Topic: ";
$Body .= $Topic;
$Body .= "\n";
$Body .= "\n";
$Body .= "For Javascript:";
$Body .= "\n";
$Body .= $Topic;
$Body .= "FactsList[#]=\"";
$Body .= $Fact;
$Body .= "\" + (source('1','";
$Body .= $Source;
$Body .= "'));";
$Body .= "\n";
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=wikifix-thanks.php#submitfact\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>