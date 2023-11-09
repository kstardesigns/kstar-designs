<?php ini_set('display_errors', '1'); ?>  
<?php
	
	//Database vars
	$hostname="localhost";
	$username="kstark";
	$password="SarahC08!";
	$dbname="titledrops";
	$usertable="items";
    $droptime = "Drop_Time";
    $title = "Title";
    $eyebrow = "Eyebrow";
    $byline = "Byline";
    $quote = "Quote";
    $cite = "Cite";
    $stringname = "Stringname";
    $doesit = "Does_It";
    $type = "Type";
    $year = "Year";
    $tags = "Tags";
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    $dropsperpage = 13;
    
    $con = mysqli_connect($hostname, $username, $password);
    mysqli_select_db($con, $dbname) or die(mysqli_error($con));

    $querytag = $_SERVER['QUERY_STRING'];

    $fullquery = "SELECT * FROM $usertable";
    $fullresults = mysqli_query($con, $fullquery);
    $fullresultscount = mysqli_num_rows($fullresults);
    $fullpagecount = intdiv($fullresultscount, $dropsperpage) + 1;
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Title drop: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it though? Use this very useful website to find out!">

	<title>Title Drops - TV shows, movies, and music!</title>
    <!-- generics -->
    <link rel="shortcut icon" href="assets/favicon.png"> 
    <link rel="icon" href="assets/favicon-32.png" sizes="32x32">
    <link rel="icon" href="assets/favicon-128.png" sizes="128x128">
    <link rel="icon" href="assets/favicon-192.png?d=33021" sizes="192x192">

    <!-- Android -->
    <link rel="shortcut icon" sizes="196x196" href="assets/favicon-196.png?d=33021">

    <!-- iOS -->
    <link rel="apple-touch-icon" href="assets/favicon-152.png?d=33021b" sizes="152x152">
    <link rel="apple-touch-icon" href="assets/favicon-180.png?d=33021" sizes="180x180">
	<link rel="apple-touch-icon-precomposed" href="assets/touch-icon.jpg?d=33021">

    <!-- Windows 8 IE 10-->
    <meta name="msapplication-TileColor" content="#00488a">

    <meta itemprop="name" content="Title Drops">
    <meta itemprop="description" content="Title drop: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it though? Use this very useful website to find out!">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Title Drops">
    <meta name="twitter:description" content="Title drop: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it though? Use this very useful website to find out!">
    <meta name="twitter:site" content="@kstardesigns">
    <meta name="twitter:creator" content="@kstardesigns">
    <meta name="twitter:image" content="https://titledrops.com/assets/twitter-card.jpg?d=1202" class="twitter-image">
    <meta name="twitter:image:alt" content="Screenshot of the Title Drops site showing the title drop for Bob's Burgers">
    <meta property="og:title" content="Title Drops">
    <meta propertyname="og:description" content="Title drop: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it though? Use this very useful website to find out!">
    <meta property="og:url" content="https://titledrops.com">
    <meta property="og:image" content="http://titledrops.com/assets/facebook-share.jpg">
    <meta property="og:site_name" content="Title Drops">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="entry-page">
<a href="#main-content" class="sr-only">Skip to content</a>
<header>
    <h1 class="logo-wrap">
        <a class="home-link" href="/" title="Home">
            <svg class="td-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.56 61.1">
            <title>title drops</title>
            <defs><style>.cls-1{fill:#00a3d9;}</style></defs>
            <path class="cls-1" d="M10.67,41.19a5.94,5.94,0,0,1-4.4-1.57A6.61,6.61,0,0,1,4.7,34.78v-19H.7a.74.74,0,0,1-.5-.17.57.57,0,0,1-.2-.48v-1l4.76-.34.66-10a.81.81,0,0,1,.21-.45.63.63,0,0,1,.49-.19H7.36V13.75h8.77v2H7.36v18.9a5.79,5.79,0,0,0,.3,2A3.6,3.6,0,0,0,8.47,38a3.19,3.19,0,0,0,1.22.78A4.35,4.35,0,0,0,11.2,39a4.6,4.6,0,0,0,1.74-.29,8.2,8.2,0,0,0,1.26-.64,8.28,8.28,0,0,0,.86-.65,1,1,0,0,1,.54-.29.58.58,0,0,1,.44.28l.73,1.17a7.63,7.63,0,0,1-2.7,1.89A8.37,8.37,0,0,1,10.67,41.19Z"/><path class="cls-1" d="M27.66,3.28a2.11,2.11,0,0,1-.21.93,2.81,2.81,0,0,1-.54.77,2.52,2.52,0,0,1-.79.54,2.34,2.34,0,0,1-.95.19A2.37,2.37,0,0,1,23.44,5a2.44,2.44,0,0,1-.54-.77,2.24,2.24,0,0,1-.19-.93,2.46,2.46,0,0,1,.73-1.77A2.5,2.5,0,0,1,24.22,1a2.38,2.38,0,0,1,1-.2,2.34,2.34,0,0,1,.95.2,2.67,2.67,0,0,1,.79.53,2.82,2.82,0,0,1,.54.8A2.32,2.32,0,0,1,27.66,3.28Zm-1.17,9.6V40.74H23.83V12.88Z"/><path class="cls-1" d="M43.93,41.19a5.94,5.94,0,0,1-4.4-1.57A6.61,6.61,0,0,1,38,34.78v-19H34a.76.76,0,0,1-.5-.17.6.6,0,0,1-.2-.48v-1L38,13.72l.67-10a.75.75,0,0,1,.21-.45.6.6,0,0,1,.48-.19h1.25V13.75h8.76v2H40.63v18.9a5.8,5.8,0,0,0,.29,2A3.87,3.87,0,0,0,41.73,38a3.27,3.27,0,0,0,1.22.78,4.39,4.39,0,0,0,1.51.25,4.6,4.6,0,0,0,1.74-.29,8.2,8.2,0,0,0,1.26-.64,9.82,9.82,0,0,0,.87-.65,1,1,0,0,1,.53-.29.6.6,0,0,1,.45.28L50,38.58a7.54,7.54,0,0,1-2.7,1.89A8.34,8.34,0,0,1,43.93,41.19Z"/><path class="cls-1" d="M59.75,0V40.74H57.09V0Z"/><path class="cls-1" d="M80.11,12.43a11.53,11.53,0,0,1,4.35.81,9.89,9.89,0,0,1,3.47,2.37,11,11,0,0,1,2.3,3.82,15.2,15.2,0,0,1,.82,5.21,1.41,1.41,0,0,1-.18.84.68.68,0,0,1-.57.22H70.19v.54a19,19,0,0,0,.73,5.51,11.42,11.42,0,0,0,2.07,4,8.49,8.49,0,0,0,3.25,2.42A10.61,10.61,0,0,0,80.5,39a12.66,12.66,0,0,0,3.64-.47,13.12,13.12,0,0,0,4.25-2.07,1.85,1.85,0,0,1,.9-.46.64.64,0,0,1,.56.28l.73.9a7.46,7.46,0,0,1-1.78,1.56A12.9,12.9,0,0,1,86.34,40a18.07,18.07,0,0,1-2.92.83,16.33,16.33,0,0,1-3.12.3,13.33,13.33,0,0,1-5.21-1,11.07,11.07,0,0,1-4-2.9,13.26,13.26,0,0,1-2.61-4.66,20,20,0,0,1-.92-6.31,17.19,17.19,0,0,1,.86-5.53,12.7,12.7,0,0,1,2.46-4.37,11.22,11.22,0,0,1,4-2.87A13,13,0,0,1,80.11,12.43Zm0,2a10.38,10.38,0,0,0-3.86.67,8.44,8.44,0,0,0-3,1.93,9.77,9.77,0,0,0-2,3,13.24,13.24,0,0,0-1,3.95H88.65A12.21,12.21,0,0,0,88,20a8.62,8.62,0,0,0-1.73-3,7.54,7.54,0,0,0-2.69-1.89A8.82,8.82,0,0,0,80.15,14.42Z"/><path class="cls-1" d="M121.18,1V33.74c0,2.41.06,5.15.22,7H117l-.22-4.7h-.12a10,10,0,0,1-9.24,5.32c-6.55,0-11.59-5.55-11.59-13.78,0-9,5.55-14.56,12.15-14.56,4.15,0,7,2,8.18,4.14h.11V1Zm-4.93,23.69A8.52,8.52,0,0,0,116,22.6a7.25,7.25,0,0,0-7.11-5.72c-5.1,0-8.12,4.48-8.12,10.48,0,5.48,2.68,10,8,10A7.41,7.41,0,0,0,116,31.5a8.45,8.45,0,0,0,.22-2.13Z"/><path class="cls-1" d="M129.36,22.09c0-3.19-.06-5.93-.23-8.45h4.31l.17,5.32h.23c1.23-3.64,4.2-5.94,7.5-5.94a5.42,5.42,0,0,1,1.4.17v4.65a7,7,0,0,0-1.68-.17c-3.47,0-5.94,2.63-6.61,6.33a14,14,0,0,0-.22,2.29V40.74h-4.87Z"/><path class="cls-1" d="M171.64,27c0,10-6.95,14.4-13.5,14.4-7.34,0-13-5.38-13-13.95,0-9.07,5.93-14.39,13.44-14.39C166.37,13,171.64,18.68,171.64,27Zm-21.51.28c0,5.94,3.42,10.42,8.23,10.42s8.24-4.42,8.24-10.53c0-4.59-2.3-10.41-8.12-10.41S150.13,22.09,150.13,27.24Z"/><path class="cls-1" d="M177.85,22.48c0-3.47-.11-6.27-.22-8.84h4.42l.23,4.64h.11A10.65,10.65,0,0,1,192,13c6.55,0,11.48,5.54,11.48,13.78,0,9.74-5.94,14.56-12.32,14.56a9.5,9.5,0,0,1-8.34-4.26h-.12V54.77h-4.87Zm4.87,7.23a11.1,11.1,0,0,0,.23,2,7.59,7.59,0,0,0,7.39,5.77c5.21,0,8.23-4.25,8.23-10.47,0-5.43-2.85-10.08-8.06-10.08a7.87,7.87,0,0,0-7.45,6.1,8,8,0,0,0-.34,2Z"/><path class="cls-1" d="M209,35.7a12.94,12.94,0,0,0,6.5,2c3.58,0,5.26-1.79,5.26-4s-1.4-3.64-5-5c-4.87-1.73-7.17-4.42-7.17-7.67,0-4.37,3.53-7.95,9.36-7.95a13.47,13.47,0,0,1,6.66,1.68l-1.23,3.58a10.62,10.62,0,0,0-5.55-1.56c-2.91,0-4.53,1.68-4.53,3.69,0,2.24,1.62,3.25,5.15,4.59,4.7,1.8,7.11,4.15,7.11,8.18,0,4.76-3.69,8.12-10.13,8.12a15.46,15.46,0,0,1-7.62-1.85Z"/>
        </svg>

        </a>
        <button type="button" class="info-trigger">
            <span class="info-trigger-inner">i</span>
        </button>
    </h1>

    <nav class="nav-icons">
        <div class="search-area search-area--mobile-trigger">
        <button type="button" title="Search" class="nav-icon-search-mobile-button"><img class="nav-icon-search-mobile" src="assets/search.svg" alt="Search" /></button>
        </div>
        <div class="search-area search-area--desktop">
            <button type="button" title="Search" class="nav-icon-search-button"><img class="nav-icon-search" src="assets/search.svg" alt="Search" /></button>
            <form id="search-form">
                <label for="search-bar" class="sr-only">Search tags</label>
                <div class="form-flex">
                    <input class="search-bar" type="text" id="search-bar" tabindex="-1" />
                    <button type="button" title="Search" class="nav-icon-submit-button" tabindex="-1"><img class="nav-icon-submit" src="assets/long-arrow-right.svg" alt="" /></button>
                </div>  
            </form>
        </div>
        <a class="shuffle-link" title="Random!" href="?order=shuffle"><img class="nav-icon-dice" src="assets/dice.svg" alt="Dice" /></a>
        <button type="button" class="nav-icon-tags-button"><img class="nav-icon-tags" src="assets/nav-tags.svg" alt="Tags" /></button>
    </nav>
    <div class="information">
        <p><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/TitleDrop" class="info-link" target="_blank" title="Title drop on tvtropes.org" tabindex="-1">Title drop</a>: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it? Use this very useful website to find out!</p>
        <p>Click/tap the image to view the quote in which the title is used.</p>
        <?php
            echo "<p class='info-count'>💡 ".$fullresultscount." title drops</p>";
        ?>

    </div>
    <div class="header-tags">
    <?php
        $fullcounter = 0;
        $tagsarray = array();
        $typearray = array();
        $doesitarray = array();
        $yeararray = array();

        if($fullresults){
            
            while($row = mysqli_fetch_array($fullresults)){
                $trimmedTags = preg_replace("/\r|\n/", "", $row["$tags"]);
                $typeTags = $row["$type"];
                $doesitTags = $row["$doesit"];
                $yearTags = $row["$year"];

                $tagsarray[] = '"'.$trimmedTags.'"';
                $typearray[] = '"'.$typeTags.'"';
                $doesitarray[] = '"'.$doesitTags.'"';
                $yeararray[] = '"'.$yearTags.'"';
            }

            echo "<script>";
            echo "var tagRowList = [";
            echo $tagsarray = implode(",", $tagsarray);
            echo "];\n";
            echo "var typeRowList = [";
            echo $typearray = implode(",", $typearray);
            echo "];\n";
            echo "var doesitRowList = [";
            echo $doesitarray = implode(",", $doesitarray);
            echo "];";
            echo "var yearRowList = [";
            echo $yeararray = implode(",", $yeararray);
            echo "];";
            echo "</script>";
        }
    ?>
        <div class="search-area search-area--mobile">
            <img class="nav-icon-search-mobile" src="assets/search.svg" alt="" />
            <form id="search-form-mobile">
                <label for="search-bar-mobile" class="sr-only">Search tags</label>
                <div class="form-flex">
                    <input class="search-bar search-bar-mobile active" type="text" id="search-bar-mobile" />
                    <button type="button" title="Search" class="nav-icon-submit-mobile-button"><img tabindex="0" class="nav-icon-submit nav-icon-submit-mobile active" src="assets/long-arrow-right.svg" alt="" /></button>
                </div>  
            </form>
        </div>
        <div class="header-tags-list">
            <h2 class="header-tags-header">Filter by type:</h2>
            <div class="header-tags-list-main"></div>
            <h2 class="header-tags-header">Popular tags:</h2>
            <div class="header-tags-list-popular"></div>
            <h2 class="header-tags-header">Tags by year:</h2>
            <div class="header-tags-list-year"></div>
        </div>
    </div>
</header>


	
<?php
    //deliver results of entries based on queries in URL
    if (strpos($url,'order') !== false) { //check if url has order query, then display entries in order specified
        $queryformatted = str_replace('order=', '', $querytag);
        if ($queryformatted == 'shuffle') {
            $query = "SELECT * FROM $usertable ORDER BY RAND() LIMIT $dropsperpage";
        } else {
            $query = "SELECT * FROM $usertable ORDER BY Id DESC LIMIT $dropsperpage";
        }

    } else { //if url doesn't have order in it, check for page and tags

        //if url has page number, but not tags, start the general results at that page
        if (strpos($url,'page') !== false && strpos($url,'tags') == false) { 
            $pageno = str_replace('page=', '', $querytag);
            if (is_numeric($pageno)) { //page number is a number
                $startingdrop = $dropsperpage * ($pageno - 1);
                $query = "SELECT * FROM $usertable ORDER BY Id DESC LIMIT $startingdrop, $dropsperpage";
            } else {
                $query = "SELECT * FROM $usertable ORDER BY Id DESC LIMIT $dropsperpage";
            }

        //if url has tags, but not page number, search that tag
        } elseif (strpos($url,'page') == false && strpos($url,'tags') !== false) { 
            $queryformatted = str_replace('tags=', '', $querytag);
            $queryspaced = str_replace('-', ' ', $queryformatted);
            $query = "SELECT * FROM $usertable WHERE $tags LIKE '%$queryspaced%' OR $doesit LIKE '%$queryspaced%' OR $type LIKE '%$queryspaced%' OR $year LIKE '%$queryspaced%' OR $stringname LIKE '%$queryspaced%' ORDER BY Id DESC LIMIT $dropsperpage";
            $result = mysqli_query($con, $query);
            $numResults = mysqli_num_rows($result);
            $fulltagquery = "SELECT * FROM $usertable WHERE $tags LIKE '%$queryspaced%' OR $doesit LIKE '%$queryspaced%' OR $type LIKE '%$queryspaced%' OR $year LIKE '%$queryspaced%' OR $stringname LIKE '%$queryspaced%' ORDER BY Id DESC";
            $fulltagresult = mysqli_query($con, $fulltagquery);
            $fullNumResults = mysqli_num_rows($fulltagresult);
            echo "<div class='current-tag'>";
            echo "<span class='entry-tag ".$queryformatted."'>".$queryspaced." (".$fullNumResults.")"."</span><a class='cancel-tag' href='/' title='Remove tag'>×</a>";
            echo "</div>";

        //if url has tags AND pages, search that tag, starting at the page given
        } elseif (strpos($url,'page') !== false && strpos($url,'tags') !== false) { 
            parse_str($querytag, $output);
            $qpageno = $output['page'];
            $qtags = $output['tags'];
            $qtagsspaced = str_replace('-', ' ', $qtags);
            
            if (is_numeric($qpageno)) { //page number is a number
                $startingdrop = $dropsperpage * ($qpageno - 1);
                $query = "SELECT * FROM $usertable WHERE $tags LIKE '%$qtagsspaced%' OR $doesit LIKE '%$qtagsspaced%' OR $type LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $stringname LIKE '%$qtagsspaced%' ORDER BY Id DESC LIMIT $startingdrop, $dropsperpage";
            } else {
                $query = "SELECT * FROM $usertable WHERE $tags LIKE '%$qtagsspaced%' OR $doesit LIKE '%$qtagsspaced%' OR $type LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $stringname LIKE '%$qtagsspaced%' ORDER BY Id DESC LIMIT $dropsperpage";
            }

            $fulltagquery = "SELECT * FROM $usertable WHERE $tags LIKE '%$qtagsspaced%' OR $doesit LIKE '%$qtagsspaced%' OR $type LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $stringname LIKE '%$qtagsspaced%' ORDER BY Id DESC";
            $fulltagresult = mysqli_query($con, $fulltagquery);
            $fullNumResults = mysqli_num_rows($fulltagresult);
            echo "<div class='current-tag'>";
            echo "<span class='entry-tag ".$qtags."'>".$qtagsspaced." (".$fullNumResults.")"."</span><a class='cancel-tag' href='/' title='Remove tag'>×</a>";
            echo "</div>";
        }
        else { //if url has no page number, start at the beginning
            $query = "SELECT * FROM $usertable ORDER BY Id DESC LIMIT $dropsperpage";
        }
    }
    
    $result = mysqli_query($con, $query);
    $numResults = mysqli_num_rows($result);

//if there are no results from the query:
    //if url has page number, but not tags, and there are no results
    if ($numResults == 0 && strpos($url,'page') !== false && strpos($url,'tags') == false) { 
        echo "<p class='error-message'>There are not this many entries! Redirecting to last page...</p>";
        echo "<script type='text/javascript'>setTimeout(() => { window.location = history.back(); }, '3000');</script>";
    }
    //no search results found
    elseif ($numResults == 0) {
        echo "<p class='error-message'>No search results found! Check out the popular tags above, or sort by media type:</p>";
        echo '<div class="flex"><a class="entry-tag entry-tag-link main-tag tv-show" href="?tags=tv-show">tv show</a><a class="entry-tag entry-tag-link main-tag music" href="?tags=music">music</a><a class="entry-tag entry-tag-link main-tag movie" href="?tags=movie">movie</a></div>';
    }

    echo "<main id='main-content'>";
    echo "<div class='entries grid'>";
    
    if($result){
        while($row = mysqli_fetch_array($result)){
            echo "<section id='z".$row["$stringname"]."' class='entry ".$row["$doesit"]."'>";
            echo "<div class='entry-image-container' style='background-image: linear-gradient(30deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0) 50%), url(images/".$row["$stringname"].".jpg);' tabindex='0'>";
            
                echo "<div class='entry-front'>";
                    echo "<div class='entry-title'><span>".$row["$title"]."</span>";
                        if($row["$byline"] != '')
                        {
                        echo " <em class='entry-byline'>";
                        
                            if($row["$type"] == 'music') {
                                echo "by ";
                            }

                        echo $row["$byline"]."</em>";
                        }
                    echo "</div>";
                    echo "<div class='entry-first-drop'>".$row["$eyebrow"]."</div>";
                    echo "<div class='entry-drop-time'>".$row["$droptime"]."</div>";
                    echo "<div class='entry-front-tags'>";
                        echo "<a class='entry-tag-link entry-tag ".preg_replace('/\s+/', '-', $row["$type"])."' href='?tags=".preg_replace('/\s+/', '-', $row["$type"])."'>".$row["$type"]."</a>";
                        echo "<a class='entry-tag-link entry-tag ".$row["$doesit"]."' href='?tags=".$row["$doesit"]."'>".$row["$doesit"]."</a>";
                    echo "</div>";
                echo "</div>";

                
                echo "<div class='entry-back' style='display: none;'>";
                    echo "<button type='button' class='entry-back-toggler' title='Toggle quote/tags'><img class='entry-quote-icon active' src='assets/comments.svg' alt='View quote' /><img class='entry-tags-icon' src='assets/tags.svg' alt='View tags' /></button>";
                    echo "<div class='entry-back-cover'>";
                        echo "<div class='entry-back-inner'>";
                            if($row["$doesit"] != 'nope')
                            {
                                $taglessquote = strip_tags($row["$quote"]);
                                $amplessquote = str_replace("&amp;", "and", $taglessquote);
                                $amplesscite = str_replace("&amp;", "and", $row["$cite"]);
                                $twitterquote = str_replace("'", "’", $amplessquote);
                                echo "<blockquote class='entry-title-quote'><span>".nl2br($row["$quote"])."</span><cite class='entry-cite'>-".$row["$cite"];
                                echo "<a class='entry-twitter-share' title='Tweet this title drop' target='_blank' href='http://twitter.com/share?url=https%3A%2F%2Ftitledrops.com&amp;text=".str_replace("\n", "%0a", $twitterquote);
                                echo "%0a-".str_replace("'", "’", $amplesscite)."%0a&amp;hashtags=titledrops,".$row["$stringname"]."'><img class='entry-twitter-share' src='assets/twitter.svg' alt='Twitter bird' /></a>";
                                echo "</cite></blockquote>";
                            } else {
                                echo "<blockquote class='entry-title-quote'>Sorry, no title drops here!</blockquote>";
                            }
                            echo "<div class='entry-tags' style='display: none;'>".$row["$tags"].",".$row["$year"]."</div>";
                        echo "</div>";
                     echo "</div>";
                echo "</div>";
                
            echo "</div>";
            echo "</section>";
        }
    }

    echo "</div>";

    echo "<div class='page-navigation'>";
        if (strpos($url,'order') !== false) { //if an order is specified, show the shuffle button
            echo "<a class='page-navigation-button page-navigation-button--shuffle' href='?order=shuffle' title='Shuffle again!'><img src='assets/dice-white.svg' alt='' /> Shuffle again!</a>";
        } else { //otherwise show back and forward buttons
            //back button - if not on page 1, show it
            //if page is in url and tags is not
            if (strpos($url,'page') !== false && strpos($url,'tags') == false) { 
                $pageno = str_replace('page=', '', $querytag);
                if (is_numeric($pageno) && $pageno > 1) {
                    $back1page = ($pageno - 1);
                    $backurl = str_replace($pageno, $back1page, $url);
                    echo "<a class='page-navigation-button page-navigation-button--back' href='".$backurl."' title='Go back 1 page'><img src='assets/backward.svg' alt='' /> Back</a>";
                }
            }
            //if page and tags are in url
            elseif(strpos($url,'page') !== false && strpos($url,'tags') !== false) {
                if (is_numeric($qpageno) && $qpageno > 1) {
                    $qback1page = ($qpageno - 1);
                    //using regex to only update last instance of page #
                    //for queries like https://titledrops.com/?tags=2017&page=2 where it would change to tags=1017&page=1
                    $qbacklastpageno = "~".$qpageno."(?!.*".$qpageno.")~";
                    $qbackurl = preg_replace($qbacklastpageno, $qback1page, $url);
                    echo "<a class='page-navigation-button page-navigation-button--back' href='".$qbackurl."' title='Go back 1 page'><img src='assets/backward.svg' alt='' /> Back</a>";
                }
            }

            //forward button - if not on last page, show it
            //if page is in url and tags is not
            if (strpos($url,'page') !== false && strpos($url,'tags') == false) { 
                $pageno = str_replace('page=', '', $querytag);
                $forward1page = ($pageno + 1);
                $forwardurl = str_replace($pageno, $forward1page, $url);

                //if it's not the last page (including partial page) 
                if (($pageno < $fullpagecount) && (($fullresultscount / $dropsperpage) != $pageno) && $numResults == $dropsperpage) {
                    echo "<a class='page-navigation-button page-navigation-button--forward' href='".$forwardurl."' title='Go forward 1 page'>Next <img src='assets/forward.svg' alt='' /></a>";
                }
            } 
            //if tags is in url and page is not
            elseif (strpos($url,'page') == false && strpos($url,'tags') !== false) { 
                $fulltagquery = "SELECT * FROM $usertable WHERE $tags LIKE '%$queryspaced%' OR $doesit LIKE '%$queryspaced%' OR $type LIKE '%$queryspaced%' OR $year LIKE '%$queryspaced%' OR $stringname LIKE '%$queryspaced%' ORDER BY Id DESC";
                $fulltagresult = mysqli_query($con, $fulltagquery);
                $fullNumResults = mysqli_num_rows($fulltagresult);
                $qpagecount = intdiv($fullNumResults, $dropsperpage) + 1;
                $qforwardurl = $url."&page=2";
                $qpageno = 1;

                if (($qpageno < $qpagecount) && (($fullNumResults / $dropsperpage) != $qpageno) && $numResults == $dropsperpage) {
                    echo "<a class='page-navigation-button page-navigation-button--forward' href='".$qforwardurl."' title='Go forward 1 page'>Next <img src='assets/forward.svg' alt='' /></a>";
                }
            }

            //if page and tags are in url
            elseif(strpos($url,'page') !== false && strpos($url,'tags') !== false) {
                $fulltagquery = "SELECT * FROM $usertable WHERE $tags LIKE '%$qtagsspaced%' OR $doesit LIKE '%$qtagsspaced%' OR $type LIKE '%$qtagsspaced%' OR $year LIKE '%$qtagsspaced%' OR $stringname LIKE '%$qtagsspaced%' ORDER BY Id DESC";
                $fulltagresult = mysqli_query($con, $fulltagquery);
                $fullNumResults = mysqli_num_rows($fulltagresult);
                $qforward1page = ($qpageno + 1);
                $qpagecount = intdiv($fullNumResults, $dropsperpage) + 1;
                //using regex to only update last instance of page #
                //for queries like https://titledrops.com/?tags=2017&page=1 where it would change to tags=2027&page=2
                $qforwardlastpageno = "~".$qpageno."(?!.*".$qpageno.")~";
                $qforwardurl = preg_replace($qforwardlastpageno, $qforward1page, $url);

                if (($qpageno < $qpagecount) && (($fullNumResults / $dropsperpage) != $qpageno) && $numResults == $dropsperpage) {
                    echo "<a class='page-navigation-button page-navigation-button--forward' href='".$qforwardurl."' title='Go forward 1 page'>Next <img src='assets/forward.svg' alt='' /></a>";
                }

            }
            else {
                $pageno = 1;
                if (($pageno < $fullpagecount) && (($fullresultscount / $dropsperpage) != $pageno) && $numResults == $dropsperpage){
                    echo "<a class='page-navigation-button page-navigation-button--forward' href='?page=2' title='Go forward 1 page'>Next <img src='assets/forward.svg' alt='' /></a>";
                }
            }
        }
        

    echo "</div>";
    echo "</main>";
?>

<footer class="footer">
    <p class="created">Created by 
        <a class="footer-link" href="http://kylephx.com/" target="_blank">
            <img class="footer-logo" src="assets/kstardesigns.svg" alt="kstardesigns logo" />
        </a>
        <button type="button" class="footer-write-button" title="Contact me"><img class="footer-write" src="assets/comment.svg" alt="Speech bubble" /></button>
        <span class="contact">Got feedback or a title drop to submit?<br/> <a href="mailto:kyleastark@gmail.com?subject=Title Drops!" title="Email Kyle" tabindex="-1">Email</a> or <a href="https://twitter.com/kstardesigns" title="Twitter link" tabindex="-1" target="_blank">tweet</a> me.</span>
    </p>
</footer>

<script src="js/entry-scripts.js"></script>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-84222407-1', 'auto');
    ga('send', 'pageview');
</script>
</body>
</html>