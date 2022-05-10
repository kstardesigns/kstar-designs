load("cache.star", "cache")
load("encoding/base64.star", "base64")
load("encoding/json.star", "json")
load("http.star", "http")
load("render.star", "render")
load("schema.star", "schema")
load("time.star", "time")

#insert image base64 in empty line below
SPRITE_URL = base64.decode("""
iVBORw0KGgoAAAANSUhEUgAAAEAAAAAVCAYAAAD2KuiaAAAAAXNSR0IArs4c6QAAAVhJREFUWIXtVkkSwzAIK5n+/8vppc4QRwgRO+100aVT42Ahs/h2+3HYuwlchXVd18hmZlvc96oj//EsUpFPdrYSIPPbbAcBsoCbnZExM/Nr7b9CKFpDASN/TBjEZxMABcY+jsigwCuEmo+RTEOI4ttlgKKoPXGWZC8QsvdisnOUEm0+0WXQHqCk4RkomeFJZ3uz8mHYCcAU9ySuSNEIs86RS6wPtL8BdBvIzn57H9FeFkyVY2SjJTCSWqpPBqXzo+bL/NEmWCF1RWoisB4UZWPWXD1KAvRkRkVQfPhmiPYqE4JNrkUhiepWnfERKe8j8jMjyzKeVICmmFdwlFDz6wn2ZL0wSoZEjRX1i37f4j/IuqdyI8ojSRGzia7sUfb5cvBnyy/BykSopm4mGrJVRp0/47AeHZA5VhqiX0e1L5OcNHEQQgGqjenVxKdCma/fCviK+pib+2McDzhy9/Yu4z+LAAAAAElFTkSuQmCC
""")

TODAYS_BURGER = "bet it all on black garlic burger"

def main():
    return render.Root(
        # child = render.Column(
            # children = [
            child = render.Marquee(
                height = 32,
                offset_start = 32,
                offset_end = 32,
                child = render.Column(
                    children = [
                        render.Image(
                            src = SPRITE_URL,
                            width = 64,
                            height = 21
                        ),
                        render.Box(
                            render.Row(
                                expanded=True,
                                main_align="space_evenly",
                                children = [
                                    render.Text(
                                        content = 'OF THE DAY'
                                    ),
                                ],
                            ),
                            height = 8
                        ),
                        render.WrappedText(
                            content = TODAYS_BURGER.upper(),
                            width = 60,
                            # alignment = "center" #will need to wait for pixlet update from whyamihere
                        ),
                    ]
                ),
                scroll_direction = "vertical",
            ),
    )

#to do:
    #center the "botd" text (pixlet repo changes needs to be reflected first): https://discordapp.com/channels/928484660785336380/928485908842426389/973696906779820092
    #