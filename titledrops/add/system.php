<?php

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    //  $data = mysql_real_escape_string($data);
    $data = strip_tags($data);
    return $data;
}

?>
