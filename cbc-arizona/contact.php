<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="assets/favicon.png">

    <title>Contact - CBC Arizona</title>
    <link href="css/main.css" rel="stylesheet">
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>

<nav>
	<a href="index.html"><img class="mobilenavlogo" src="assets/cbclogo-white.png" alt="Mobile Menu" /></a>
	<img class="menu" src="assets/menu.png" alt="Mobile Menu" />
		<ul class="main-nav">
			<li><a href="index.html"><img class="navlogo" src="assets/cbclogo-white.png" alt="CBC Home" /></a></li>
			<li><a href="commercial.html">Commercial</a></li>
			<li><a href="residential.html">Residential</a></li>
			<li><a href="church.html">Church Building</a></li>
			<li><a href="about.html">About Us</a></li>
			<li><a href="contact.html">Contact</a></li>
		</ul>

</nav>

<div class="callout">
		<h2>Find our recent<br/>projects on Houzz.com</h2>
		<a href="http://www.houzz.com/pro/cbcarizona/cbc-inc" title="Check us out on Houzz.com!" target="_blank">
			<img class="houzzbadge" src="assets/houzzbadge.png" alt="Houzz"/>
		</a>
</div>

<div class="banner-image">
	<img id="banner" src="assets/banner-image.jpg" />
</div>

<div class="content">
	<div class="main-content contact">
		<img class="client-logo" src="assets/cbclogo.png" alt="CBC Arizona" />
		<h1>Contact CBC</h1>

		<p>Email CBC below or call us at 480-380-9400.</p>


			<div class="contactform first">
            <form method="post" action="cbc-contact.php">
                <label for="Name">Name</label><br/>
                <input name="Name" id="Name" /><br/>

                <label for="Email">Email<span>*</span></label><br/>
                <input type="email" name="Email" id="Email" required/><br/>

                <label for="Phone">Phone</label><br/>
                <input name="Phone" id="Phone" pattern="^\d{3}-\d{3}-\d{4}$|^\d{3}\.\d{3}\.\d{4}$|^\d{10}$" /><br/>

                <label for="Message">Message<span>*</span></label><br/>
                <textarea name="Message" id="Message" required></textarea>
                <p class="required"><span>*</span>Required</p>

                <div class="g-recaptcha" data-sitekey="6Leo4xcTAAAAAAGTmF031P-SkY0FoG_8XFiM1tic"></div>

                <input type="submit" name="submit" value="Submit" class="submit-button" />
            </form>
        </div>

	</div>

	<div class="sidebar-content">
		<div class="sb-section first-sb">
			<figure><img src="assets/cbc-maroon.png" alt="CBC Arizona" /><figcaption>Building Arizona since 1999</figcaption></figure>

      <p class="centered">CBC, Inc.<br/>
			9353 E. Thunderpass Drive<br/>
			Gold Canyon, Arizona 85118</p>
		</div>
		<div class="sb-section">
			<img src="assets/vince.jpg" alt="Vince Stark" />
			<p class="centered">Contact Vince Stark<br/>
			Cell: 602-573-2170<br/>
			Office: 480-380-9400</p>
		</div>
		<div class="sb-section">
			<a href="http://www.houzz.com/pro/cbcarizona/cbc-inc" target="_blank"><img class="houzz" src="assets/besthouzz2015.png" alt="Best of Houzz 2015" /></a>
			<a href="http://www.houzz.com/pro/cbcarizona/cbc-inc" target="_blank"><img class="houzz" src="http://st.hzcdn.com/static/badge_20_9.png" alt="Remodeling and Home Design" width="80" height="80" border="0" /></a>
		</div>

	</div>
<div class="c"></div>
</div>

<footer>
	<span>&copy;</span> <a href="http://kylephx.com/" title="Kstar Designs" target="_blank">kstar designs</a>
</footer>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/scripts.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-71876721-1', 'auto');
  ga('send', 'pageview');

</script>
</body>


</html>
