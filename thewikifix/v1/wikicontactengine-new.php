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
$Body .= "For OneNote:";
$Body .= "\n";
$Body .= $Fact;
$Body .= " -- ";
$Body .= $Source;
$Body .= "\n";
$Body .= "\n";
$Body .= "For Javascript:";
$Body .= "\n";
$Body .= $Topic;
$Body .= "FactsList[#]=\"";
$Body .= $Fact;
$Body .= "<sup><a href='";
$Body .= $Source;
$Body .= "' target='_blank'>[1]</a></sup>\";";


// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=wikicontactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>