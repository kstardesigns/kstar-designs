<?php
session_start();
include('configdb.php');
include('system.php');

$display = array(
  'title' => '',
  'stringname' => '',
  'doesit' => '',
  'type' => '',
  'byline' => '',
  'year' => '',
  'eyebrow' => '',
  'droptime' => '',
  'quote' => '',
  'cite' => '',
  'tags' => '',
  'date' => ''
);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  foreach($_POST as $key => $value){
      if(isset($display[$key])){
          $display[$key] = htmlspecialchars($value);
      }
  }
}

if(isset($_POST['submit1']))
{
 //whether the username is blank

 if($_POST['title'] == '')
 {
  $message = $message."Title is required.<br/>";
  
 }

 if($_POST['stringname'] == '')
 {
  $message = $message."String name is required.<br/>";
  
 }

 if($_POST['doesit'] == '')
 {
  $message = $message."Does it drop? is required.<br/>";
  
 }

 if($_POST['type'] == '')
 {
  $message = $message."Type is required.<br/>";
  
 }


 if($_POST['tags'] == '')
 {
  $message = $message."Tags are required.";
  
 }
 
 //if the error exist, we will go to registration form
 if(isset($message))
 {
  /*header("Location: index.php");
  exit;*/
 }
 else
 {

  $title = mysqli_real_escape_string($mysqli,test_input($_POST['title']));
  $stringname = mysqli_real_escape_string($mysqli,test_input($_POST['stringname']));
  $byline = mysqli_real_escape_string($mysqli,test_input($_POST['byline']));
  $year = mysqli_real_escape_string($mysqli,test_input($_POST['year']));
  $doesit = mysqli_real_escape_string($mysqli,test_input($_POST['doesit']));
  $type = mysqli_real_escape_string($mysqli,test_input($_POST['type']));
  $eyebrow = mysqli_real_escape_string($mysqli,test_input($_POST['eyebrow']));
  $droptime = mysqli_real_escape_string($mysqli,test_input($_POST['droptime']));
  $quote = mysqli_real_escape_string($mysqli,test_input($_POST['quote']));
  $cite = mysqli_real_escape_string($mysqli,test_input($_POST['cite']));
  $tags = mysqli_real_escape_string($mysqli,test_input($_POST['tags']));
  $date = mysqli_real_escape_string($mysqli,test_input($_POST['date']));
//   $email = test_input($_POST['email']);
//   $email = mysqli_real_escape_string($mysqli,$email);
  
  $sql2 = "INSERT INTO items (Date, Title, Stringname, Byline, Year, Does_It, Type, Eyebrow, Drop_Time, Quote, Cite, Tags) VALUES ('$date', '$title', '$stringname', '$byline', '$year', '$doesit', '$type', '$eyebrow', '$droptime', '$quote', '$cite', '$tags')";
  $result2 = mysqli_query($mysqli,$sql2) or die(mysqli_error($mysqli));

  if($result2)
  {
    print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks.html\">";

  }
   
  }
 
}
?>	