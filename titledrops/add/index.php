<?php
include_once("submitting.php");
?>

<?php ini_set('display_errors', '1'); ?>  
<?php
	
	//Database vars
	$hostname="localhost";
	$username="kstark";
	$password="SarahC08!";
	$dbname="titledrops";
	$usertable="items";
    $stringname = "Stringname";
	
    $con = mysqli_connect($hostname, $username, $password);
    mysqli_select_db($con, $dbname) or die(mysqli_error($con));
	
	# Check If Record Exists
	
	$query = "SELECT * FROM $usertable";
	
	$result = mysqli_query($con, $query);
	$numResults = mysqli_num_rows($result);
    $counter = 0;

	if($result){
        echo "<script>";
        echo "var titleList = [";
		while($row = mysqli_fetch_array($result)){
            if (++$counter == $numResults) {
                echo "'".$row["$stringname"]."'"; //last row
            } else {
                echo "'".$row["$stringname"]."',";
            }
        }
        echo "];";
        echo "</script>";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Title drop: when a TV show, movie, or other media mentions its own title in a line of dialogue. How many and which ones do it though? Use this very useful website to find out!">
    
    <title>Title Drops</title>
    <link rel="shortcut icon" href="../assets/favicon.png"> 
    <!--<link rel="apple-touch-icon-precomposed" href="assets/touchicon-152.png"> -->
    <link rel="stylesheet" href="../css/styles.css"> 
</head>

    <body class="submission-page">
    <header>
        <h1>Add a TD</h1>
    </header>
    <?php ini_set('display_errors', '1'); ?>  
    <div class="note">
        <?php if(isset($message)) echo "<p>". $message . "</p>"; ?>
    </div>
        <form action="" method="post" autocomplete="off">
                <div class="inner">
                    <fieldset class="full">
                        <label for="title" class="label">Title <span>(ex: <em>Veronica Mars</em>, <em>Camp</em>, <em>Game Night</em>)</span></label>
                        <div class="flex">
                            <input type="text" id="title" name="title" class="form-field" value="<?php echo $display['title']; ?>"/><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset class="full">
                        <label for="stringname" class="label">String name <span>(used as image name and url)</span></label>
                        <div class="flex">
                            <input type="text" tabindex="-1" id="stringname" pattern="[a-z0-9]+" title="Lowercase letters and numbers only" name="stringname" class="form-field form-field--stringname" value="<?php echo $display['stringname']; ?>"/><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                        <div id="image-preview-area" class="image-preview-area">
                            <p id="image-preview-message" class="image-preview-message bad">Image with this string name doesn't exist</p>
                        </div>
                    </fieldset>

                    <fieldset class="half">
                        <div class="flex">
                            <label for="doesit" class="label label--doesit">Does it title drop?</label>
                            <select id="doesit" name="doesit" class="form-field form-field--doesit" value="<?php echo $display['doesit']; ?>">
                                <option value="yep">Yep</option>
                                <option value="nope">Nope</option>
                                <option value="almost">Almost</option>
                            </select><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset class="half">
                        <div class="flex">
                            <label for="type" class="label label--type">Media type</label>
                            <select id="type" name="type" class="form-field form-field--type" value="<?php echo $display['type']; ?>">
                                <option value="tv show">TV Show</option>
                                <option value="movie">Movie</option>
                                <option value="music">Music</option>
                            </select><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset id="byline-question" class="half">
                        <label for="byline" class="label label--byline">Byline <span>(artist name if music type, year if TV show or movie with same title as another TV show/movie)</span></label>
                        <div class="flex">
                            <input type="text" id="byline" name="byline" class="form-field" value="<?php echo $display['byline']; ?>" /><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset id="year-question" class="half">
                        <label for="year" class="label label--year">Year <span>(year of pilot, release, premiere, etc.)</span></label>
                        <div class="flex">
                            <input type="text" id="year" name="year" class="form-field" value="<?php echo $display['year']; ?>" /><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset id="eyebrow-question" class="half">
                        <label for="eyebrow" class="label">Eyebrow <span>(can be custom if needed, updated automatically based on 2 dropdowns above)</span></label>
                        <div class="flex">
                            <input type="text" id="eyebrow" name="eyebrow" class="form-field form-field--eyebrow" value="First title drop:" value="<?php echo $display['eyebrow']; ?>"><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset class="half">
                        <label for="droptime" class="label">Drop Time <span>(updated automatically based on 2 dropdowns above - fill in X's)</span></label>
                        <div class="flex">
                            <input type="text" id="droptime" name="droptime" class="form-field form-field--droptime" value="<?php echo $display['droptime']; ?>"/><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset id="quote-question" class="full">
                        <label for="quote" class="label">Quote <span>(line breaks are accepted - put spaces before them, for Twitter share)</span></label>
                        <div class="flex">
                            <textarea type="text" id="quote" name="quote" class="form-field form-field--quote" value="<?php echo $display['quote']; ?>"></textarea><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset id="cite-question" class="full">
                        <label for="cite" class="label">Cite <span>(format for single character: <em>character name, "Title"</em>; multiple characters: <em>"Title"</em> [no quotes for movies])</span></label>
                        <div class="flex">
                            <input type="text" id="cite" name="cite" class="form-field" value="<?php echo $display['cite']; ?>" /><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                    </fieldset>

                    <fieldset class="full">
                        <label for="tags" class="label">Tags <span><strong>tv show</strong>: title, actors<br/><strong>movie</strong>: title, actors<br/><strong>music</strong>: album title, music artist, song features<br/>(comma separated; remove punctuation)</span></label>
                        <div class="flex">
                            <textarea id="tags" name="tags" class="form-field form-field--tags" value="<?php echo $display['tags']; ?>"></textarea><img class="validation-icon" src="../assets/times.svg" alt="" />
                        </div>
                        <div id="tag-list" class="tag-list">
                            <p>This entry will be tagged:</p>
                            <span id="type-tag" class="entry-tag"></span>
                            <span id="doesit-tag" class="entry-tag"></span>
                            <div id="additional-tags" class="additional-tags"></div>
                        </div>
                    </fieldset>

                    <input type="hidden" id="date" name="date" value="<?php echo $display['date']; ?>" />    
                    
                    <input type="submit" name="submit1" class="button" value="Submit" />

                </div>
            </form>	
            
            <script src="../js/form-scripts.js"></script>
    </body>
</html>