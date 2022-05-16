"""
Applet: Duolingo
Summary: Display Duolingo Progress
Description: Track your Duolingo study progress. The app has multiple views: Today, Week, Two Weeks. You can add multiple instances to display more than one. Note: The app will be hidden from the rotation if no lessons have been completed in the last week.
Author: Olly Stedall @saltedlolly
Thanks: @drudge @whyamIhere @AmillionAir
"""


load("cache.star", "cache")
load("encoding/base64.star", "base64")
load("encoding/json.star", "json")
load("http.star", "http")
load("render.star", "render")
load("schema.star", "schema")
load("time.star", "time")
load("random.star", "random")

#64 x 19
BOBS_LOGO = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAGQAAAAfCAYAAAARB2hWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmIwZjhiZTkwLCAyMDIxLzEyLzE1LTIxOjI1OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjczMjEzOENBOEMxMUVDOENBQ0Y5MTU1QzE4REE3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNjczMjEzOUNBOEMxMUVDOENBQ0Y5MTU1QzE4REE3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2NzMyMTM2Q0E4QzExRUM4Q0FDRjkxNTVDMThEQTdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2NzMyMTM3Q0E4QzExRUM4Q0FDRjkxNTVDMThEQTdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MJOoRAAAFrhJREFUeNrs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
""")

#insert image base64 in empty line below
#64 x 21
BURGER_TEXT = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAEAAAAAVCAYAAAD2KuiaAAAAAXNSR0IArs4c6QAAAVhJREFUWIXtVkkSwzAIK5n+/8vppc4QRwgRO+100aVT42Ahs/h2+3HYuwlchXVd18hmZlvc96oj//EsUpFPdrYSIPPbbAcBsoCbnZExM/Nr7b9CKFpDASN/TBjEZxMABcY+jsigwCuEmo+RTEOI4ttlgKKoPXGWZC8QsvdisnOUEm0+0WXQHqCk4RkomeFJZ3uz8mHYCcAU9ySuSNEIs86RS6wPtL8BdBvIzn57H9FeFkyVY2SjJTCSWqpPBqXzo+bL/NEmWCF1RWoisB4UZWPWXD1KAvRkRkVQfPhmiPYqE4JNrkUhiepWnfERKe8j8jMjyzKeVICmmFdwlFDz6wn2ZL0wSoZEjRX1i37f4j/IuqdyI8ojSRGzia7sUfb5cvBnyy/BykSopm4mGrJVRp0/47AeHZA5VhqiX0e1L5OcNHEQQgGqjenVxKdCma/fCviK+pib+2McDzhy9/Yu4z+LAAAAAElFTkSuQmCC
""")

COLOR_LIST = {
    "White": "#fff",
    "Red": "#a00",
    "Green": "#0a0",
    "Blue": "#00a",
    "Orange": "#D2691E",
}

BURGER_LIST = ['"New bacon-ings"','Never Been Feta','Foot Feta-ish Burger','The Life of the Parsley Burger','Sweet Chili O\' Mine Burger','Itsy Bitsy Teeny Weenie Yellow Polka-Dot Zucchini Burger','Hit Me With Your Best Shallot Burger','Focaccia red handed burger','So Many Fennel So Little Thyme Burger','THE FINDERS CAPERS BURGER','Emergency Eggs-it Burger','Sweet Home Avocado Burger','The stayin\' a chive burger','Let\'s Give \'em Something Shiitake \'bout Burger','Chile Relleno- You-Didn\'t Burger','Pear Goes the Neighborhood','Salvador Cauliflower Burger','Fig Lebowski Burger','Cole came, cole slaw, cole conquered Burger','Breaking Radish Burger','Captain Pepper Jack Marrow Burger','Little Swiss Bunshine Burger','Take A Leek Burger','The ber-gouda triangle burger','The little sprouts on the prairie burger','She\'s a Super Leek Burger','Use It Or Bleus It Burger','THE HICKORY CHICORY GUAC BURGER','Chorizo Your Own Adventure Burger','Chard To A Crisp Burger','THE SEALED WITH A SWISS BURGER','Topless the Morning To You Burger','50 Ways to Leave Your Guava Burger','THE I LOVE YOU JUST THE WHEY YOU ARE BURGER','The eggplant one on me burger','Every Breath You Tikka Masala Burger','Nothing Compares 2 Bleu (Cheese) Burger','The Here I Am Broccoli Like a Hurricane Burger','Better cauliflower saul burger','Don\'t Go Brocking My Heart Burger','I Heartichoke You Burger','The Shut Up and Swiss Me Burger','A Good Manchego is Hard to Find Burger','MY BLOODY KALE-ENTINE BURGER','Be My Valen-thyme Burger','THE I HATE TO SEE YOU BRIE-VE BUT I LOVE TO WATCH YOU GO BURGER','Step up 2: the beets burger','Girls Just Wanna Have Fennel Burger','Don\'t You Four Cheddar \'Bout Me Burger','The Don\'t Get Creme Fraiche With Me Burger','Curry On My Wayward Bun Burger','Nice guys spinach last burger','The marvelous mrs. basil burger','Parme- jean-claude van hamburger','Bruschetta Bout It Burger','Tarragon in Sixty Seconds Burger','Poutine on the Ritz Burger','The Oh Con-Pear Burger','Say It Ain\'t Cilantro Burger','Chevre Which Way But Loose Burger','THE TWO LEFT BEET BURGER','The Older with More Eggs- perience Burger','Eggers Can\'t Be Cheesers Burger','Edamame Dearest Burger','Pickle My Funny Bone Burger','The I\'m Getting Too Old For This Shishito Burger','Burger A La Mode','Open Sesame Burger','THE FIGGY SMALLS BURGER','A wrinkle in thyme burger','Chipotle Off the Old Block Burger','Don\'t Give Me No Chive Burger','Frisee It, Don\'t Spray It Burger','Turn the Other Leek Burger','Where Have You Bean All My Life Burger','The into thin heirloom burger','The happy paint patty\'s day burger','I Mint to Do That Burger','Totally Radish Burger','Mushroom With A View Burger','It\'s Only Sourdough Burger','Cajun Gracefully Burger','The Hand That Rocks the Bagel Burger','Olive And Let Die Burger','Wasabi My Guest Burger','THE COLBY BY YOUR NAME BURGER','The creme fraiche prince of bell peppers burger','The Garden of E-dumb Burger','What\'s The Worce- stershire That Could Happen Burger','To Err Is Cumin Burger','The you can lead a horseradish to watercress burger','Take Me Out To The Burger','National Pass-Thyme Burger','A Leek of Their Own Burger','Put Me in Poached Burger','Fig-eta Bout It Burger','Pepper Don\'t Preach Burger','Creminis and Misdemeanies Burger','Poblano Picasso Burger','Enoki Dokie Burger','MediterrAin\'t Misbehavin\' Burger','Sharp Cheddar Dressed Man BURGER','Barley Davidson Burger','The green a little bean of me burger','Sprouts! Sprouts! Sprouts It All Out! Burger','Snipwrecked Burger','THE DILL CRAZY AFTER ALL THESE GRUYERES BURGER','The Choys are Bok in Town Burger','Papaya Was A Rolling Stone Burger','These Collards Don\'t Run Burger','Do the Brussel Burger','Onion Ring Around the Rosemary Burger','The oaxaca waka waka burger','Parma Parma Parma Chameleon Burger','The mo, larry, and curry burger','Curd-fect Strangers Burger','Peas and Thank You Burger','THE WHAT IF PEAPOD WAS ONE OF US BURGER','Knife to Beet You Burger','Is This Your Chard Burger','The Glass Fromagerie Burger','Citizen Kale Burger','The should I sautee or should i mango burger','Total Eclipse of the Havarti Burger','Shoestring Around the Rosey Burger','Mission A-Corn- Plished Burger','Scent of a Cumin Burger','Baby got bak choy burger','The Grand Brie Burger','Parm-pit Burger','If You\'ve Got It, Croissant It Burger','Last of the Mo-Jicama Burger','Endive Had the Time of My Life Burger','Not If I Can Kelp It Burger','The mama said there\'d be glaze like this burger','Sit and Spinach Burger','All In A Glaze Work Burger','Weekend at Bearnaise Burger','I Know Why the Cajun Burger Sings','The Stop or My Mom Will Shoots Burger','Thank God It\'s Fried Egg Burger','The Sun\'ll Come Out To-Marrow Burger','If Looks Could Kale Burger','If At First You Sesame Seed, Thai, Thai, Again Burger','The Saffron Saff-off Burger','Gourdon- Hamsey Burger','Sympathy for the Deviled Egg Burger','Onion-tended Consequences Burger','The rye of the storm burger','Who Wants To Be A Scallionaire Burger?','The bustle and flow burger','Bet it all on black garlic burger','Teriyaki a New One Burger','THE CHEVRE LITTLE THING SHE DOES IS MAGIC BURGER','The twisted swiss-ster burger','My Farro Lady Burger','Woulda Coulda Gouda Burger','You Gouda Be Kidding Me Burger','As Gouda As It Gets Burger','Gouda Gouda Gumdrops Burger','A Few Gouda Men Burger','Gouda Gouda Two Shoes Burger','Gouda Day Sir Burger','Parsnips- Vous Francais Burger','Sweaty Palms Burger','Tangled Up in Blueberry Burger','The Gouda Wife Burger','Take a bite out of lime burger','This is what it sounds like when cloves fry burger','Do Fry for Me Argentina Burger','The fleetwood jack burger','The deep blue brie burger','Summer Thyme Burger','I Know What You Did Last Summer Squash Burger','The 500 Glaze of Summer Burger','It\'s My Havarti and I\'ll Rye If I Want To burger','Bleu is the Warmest Cheese Burger','The Blanc Canvas Burger','Blondes Have More Fun-gus Burger','We\'re Here We\'re Gruyere, Get Used to It Burger','Free To Brie You and Me Burger','Chili Wonka Burger','Glory Glory Jalapeño Burger','Fingerling Brothers and Barnum and Bay Leaves Burger','The for butter or for wurst burger','View to a Kielbasa Dog','The Heirloom Where it Happens Burger','TURMERIC-A THE BEAUTIFUL BURGER','Freedom of Choys Burger','The Six Scallion Dollar Man Burger','The if it\'s yellow let it portobello burger','The Full Head of Heir-loom Tomato Burger','We Bought a Zucchini Burger','The Olive What She\'s Having Burger','Son of a peach-er man burger','You Won\'t Believe It\'s Not Butternut- squash Burger','Bright leeks, big city burger','It\'s chive o\'clock some-pear burger','The Paprika Smurf Burger','THE ALL HOT AND COLLARD BURGER','Edward James Olive-most Burger','The Rosemary\'s Baby Spinach Burger','Shishito Corleone Burger','The you had me at hellokra burger','Do the cremini, do the thyme burger','Portobello the Belt Burger','THE AROUND THE WORLD IN EIGHTY DATES BURGER','Full nettle jacket burger','Step Into the Okra-tagon Burger','Medium Snare Burger','Cage-In Burger','Beet-er Late Than Never','Throw cardamom-ma from the train burger','The fifty glaze to eat your burger','To Thine Own Self be Bleu Burger','Corned Identity Burger','THE MUSH-AROOM ABOUT NOTHING BURGER','It Takes Two to Mango burger','THE DRAGONFRUIT ME TO HELL BURGER','THE LAND OF THE SLAW-ST BURGER','The throw your hands in the heirloom burger','The pea-brie\'s big adventure burger','Aw Nuts Burger','When Harry Met Salami Burger','Krauted House Burger','Asiago for broke burger','Top Bun Burger','The Say Cheese Burger','It Takes Bun to Know Bun Burger','Heads Shoulders Knees and Tomatoes Burger','I\'m Picklish Burger','Runny Out of Thyme Burger','Chutney the Front Door Burger','The fleetwood jack burger','The straight and marrow burger','The Gorgon-baby -gone burger','The Final Kraut Down Burger','THE THROW YOUR HANDS IN THE GRUYERE BURGER','The One Yam Band Burger','The \'shroom where it happens burger','Walk This Waioli Burger','The thin red pepper burger','Ready or not here i plum burger','THE JUDGE BRINE-HOLD BURGER','She\'ll be Coming \'round the Plantain Burger','The hawk and chickpeas burger','Happy banana- versary burger','The bleu collard burger','The easy come, asiago burger','The guac! or my mom will shoot burger','The Don\'t Dream It\'s Okra Burger','The rib long and prosper burger','The Longest Chard Burger','Smells Like Bean Spirit Burger','The Troy Oinkman Burger','The thousand chard stare burger','Cloves encounters burger','Kale Mary Burger','The random jacks of chive-ness burger','I\'m Gonna Get You Succotash Burger','The Frankie goes to hollandaise burger','The ruth tomater ginsburger','The Wasabi with You Burger','Take a picture fig\'ll last longer','Judy Garlic Burger','The almond butters band burger','The glazed and infused burger','One Fish, Two Fish, Red Fish Hamburger','THE COPS AND RABE-ERS BURGER','Shake Your Honeymaker Burger','Beets of Burden Burger','I bean of greenie burger','The unbreakable kimchi schmidt burger','Avoca-don\'t you want me baby? burger','The Jack-O-Lentil Burger','THE HUNT FOR RED ONION-TOBER BURGER','Onion Burger - Grilled...  To Death!','Muenster Under the Bun Burger','The pecorino on someone your own size burger','Two Karat Burger','The chimichurri up and wait burger','Rest in Peas Burger','Butterface Burger','LITTLE CHOP OF HORSERADISH BURGER','The 28 maize later burger','The corn-juring two burger','Texas Chainsaw Massa-curd Burger','The if I \nhad a (pumper) nickel burger','Kales From the Crypt Burger','THE DEVIL\'S AVOCADO-CATE BURGER','It\'s fun to eat at the rYe MCA Burger','The Human Polenta-pede Burger','Riding in Cars with \nBok Choys','Grandpa Muenster Burger','Caper the Friendly Goat Cheese Burger','Grin and carrot burger','The chili-delphia story burger','Paranormal Pepper Jack-tivity Burger','The leek-y cauldron burger','Shoot out at the Okra Corral Burger','MURDER, KIMCHI WROTE BURGER','I\'ve Created a Muenster Burger','The night-pear \non elm beet burger','The Cauli- flower\'s Cumin from Inside the House Burger','The what we dill in the shadows burger','Corn This Way Burger','Ruta-Bag-A Burger','Livin\' on a pear burger','The three cheeks to the wind burger','You Spinach Me Right Round Spinach Burger','The chimi-churri you can\'t be serious burger','The what\'s the matter-horn burger','THE ABSENTEE SHALLOT BURGER','Camembert-ly Legal Burger','The groove is in the chard burger','Burger she goat','The goat tell it on the mountain burger','Band On The Bun Burger','House of 1000 pork-ses burger','Sub- conscious Burger','The lost in yam-slation burger','Mesclun Around Burger','In ricotta da vida burger','ONE FLEW OKRA THE COUSCOUS NEST BURGER','Only the Provolonely Burger','Stilton crazy after all these gruyeres burger','The Sound & The Curry Burger','You\'re Kimchi the Best Burger','Bohemian Radishy Burger','The Catch Me If You Cran Burger','I stilton haven\'t found what thyme looking for burger','Graters of the sauced havart(i) burger','The tikka look at me now burger','Charbroil Fair Burger','The Yam Ship Burger','One Horse Open Slaw Burger','Jingle bell peppers rock burger','Let it snow peas Burger','I Fought the Slaw Burger','Walking in a Winter Comes-with- cran Burger','It came upon a midnight gruyere burger','Bleu by You Burger','The What\'s Kala-mata with You Burger','Santa Claus Is Cumin to Town Burger','The hollandaise ro-o-oh-o-oh- o-oh-oh-oh- oll burger','The Ebeneezer Bleu-ge Burger','THE SMILLA\'S SENSE OF SNOWPEAS BURGER','Winter Muensterland Burger with Muenster cheese','Passion of the Cress Burger','You cheddar watch out, you cheddar on rye burger','Jingle Bell Pepper Burger','Away in a Mango Burger','Home for the Challah-Days Burger','You can\'t fight City Challa Burger','Your cress is on my list burger','The challah and the chive-y burger','The Silentil Night Burger','THE SANTA SLAWS IS COMING TO TOWN BURGER','Twas the Nut Before Christmas Burger','Cheeses is Born Burger','The Pear Tree Burger','The fried off into the sunset burger','Good Night and Good Leek Burger','Fifth Day of Christmas Burger','Celery-brate good times, come on! burger','Havarti Like It\'s 1999 Burger']

BURGER_PAR_LIST = ['(comes with bacon)','','','','','','','(on focaccia with beets)','(comes with lots of fennel, no thyme)','','','','','','','(comes with a side of pear salad)','','','','(comes with a slice of Radish)','','(Comes on a buttered bun)','(Comes with sautéed leeks)','','','(Comes with braised leeks)','(Comes with Bleu Cheese)','','','','','','','','','','','','','(with broccoli and artichoke hearts)','','','','','','','','','(Comes with four kinds of cheddar)','','','','','','','','(Comes with poutine fries)','','(Doesn\'t come with cilantro. Because cilantro is terrible.)','','','(aged burger with a fried egg on top)','(with fried egg and cheese)','(comes with edamame)','','','(Comes with ice cream - Not on top)','(Served open-faced on a sesame seed bun)','','','','(served with no chives)','','','(Comes with Baked Beans)','','(whiskey brushed patty)','(Comes with mint relish)','(Comes with Radish)','(Porcini on a double decker)','(But I Like It)','','(comes with an everything bagel)','','','','','(Served with Crapple)','','','','(Comes with Peanuts and Crackerjacks)','','','(comes with a poached egg)','','','(comes with cremini mushrooms)','','(Comes with enoki mushrooms)','','(Comes with sharp cheddar)','(comes on a barley roll)','','','(comes with parsnips)','','','','','(Comes with brussel sprouts)','','(comes with oaxaca cheese)','(with Parmesan crisp)','','(Comes with cheese curds)','','','(with Thinly Sliced Beets)','','','','(comes with sauteed onions and mango salsa)','','','(Comes with Corn Salsa)','','','','(Comes with Parmesan)','','(Comes with Jicama)','','','(comes with a wor- cestershire glaze)','','(Served with Balsamic Glaze)','','','(comes with pea shoots)','','(comes with bone marrow)','','','','(Comes with squash and ham)','','','(served with a balsamic drizzle on a rye bun)','','(served with Brussel sprouts)','','','','','','','','','','','(It comes with shoes)','','','(Comes with hearts of palm)','(comes with a blueberry compote)','(comes with Mature Gouda)','(with lime chutney)','(with fried garlic cloves)','','(comes with sweet little fries pies, jack cheese)','(comes with blue cheese and brie)','','','(comes with Pomegranate Glaze)','','','(comes with a fromage blanc)','(Comes with mushrooms)','','','','','','(with butter pickles and sausage)','','','','(comes with bok choy)','','(with yellow peppers and portobello mushrooms)','','','','(comes with peach glaze)','(served with zucchini)','(comes with grilled leeks)','','(comes with blue potato fries)','','','','(comes with shishito peppers)','','','','','(comes with sauteed nettles)','','','','','','','(served with bleu cheese)','(comes with corned beef)','','','','(Comes with pickle slaw)','','(pea protein burger w/Brie)','(comes with peanut butter)','','','','(comes on our best seven-grain bun)','','(comes on a fancy bun)','','(comes with pickles)','(comes with a runny fried egg)','(Comes with Mango Chutney)','(comes with sweet little pies, jack cheese)','(comes with marrow)','(comes with gorgonzola cheese)','(Comes with sauerkraut)','','(Comes with yams)','','(comes with wasabi aioli)','','','','','','(9 is divisible by 3)','','','','','','','','(Served with bacon)','(comes with thousand island dressing and swiss chard)','','(served with kale)','(with monterrey jack cheese and chives)','','','(comes with heirloom tomatoes and pickled ginger)','','','','(comes with toasted almond butter)','(bourbon glazed and infused with bacon)','','(Topped with Broccoli Rabes)','(Comes with Honey Mustard)','','(comes with black bean parsley puree)','','','','','','','(comes with pecorino crisps)','(Comes with two carrots)','','','(served with butter lettuce)','','(comes with corn salsa)','(comes with even more corn salsa)','','','','','(Comes on Rye w/ Mustard, Cheese & Avocado)','','','(10% Senior Discount)','(served with capers & feta)','','','','','','','','(comes with pear and beet relish)','(Comes with cauliflower and cumin)','','','','','(comes with guaniciale)','','','(with swiss cheese crisps)','(Comes with crispy shallots)','','','(comes with goat cheese)','(comes with goat cheese)','(Comes with Wings)','(topped with ham and bacon)','(on a sub roll)','','','','','(Comes with provolone)','','','','','(served with cranberry sauce)','','','','(Comes with Parlsey, Sage, Rosemary, and Thyme)','(comes with yams)','(Comes with slaw, no horse)','','','(And the Slaw Won)','(comes with cranberry sauce)','','(with locally sourced bleu cheese)','','(with cumin)','(comes with hollandaise sauce on a kaiser roll)','','','(Side of snow peas)','','','','','(Comes on a challah roll)','(comes on a Challah roll)','(comes with watercress)','','(Comes with lentils)','','(comes with walnut aioli)','(Comes with baby swiss)','(with sliced pears - partridge not included)','(comes with a fried egg)','','(Comes with five golden rings of onion)','','']

def main():
    randomNumber = random.number(0, 365)

    return render.Root(
        # delay = int(rotationSpeed * 1000),
        delay = 60,
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
                                # if config.bool("show_logo", True):
                                render.Padding(
                                    render.Image(
                                        src = BOBS_LOGO,
                                        width = 62,
                                        height = 20
                                    ),
                                    pad = 1
                                ),
                                render.Padding(
                                    render.Image(
                                        src = BURGER_TEXT,
                                        width = 64,
                                        height = 21
                                    ), pad = (0, 3, 0, 0)
                                ),
                                render.Box(
                                    render.Row(
                                        expanded = True,
                                        main_align="space_evenly",
                                        children = [
                                            render.Text(
                                                content = 'OF THE DAY'
                                            ),
                                        ],
                                    ),
                                    width = 64,
                                    height = 8,
                                ),
                                render.Box(
                                    color = "#000",
                                    child = render.Box(
                                        width = 38,
                                        height = 1,
                                        color="#fff",
                                    ),
                                    width = 64,
                                    height = 3,
                                ),
                                render.Padding(
                                    render.WrappedText(
                                        content = BURGER_LIST[randomNumber].upper(),
                                        width = 60,
                                        # color = "#fff",
                                        # font = "6x13",  
                                        # alignment = "center" #will need to wait for pixlet update from whyamihere
                                    ), pad = (3, 8, 3, 1)
                                ),
                                render.Padding(
                                    render.WrappedText(
                                        content = BURGER_PAR_LIST[randomNumber].lower(),
                                        width = 60,
                                        # color = "#fff",  
                                        # alignment = "center" #will need to wait for pixlet update from whyamihere
                                    ), pad = (3, 0, 3, 2)
                                ),
                                render.Box(
                                    render.Row(
                                        expanded = True,
                                        main_align="space_evenly",
                                        children = [
                                            render.Text(
                                                content = '$5.95',
                                                font = "6x13",
                                            ),
                                        ],
                                    ),
                                    width = 64,
                                    height = 13,
                                ),
                            ],
                        ), 
                ),
            ]
        ),
    )

def get_schema():
    colors = [
        schema.Option(display = key, value = value)
        for key, value in COLOR_LIST.items()
    ]
    scroll_speed = [
        schema.Option(display = "Slow", value = "200"),
        schema.Option(display = "Normal (Default)", value = "100"),
        schema.Option(display = "Fast", value = "30"),
    ]
    fonts = [
        schema.Option(display = key, value = value)
        for key, value in render.fonts.items()
    ]
    return schema.Schema(
        version = "1",
        fields = [
            schema.Toggle(
                id = "show_logo",
                name = "Show logo",
                desc = "Show or hide the Bob's Burgers show logo",
                icon = "brush",
                default = True,
            ),
            schema.Text(
                id = "msg",
                name = "Message",
                desc = "A mesage to display.",
                icon = "cog",
                default = "test",
                #default = DEFAULT_MSG,
            ),
            schema.Dropdown(
                id = "font",
                name = "Font",
                desc = "Change the font of the text.",
                icon = "font",
                default = "tb-8",
                options = fonts,
            ),
            schema.Text(
                id = "linespacing",
                name = "Line Spacing",
                desc = "Adjust line spacing of text (integers only).",
                icon = "cog",
                default = "0",
            ),
            schema.Toggle(
                id = "negate_linespacing",
                name = "Negate line spacing?",
                desc = "",
                icon = "cog",
                default = False,
            ),
            schema.Dropdown(
                id = "color",
                name = "Color",
                desc = "Change color of text.",
                icon = "brush",
                default = "test",
                # default = colors[0].value,
                options = colors,
            ),
            
            schema.Text(
                id = "color_select",
                name = "Custom Color",
                desc = "Enter a color in #rgb, #rrggbb, #rgba, or #rrggbbaa format.",
                icon = "brush",
                default = "#fff",
            ),
            # schema.Dropdown(
            #     id = "speed",
            #     name = "Scroll Speed",
            #     desc = "Change speed that text scrolls.",
            #     icon = "cog",
            #     default = 50,
            #     #default = scroll_speed[1].value,
            #     #options = scroll_speed,
            # ),
        ],
    )

#left off:
    #options:
        #toggle: yes/no show the bob's burgers logo
            #tried this, not working: # if config.bool("show_logo", True):
        #dropdown: Burger choice - set / random / custom 
        #slider: speed
            #check the speeds while tidbyt speed is set at different speeds

#to do:
    #center the "botd" text (pixlet repo changes needs to be reflected first): https://discordapp.com/channels/928484660785336380/928485908842426389/973696906779820092
    #update the "load(" files so I'm only pulling in the necessary ones
    #update notes at top
