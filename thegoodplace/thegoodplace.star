"""
Applet: The Good Place
Summary: Displays good/bad actions
Description: Displays good and bad actions from The Good Place, along with their point values.
Author: Kyle Stark @kaisle51
Thanks: ...
"""

load("encoding/base64.star", "base64")
load("render.star", "render")
load("schema.star", "schema")
load("random.star", "random")

#64 x 12
TGP_LOGO = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAZAAAABICAMAAADve1MIAAACo1BMVEVtuGZ2vHB9wHeDw32KxoWRyox8v3Zzu21uuWd/wXmAwXpwuWl7v3R6vnSe0Jm43LXN58vi8eH4+/f////y+fHb7trG48Ov2KyOyIlwump2vG97v3V4vnJyu2uTy47z+fL4/Pih0Z3h8N+dz5jD4sDo9Ob5/Pna7di127KGxIBvuWjK5cf+/v7x+PCQyYt+wHfk8uP8/fvn8+bR6M633LOSyo1yumuFxH/p9Oju9+76/Pp0u23H5MXI5MX3+/e227KEw36j0p7s9uv6/frR6c+bz5dxump0vG6IxYLi8eDj8eKv2Kv+//7Y7NaZzZS+37uz2rD0+vS/4LyJxoP1+vTr9eqr1qe+4Lt3vXCx2a31+vWPyYrk8uL9/v2127HJ5cbD4sF1vG7W69SIxYPu9+2WzJHh8eB6vnOq1qa63bbm8+V3vXFuuGfa7dng8N/O58uCwnzZ7Nff7937/fvO58zZ7dfC4b/U6tKe0Jqt16n0+fOLxoWg0Zuw2azq9el4vXGSyoyUy4/5/PiTyo58wHbM5srw9++73rje79yu2Kp+wHj2+/aXzJL2+/XH5MSf0Jp5vnOazpXE4sHw+O/S6dCEw3/o9OfX7Naz2q+027C937nt9uy937rd7tvX7NW33LRzu2zy+fLK5cjQ6M7N5sqj0p/g8N653bXL5siLx4bx+PGMx4f8/vyl06Dd79zA4L3l8uPT6tGn1KO63rfV69Pe793l8uTP6M2p1aXB4b7b7dnJ5cey2q+k06CHxYG53bbc7trV6tPL5sm23LO83rmu16qPyInF48KHxYKbzpai0p2i0p6YzZOh0ZyOyIiXzZKp1aSMx4as16im1KLG48SKxoSl06GVy5Cm1KGo1aScz5eBwnuNyIjv9+6y2a6f0JuVy48TPr6pAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGn2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNi0wNVQxMDo1MTo1NS0wNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDYtMDZUMjA6MDE6MzktMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDYtMDZUMjA6MDE6MzktMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5OWM0YWFhLTBmZDktNDY2MC1iMzI4LWMyMzBjNTQ0OGUzMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjE1N2I4ZDkzLTUxMmEtMTk0My1hZWIyLTFjMWQwNzliNzk1YiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQ5YjNhZmQ2LTcwZWItNGVjMi04YWRmLTIyNzMzOWRkMDdjZCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9Inht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
""")

POSITIVE_LIST = ['Fed\n +423','Never Been Feta','Foot Feta-ish Burger','The Life of the Parsley Burger','Sweet Chili O\' Mine Burger','Itsy Bitsy Teeny Weenie Yellow Polka-Dot Zucchini Burger','Hit Me With Your Best Shallot Burger','Focaccia red handed burger','So Many Fennel So Little Thyme Burger','THE FINDERS CAPERS BURGER','Emergency Eggs-it Burger','Sweet Home Avocado Burger','The stayin\' a chive burger','Let\'s Give \'em Something Shiitake \'bout Burger','Chile Relleno- You-Didn\'t Burger','Pear Goes the Neighborhood','Salvador Cauliflower Burger','Fig Lebowski Burger','Cole came, cole slaw, cole conquered Burger','Breaking Radish Burger','Captain Pepper Jack Marrow Burger','Little Swiss Bunshine Burger','Take A Leek Burger','The ber-gouda triangle burger','The little sprouts on the prairie burger','She\'s a Super Leek Burger','Use It Or Bleus It Burger','THE HICKORY CHICORY GUAC BURGER','Chorizo Your Own Adventure Burger','Chard To A Crisp Burger','THE SEALED WITH A SWISS BURGER','Topless the Morning To You Burger','50 Ways to Leave Your Guava Burger','THE I LOVE YOU JUST THE WHEY YOU ARE BURGER','The eggplant one on me burger','Every Breath You Tikka Masala Burger','Nothing Compares 2 Bleu (Cheese) Burger','The Here I Am Broccoli Like a Hurricane Burger','Better cauliflower saul burger','Don\'t Go Brocking My Heart Burger','I Heartichoke You Burger','The Shut Up and Swiss Me Burger','A Good Manchego is Hard to Find Burger','MY BLOODY KALE-ENTINE BURGER','Be My Valen-thyme Burger','THE I HATE TO SEE YOU BRIE-VE BUT I LOVE TO WATCH YOU GO BURGER','Step up 2: the beets burger','Girls Just Wanna Have Fennel Burger','Don\'t You Four Cheddar \'Bout Me Burger','The Don\'t Get Creme Fraiche With Me Burger','Curry On My Wayward Bun Burger','Nice guys spinach last burger','The marvelous mrs. basil burger','Parme- jean-claude van hamburger','Bruschetta Bout It Burger','Tarragon in Sixty Seconds Burger','Poutine on the Ritz Burger','The Oh Con-Pear Burger','Say It Ain\'t Cilantro Burger','Chevre Which Way But Loose Burger','THE TWO LEFT BEET BURGER','The Older with More Eggs- perience Burger','Eggers Can\'t Be Cheesers Burger','Edamame Dearest Burger','Pickle My Funny Bone Burger','The I\'m Getting Too Old For This Shishito Burger','Burger A La Mode','Open Sesame Burger','THE FIGGY SMALLS BURGER','A wrinkle in thyme burger','Chipotle Off the Old Block Burger','Don\'t Give Me No Chive Burger','Frisee It, Don\'t Spray It Burger','Turn the Other Leek Burger','Where Have You Bean All My Life Burger','The into thin heirloom burger','The happy paint patty\'s day burger','I Mint to Do That Burger','Totally Radish Burger','Mushroom With A View Burger','It\'s Only Sourdough Burger','Cajun Gracefully Burger','The Hand That Rocks the Bagel Burger','Olive And Let Die Burger','Wasabi My Guest Burger','THE COLBY BY YOUR NAME BURGER','The creme fraiche prince of bell peppers burger','The Garden of E-dumb Burger','What\'s The Worce- stershire That Could Happen Burger','To Err Is Cumin Burger','The you can lead a horseradish to watercress burger','Take Me Out To The Burger','National Pass-Thyme Burger','A Leek of Their Own Burger','Put Me in Poached Burger','Fig-eta Bout It Burger','Pepper Don\'t Preach Burger','Creminis and Misdemeanies Burger','Poblano Picasso Burger','Enoki Dokie Burger','MediterrAin\'t Misbehavin\' Burger','Sharp Cheddar Dressed Man BURGER','Barley Davidson Burger','The green a little bean of me burger','Sprouts! Sprouts! Sprouts It All Out! Burger','Snipwrecked Burger','THE DILL CRAZY AFTER ALL THESE GRUYERES BURGER','The Choys are Bok in Town Burger','Papaya Was A Rolling Stone Burger','These Collards Don\'t Run Burger','Do the Brussel Burger','Onion Ring Around the Rosemary Burger','The oaxaca waka waka burger','Parma Parma Parma Chameleon Burger','The mo, larry, and curry burger','Curd-fect Strangers Burger','Peas and Thank You Burger','THE WHAT IF PEAPOD WAS ONE OF US BURGER','Knife to Beet You Burger','Is This Your Chard Burger','The Glass Fromagerie Burger','Citizen Kale Burger','The should I sautee or should i mango burger','Total Eclipse of the Havarti Burger','Shoestring Around the Rosey Burger','Mission A-Corn- Plished Burger','Scent of a Cumin Burger','Baby got bak choy burger','The Grand Brie Burger','Parm-pit Burger','If You\'ve Got It, Croissant It Burger','Last of the Mo-Jicama Burger','Endive Had the Time of My Life Burger','Not If I Can Kelp It Burger','The mama said there\'d be glaze like this burger','Sit and Spinach Burger','All In A Glaze Work Burger','Weekend at Bearnaise Burger','I Know Why the Cajun Burger Sings','The Stop or My Mom Will Shoots Burger','Thank God It\'s Fried Egg Burger','The Sun\'ll Come Out To-Marrow Burger','If Looks Could Kale Burger','If At First You Sesame Seed, Thai, Thai, Again Burger','The Saffron Saff-off Burger','Gourdon- Hamsey Burger','Sympathy for the Deviled Egg Burger','Onion-tended Consequences Burger','The rye of the storm burger','Who Wants To Be A Scallionaire Burger?','The bustle and flow burger','Bet it all on black garlic burger','Teriyaki a New One Burger','THE CHEVRE LITTLE THING SHE DOES IS MAGIC BURGER','The twisted swiss-ster burger','My Farro Lady Burger','Woulda Coulda Gouda Burger','You Gouda Be Kidding Me Burger','As Gouda As It Gets Burger','Gouda Gouda Gumdrops Burger','A Few Gouda Men Burger','Gouda Gouda Two Shoes Burger','Gouda Day Sir Burger','Parsnips- Vous Francais Burger','Sweaty Palms Burger','Tangled Up in Blueberry Burger','The Gouda Wife Burger','Take a bite out of lime burger','This is what it sounds like when cloves fry burger','Do Fry for Me Argentina Burger','The fleetwood jack burger','The deep blue brie burger','Summer Thyme Burger','I Know What You Did Last Summer Squash Burger','The 500 Glaze of Summer Burger','It\'s My Havarti and I\'ll Rye If I Want To burger','Bleu is the Warmest Cheese Burger','The Blanc Canvas Burger','Blondes Have More Fun-gus Burger','We\'re Here We\'re Gruyere, Get Used to It Burger','Free To Brie You and Me Burger','Chili Wonka Burger','Glory Glory Jalapeño Burger','Fingerling Brothers and Barnum and Bay Leaves Burger','The for butter or for wurst burger','View to a Kielbasa Dog','The Heirloom Where it Happens Burger','TURMERIC-A THE BEAUTIFUL BURGER','Freedom of Choys Burger','The Six Scallion Dollar Man Burger','The if it\'s yellow let it portobello burger','The Full Head of Heir-loom Tomato Burger','We Bought a Zucchini Burger','The Olive What She\'s Having Burger','Son of a peach-er man burger','You Won\'t Believe It\'s Not Butternut- squash Burger','Bright leeks, big city burger','It\'s chive o\'clock some-pear burger','The Paprika Smurf Burger','THE ALL HOT AND COLLARD BURGER','Edward James Olive-most Burger','The Rosemary\'s Baby Spinach Burger','Shishito Corleone Burger','The you had me at hellokra burger','Do the cremini, do the thyme burger','Portobello the Belt Burger','THE AROUND THE WORLD IN EIGHTY DATES BURGER','Full nettle jacket burger','Step Into the Okra-tagon Burger','Medium Snare Burger','I\'d Be Cheddar Off Literally Anywhere But Here Burger!','Beet-er Late Than Never','Throw cardamom-ma from the train burger','The fifty glaze to eat your burger','To Thine Own Self be Bleu Burger','Corned Identity Burger','THE MUSH-AROOM ABOUT NOTHING BURGER','It Takes Two to Mango burger','THE DRAGONFRUIT ME TO HELL BURGER','THE LAND OF THE SLAW-ST BURGER','The throw your hands in the heirloom burger','The pea-brie\'s big adventure burger','Aw Nuts Burger','When Harry Met Salami Burger','Krauted House Burger','Asiago for broke burger','Top Bun Burger','The Say Cheese Burger','It Takes Bun to Know Bun Burger','Heads Shoulders Knees and Tomatoes Burger','I\'m Picklish Burger','Runny Out of Thyme Burger','Chutney the Front Door Burger','The fleetwood jack burger','The straight and marrow burger','The Gorgon-baby -gone burger','The Final Kraut Down Burger','THE THROW YOUR HANDS IN THE GRUYERE BURGER','The One Yam Band Burger','The \'shroom where it happens burger','Walk This Waioli Burger','The thin red pepper burger','Ready or not here i plum burger','THE JUDGE BRINE-HOLD BURGER','She\'ll be Coming \'round the Plantain Burger','The hawk and chickpeas burger','Happy banana- versary burger','The bleu collard burger','The easy come, asiago burger','The guac! or my mom will shoot burger','The Don\'t Dream It\'s Okra Burger','The rib long and prosper burger','The Longest Chard Burger','Smells Like Bean Spirit Burger','The Troy Oinkman Burger','The thousand chard stare burger','Cloves encounters burger','Kale Mary Burger','The random jacks of chive-ness burger','I\'m Gonna Get You Succotash Burger','The Frankie goes to hollandaise burger','The ruth tomater ginsburger','The Wasabi with You Burger','Take a picture fig\'ll last longer','Judy Garlic Burger','The almond butters band burger','The glazed and infused burger','One Fish, Two Fish, Red Fish Hamburger','THE COPS AND RABE-ERS BURGER','Shake Your Honeymaker Burger','Beets of Burden Burger','I bean of greenie burger','The unbreakable kimchi schmidt burger','Avoca-don\'t you want me baby? burger','The Jack-O-Lentil Burger','THE HUNT FOR RED ONION-TOBER BURGER','Onion Burger - Grilled...  To Death!','Muenster Under the Bun Burger','The pecorino on someone your own size burger','Two Karat Burger','The chimichurri up and wait burger','Rest in Peas Burger','Butterface Burger','LITTLE CHOP OF HORSERADISH BURGER','The 28 maize later burger','The corn-juring two burger','Texas Chainsaw Massa-curd Burger','The if I \nhad a (pumper) nickel burger','Kales From the Crypt Burger','THE DEVIL\'S AVOCADO-CATE BURGER','It\'s fun to eat at the rYe MCA Burger','The Human Polenta-pede Burger','Riding in Cars with \nBok Choys','Grandpa Muenster Burger','Caper the Friendly Goat Cheese Burger','Grin and carrot burger','The chili-delphia story burger','Paranormal Pepper Jack-tivity Burger','The leek-y cauldron burger','Shoot out at the Okra Corral Burger','MURDER, KIMCHI WROTE BURGER','I\'ve Created a Muenster Burger','The night-pear \non elm beet burger','The Cauli- flower\'s Cumin from Inside the House Burger','The what we dill in the shadows burger','Corn This Way Burger','Ruta-Bag-A Burger','Livin\' on a pear burger','The Baby You Can Chive My Car Burger','You Spinach Me Right Round Spinach Burger','The chimi-churri you can\'t be serious burger','The what\'s the matter-horn burger','THE ABSENTEE SHALLOT BURGER','Camembert-ly Legal Burger','The groove is in the chard burger','Burger she goat','The goat tell it on the mountain burger','Band On The Bun Burger','House of 1000 pork-ses burger','Sub- conscious Burger','The lost in yam-slation burger','The Mad Flax Curry Road burger','In ricotta da vida burger','ONE FLEW OKRA THE COUSCOUS NEST BURGER','Only the Provolonely Burger','Stilton crazy after all these gruyeres burger','The Sound & The Curry Burger','You\'re Kimchi the Best Burger','Bohemian Radishy Burger','The Catch Me If You Cran Burger','I stilton haven\'t found what thyme looking for burger','Graters of the sauced havart(i) burger','The tikka look at me now burger','Charbroil Fair Burger','The Yam Ship Burger','One Horse Open Slaw Burger','Jingle bell peppers rock burger','Let it snow peas Burger','I Fought the Slaw Burger','Walking in a Winter Comes-with- cran Burger','It came upon a midnight gruyere burger','Bleu by You Burger','The What\'s Kala-mata with You Burger','Santa Claus Is Cumin to Town Burger','The hollandaise ro-o-oh-o-oh- o-oh-oh-oh- oll burger','The Ebeneezer Bleu-ge Burger','THE SMILLA\'S SENSE OF SNOWPEAS BURGER','Winter Muensterland Burger with Muenster cheese','Passion of the Cress Burger','You cheddar watch out, you cheddar on rye burger','Jingle Bell Pepper Burger','Away in a Mango Burger','Home for the Challah-Days Burger','You can\'t fight City Challa Burger','Your cress is on my list burger','The challah and the chive-y burger','The Silentil Night Burger','THE SANTA SLAWS IS COMING TO TOWN BURGER','Twas the Nut Before Christmas Burger','Cheeses is Born Burger','The Pear Tree Burger','The fried off into the sunset burger','Good Night and Good Leek Burger','Fifth Day of Christmas Burger','Celery-brate good times, come on! burger','Havarti Like It\'s 1999 Burger']

NEGATIVE_LIST = ['(comes with bacon)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(on focaccia with beets)','(comes with lots of fennel, no thyme)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with a side of pear salad)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with a slice of Radish)','(bad action)\n-235.32','(Comes on a buttered bun)','(Comes with sautéed leeks)','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with braised leeks)','(Comes with Bleu Cheese)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(with broccoli and artichoke hearts)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with four kinds of cheddar)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with poutine fries)','(bad action)\n-235.32','(Doesn\'t come with cilantro. Because cilantro is terrible.)','(bad action)\n-235.32','(bad action)\n-235.32','(aged burger with a fried egg on top)','(with fried egg and cheese)','(comes with edamame)','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with ice cream - Not on top)','(Served open-faced on a sesame seed bun)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(served with no chives)','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with Baked Beans)','(bad action)\n-235.32','(whiskey brushed patty)','(Comes with mint relish)','(Comes with Radish)','(Porcini on a double decker)','(But I Like It)','(bad action)\n-235.32','(comes with an everything bagel)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Served with Crapple)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with Peanuts and Crackerjacks)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with a poached egg)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with cremini mushrooms)','(bad action)\n-235.32','(Comes with enoki mushrooms)','(bad action)\n-235.32','(Comes with sharp cheddar)','(comes on a barley roll)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with parsnips)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with brussel sprouts)','(bad action)\n-235.32','(comes with oaxaca cheese)','(with Parmesan crisp)','(bad action)\n-235.32','(Comes with cheese curds)','(bad action)\n-235.32','(bad action)\n-235.32','(with Thinly Sliced Beets)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with sauteed onions and mango salsa)','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with Corn Salsa)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with Parmesan)','(bad action)\n-235.32','(Comes with Jicama)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with a wor- cestershire glaze)','(bad action)\n-235.32','(Served with Balsamic Glaze)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with pea shoots)','(bad action)\n-235.32','(comes with bone marrow)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with squash and ham)','(bad action)\n-235.32','(bad action)\n-235.32','(served with a balsamic drizzle on a rye bun)','(bad action)\n-235.32','(served with Brussel sprouts)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(It comes with shoes)','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with hearts of palm)','(comes with a blueberry compote)','(comes with Mature Gouda)','(with lime chutney)','(with fried garlic cloves)','(bad action)\n-235.32','(comes with sweet little fries pies, jack cheese)','(comes with blue cheese and brie)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with Pomegranate Glaze)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with a fromage blanc)','(Comes with mushrooms)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(with butter pickles and sausage)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with bok choy)','(bad action)\n-235.32','(with yellow peppers and portobello mushrooms)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with peach glaze)','(served with zucchini)','(comes with grilled leeks)','(bad action)\n-235.32','(comes with blue potato fries)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with shishito peppers)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with sauteed nettles)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with aged cheddar)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(served with bleu cheese)','(comes with corned beef)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with pickle slaw)','(bad action)\n-235.32','(pea protein burger w/Brie)','(comes with peanut butter)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes on our best seven-grain bun)','(bad action)\n-235.32','(comes on a fancy bun)','(bad action)\n-235.32','(comes with pickles)','(comes with a runny fried egg)','(Comes with Mango Chutney)','(comes with sweet little pies, jack cheese)','(comes with marrow)','(comes with gorgonzola cheese)','(Comes with sauerkraut)','(bad action)\n-235.32','(Comes with yams)','(bad action)\n-235.32','(comes with wasabi aioli)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(9 is divisible by 3)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Served with bacon)','(comes with thousand island dressing and swiss chard)','(bad action)\n-235.32','(served with kale)','(with monterrey jack cheese and chives)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with heirloom tomatoes and pickled ginger)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with toasted almond butter)','(bourbon glazed and infused with bacon)','(bad action)\n-235.32','(Topped with Broccoli Rabes)','(Comes with Honey Mustard)','(bad action)\n-235.32','(comes with black bean parsley puree)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with pecorino crisps)','(Comes with two carrots)','(bad action)\n-235.32','(bad action)\n-235.32','(served with butter lettuce)','(bad action)\n-235.32','(comes with corn salsa)','(comes with even more corn salsa)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes on Rye w/ Mustard, Cheese & Avocado)','(bad action)\n-235.32','(bad action)\n-235.32','(10% Senior Discount)','(served with capers & feta)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(comes with pear and beet relish)','(Comes with cauliflower and cumin)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(with swiss cheese crisps)','(Comes with crispy shallots)','(bad action)\n-235.32','(bad action)\n-235.32','(comes with goat cheese)','(comes with goat cheese)','(Comes with Wings)','(topped with ham and bacon)','(on a sub roll)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with provolone)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(served with cranberry sauce)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes with Parlsey, Sage, Rosemary, and Thyme)','(comes with yams)','(Comes with slaw, no horse)','(bad action)\n-235.32','(bad action)\n-235.32','(And the Slaw Won)','(comes with cranberry sauce)','(bad action)\n-235.32','(with locally sourced bleu cheese)','(bad action)\n-235.32','(with cumin)','(comes with hollandaise sauce on a kaiser roll)','(bad action)\n-235.32','(bad action)\n-235.32','(Side of snow peas)','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(bad action)\n-235.32','(Comes on a challah roll)','(comes on a Challah roll)','(comes with watercress)','(bad action)\n-235.32','(Comes with lentils)','(bad action)\n-235.32','(comes with walnut aioli)','(Comes with baby swiss)','(with sliced pears - partridge not included)','(comes with a fried egg)','(bad action)\n-235.32','(Comes with five golden rings of onion)','(bad action)\n-235.32','']

COMBINED_LIST = POSITIVE_LIST + NEGATIVE_LIST

DEFAULT_POS_ACTION = "Save a child from drowning:\n+1202.33"
DEFAULT_NEG_ACTION = "Tell a woman to smile:\n-53.83"
ACTION = ""
FINE_TEXT = ""
COLOR_GREEN = "#6db866"
COLOR_RED = "#e51428"

def main(config):
    def showTGPLogo():
        if config.bool("show_logo", True):
            return render.Padding(
                render.Image(
                    src = TGP_LOGO,
                    width = 62,
                    height = 12
                ),
                pad = 1
            )
        else:
            return 

    RANDOM_NUMBER_ALL = random.number(0, len(COMBINED_LIST))
    RANDOM_NUMBER_POS = random.number(0, len(POSITIVE_LIST)) 
    RANDOM_NUMBER_NEG = random.number(0, len(NEGATIVE_LIST))
    ACTION_SHOWN = config.get("actions_shown", "all")
    SCROLL_SPEED = config.str("scroll_speed", "60")

    if ACTION_SHOWN == "all":
        ACTION = COMBINED_LIST[RANDOM_NUMBER_ALL]
        if RANDOM_NUMBER_ALL > len(POSITIVE_LIST):
            TEXT_COLOR = COLOR_RED
            FINE_TEXT = "forked."
        else:
            TEXT_COLOR = COLOR_GREEN

            if RANDOM_NUMBER_ALL %20 == 0:
                FINE_TEXT = "great!" #ep 13
            else:
                FINE_TEXT = "fine." #ep 1
    elif ACTION_SHOWN == "positive":
        ACTION = POSITIVE_LIST[RANDOM_NUMBER_POS]
        TEXT_COLOR = COLOR_GREEN
        
        if RANDOM_NUMBER_POS %20 == 0:
                FINE_TEXT = "great!"
        else:
            FINE_TEXT = "fine."
    elif ACTION_SHOWN == "negative":
        ACTION = NEGATIVE_LIST[RANDOM_NUMBER_NEG]
        TEXT_COLOR = COLOR_RED
        FINE_TEXT = "forked."

    return render.Root(
        delay = int(SCROLL_SPEED),
        child = render.Column(
            children = [
                render.Marquee(
                    offset_start = 32,
                    offset_end = 32,
                    width = 64,
                    height = 32,
                    scroll_direction = "vertical",
                    child = 
                        render.Column(
                            children = [
                                showTGPLogo(),
                                render.Padding(
                                    render.Box(
                                        render.Row(
                                            expanded = True,
                                            main_align="space_evenly",
                                            children = [
                                                render.Text(
                                                    content = "Welcome!",
                                                    color = "#fff",
                                                ),
                                            ],
                                        ),
                                        width = 64,
                                        height = 8,
                                    ), pad = (0, 3, 0, 2)
                                ),
                                render.Padding(
                                    render.Box(
                                        render.Row(
                                            expanded = True,
                                            main_align="space_evenly",
                                            children = [
                                                render.Text(
                                                    content = "Everything is",
                                                    color = "#fff",
                                                ),
                                            ],
                                        ),
                                        width = 64,
                                        height = 8,
                                    ), pad = (0, 0, 0, 2)
                                ),
                                render.Box(
                                    render.Row(
                                        expanded = True,
                                        main_align="space_evenly",
                                        children = [
                                            render.Text(
                                                content = FINE_TEXT,
                                                color = "#fff",
                                            ),
                                        ],
                                    ),
                                    width = 64,
                                    height = 8,
                                ),
                                render.Padding(
                                    render.WrappedText(
                                        content = ACTION.upper(),
                                        width = 60,
                                        color = TEXT_COLOR,
                                    ), pad = (3, 6, 3, 1)
                                ),
                            ],
                        ), 
                ),
            ]
        ),
    )

def get_schema():
    scroll_speed = [
        schema.Option(display = "Slow", value = "200"),
        schema.Option(display = "Normal", value = "100"),
        schema.Option(display = "Fast (Default)", value = "60"),
        schema.Option(display = "Faster", value = "30"),
    ]
    action_shown = [
        schema.Option(display = "All actions", value = "all"),
        schema.Option(display = "Positive actions", value = "positive"),
        schema.Option(display = "Negative actions", value = "negative"),
    ]
    return schema.Schema(
        version = "1",
        fields = [
            schema.Toggle(
                id = "show_logo",
                name = "Show logo",
                desc = "Show or hide The Good Place show logo",
                icon = "sign-hanging",
                default = True,
            ),
            schema.Dropdown(
                id = "actions_shown",
                name = "Action shown",
                desc = "Actions to show",
                icon = "shrimp",
                default = action_shown[0].value,
                options = action_shown,
            ),
            schema.Dropdown(
                id = "scroll_speed",
                name = "Scroll speed",
                desc = "Text scrolling speed",
                icon = "person-running",
                default = scroll_speed[2].value,
                options = scroll_speed,
            ),
        ],
    )