<?php
    //Database vars
    $hostname="localhost";
    $username="kstark";
    $password="SarahC08!";
    $dbname="titledrops";

    $mysqli = mysqli_connect($hostname, $username, $password);
    mysqli_select_db($mysqli, $dbname) or die(mysqli_error($mysqli));
?>

