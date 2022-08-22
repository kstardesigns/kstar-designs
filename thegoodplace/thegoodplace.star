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

POSITIVE_LIST = ['Human rights mission to ukraine:\n+(a ton of points)','Eat a sandwich:\n+1.04','Hug sad friend:\n+4.98','Plant baobob tree in Madagascar:\n+9.4','Save a child from drowning:\n+1202.33','Remember sister\'s birthday:\n+15.02','Fix broken tricycle for child who is indifferent to tricycles:\n+0.04','Remain loyal to cleveland browns:\n+53.83','Scratch elbow:\n+1.06','End slavery:\n+814292.09','Maintain composure in line at water park in houston:\n+61.14','Step carefully over flower bed:\n+2.09','Purify water source (village). Pop. > 250:\n+295.98','Sing to a child:\n+0.69','Host refugee family (5 people/ Syria/three years):\n+284019.97','Rehabilitate abused pit bull:\n+30.92','Ignore text message during in-person conversation:\n+0.93','Donate 16.36% of lifetime income, anonymously, to charities:\n+87439.05','Research west indies test cricket tournament results to facilitate conversation with father in-law:\n+7.14','Give out full-size candy bars at Halloween:\n+633.59','Eat vegan:\n+433.19','Never discuss veganism unprompted:\n+9887.22','Installed solar panels (house, arid environment):\n+1994.49','Let someone merge in traffic:\n+1.65','Attend cousin\'s friend\'s child\'s jazz dance recital:\n+31.93','Drive to out-of-state disaster site, helped with relief effort:\n+53131.33','Begin to compose social media post about david bowie dying and then thought "the world doesn\'t need to hear my thoughs on david bowie":\n+225.2','Gracefully end a conversation about the weather:\n+1.07','Save a person from house fire:\n+1911.4','Help mom with her printer:\n+0.18','Carefully put spider outside:\n+1.43','Help a hermit crab find a new shell:\n+18.33','Self-monitor potentially nauseating mouth sounds while chewing:\n+0.01','Donate blood:\n+17.53','Bring own bags to grocery store:\n+1991.31','Fix broken tricycle for child who is indifferent to tricycles:\n+6.6','Hold door for person behind you:\n+3','Sacrifice your life to save others:\n+(not mentioned)','Change the conciousness of a nation:\n+(not mentioned)',]

NEGATIVE_LIST = ['Pull into the breakdown lane when there\'s traffic:\n-(not mentioned)','Buy a trashy magazine:\n-0.75','Stiff a waitress:\n-6.83','Use "Facebook" as a verb:\n-5.55','Poison a river:\n-4010.55','Use the term "bro-code":\n-8.2','Disturb coral reef with flipper:\n-53.83','Be commissioner of professional football league (american):\n-824.55','Rev a motorcycle:\n-64.88','Tell a woman to "smile":\n-53.83','Harassment (sexual):\n-731.26','Ruin opera with boorish behavior:\n-90.9','Blow nose by pressing one nostril down and exhaling:\n-1.44','Root for New York Yankees:\n-99.15','Steal copper wiring from decommissioned military base:\n-16','Overstate personal connection to tragedy that has nothing to do with you:\n-40.57','Fail to disclose camel illness when selling camel:\n-22.22','Commit genocide:\n-433115.25','Think about rubbing afterlife point total in others\' smug faces:\n-5','Heckle mall santa:\n-(not mentioned)','Ruin movie ending:\n-(not mentioned)','Scream at waiter:\n-(not mentioned)','Brief instagram flirtation with kid rock:\n-(not mentioned)','Sticking of gum in public place:\n-(not mentioned)','Show a 9 year-old child The Shining:\n-(not mentioned)','Altercation with various youths selling various items for various fundraisers:\n-(not mentioned)','Sneeze on salad bar:\n-(not mentioned)','Start fire in mailbox to get mailman to take off shirt:\n-(not mentioned)','Take selfie in bathroom at great aunt\'s funeral:\n-(not mentioned)','Lifetime ban from build-a-bear workshop:\n-(not mentioned)','Steal scarecrow from a fall follies display/put it in passenger seat so she could use carpool lane:\n-(not mentioned)','Get health department to give favorite restaurant a "B" rating so it would be less crowded:\n-(not mentioned)','Scalp epipens:\n-(not mentioned)','Roommate/dry cleaning incident:\n-(not mentioned)','Drunkenly adopt dog then return next day:\n-(not mentioned)','Lie about age to eat off kids menu:\n-(not mentioned)','Cyber-bullying of pregnant woman from spin class:\n-(not mentioned)','Flip off stranger (traffic):\n-(not mentioned)','Flip off stranger (misc. location):\n-(not mentioned)','Crash (and subsequent destruction) of vanessa garcia\'s quinceañera:\n-(not mentioned)','Steal a loaf of bread:\n-17','Steal a baguette:\n-20',]

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