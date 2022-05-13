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

#insert image base64 in empty line below
#64 x 21
BURGER_TEXT = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAEAAAAAVCAYAAAD2KuiaAAAAAXNSR0IArs4c6QAAAVhJREFUWIXtVkkSwzAIK5n+/8vppc4QRwgRO+100aVT42Ahs/h2+3HYuwlchXVd18hmZlvc96oj//EsUpFPdrYSIPPbbAcBsoCbnZExM/Nr7b9CKFpDASN/TBjEZxMABcY+jsigwCuEmo+RTEOI4ttlgKKoPXGWZC8QsvdisnOUEm0+0WXQHqCk4RkomeFJZ3uz8mHYCcAU9ySuSNEIs86RS6wPtL8BdBvIzn57H9FeFkyVY2SjJTCSWqpPBqXzo+bL/NEmWCF1RWoisB4UZWPWXD1KAvRkRkVQfPhmiPYqE4JNrkUhiepWnfERKe8j8jMjyzKeVICmmFdwlFDz6wn2ZL0wSoZEjRX1i37f4j/IuqdyI8ojSRGzia7sUfb5cvBnyy/BykSopm4mGrJVRp0/47AeHZA5VhqiX0e1L5OcNHEQQgGqjenVxKdCma/fCviK+pib+2McDzhy9/Yu4z+LAAAAAElFTkSuQmCC
""")

#64 x 19
BOBS_LOGO = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAGQAAAAfCAYAAAARB2hWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmIwZjhiZTkwLCAyMDIxLzEyLzE1LTIxOjI1OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjczMjEzOENBOEMxMUVDOENBQ0Y5MTU1QzE4REE3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNjczMjEzOUNBOEMxMUVDOENBQ0Y5MTU1QzE4REE3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2NzMyMTM2Q0E4QzExRUM4Q0FDRjkxNTVDMThEQTdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2NzMyMTM3Q0E4QzExRUM4Q0FDRjkxNTVDMThEQTdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MJOoRAAAFrhJREFUeNrs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
""")

TODAYS_BURGER = "bet it all on black garlic burger and now its a longer burger"
TODAYS_BURGER_PAR = ""
BURGER_BOX_HEIGHT = len(TODAYS_BURGER)

def main():
    return render.Root(
        # delay = int(rotationSpeed * 1000),
        delay = 2000,
        child = render.Column(
            children = [
                render.Animation(
                    children = [
                        render.Column(
                            children = [
                                render.Padding(
                                    render.Image(
                                        src = BOBS_LOGO,
                                        width = 62,
                                        height = 20
                                    ),
                                    pad = 1
                                ),
                                render.Image(
                                    src = BURGER_TEXT,
                                    width = 64,
                                    height = 21
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
                                render.WrappedText(
                                    content = TODAYS_BURGER.upper(),
                                    width = 60,
                                    # alignment = "center" #will need to wait for pixlet update from whyamihere
                                ),
                            ],
                        ), 
                        # render.Marquee(
                        #     offset_start = 32,
                        #     offset_end = 32,
                        #     width = 64,
                        #     height = 32,
                        #     scroll_direction = "vertical",
                        #     child = render.WrappedText(
                        #         content = TODAYS_BURGER.upper(),
                        #         # color = "#fff",
                        #         # font = "6x13",
                        #     ),
                            
                        # ),
                    ],
                ),
                
            ]
        ),
    )

#left off:
    #need the burger text to be a vertical marquee
    #break up the burger parentheticals into TODAYS_BURGER_PAR

#to do:
    #center the "botd" text (pixlet repo changes needs to be reflected first): https://discordapp.com/channels/928484660785336380/928485908842426389/973696906779820092
    #update the "load(" files so I'm only pulling in the necessary ones
    #update notes at top