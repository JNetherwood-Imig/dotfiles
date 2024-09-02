import icons from "lib/icons";

const audio = await Service.import("audio");

const audioRevealer = Widget.Revealer({
    transition: "slide_down",
    transitionDuration: 200,
    child: Widget.Box({
        css: "background-color: blue;",
        vertical: true,
        //children: Array.from({length: audio.bind("speakers").transform(s => s.length)}, (_, i) => i).map(i =>
                                                                  //Widget.Label(`${audio.bind("speakers").as(s => s[i].name)}`))
    })
})

export default () => Widget.Window({
    widthRequest: 300,
    heightRequest: 500,
    name: "control-center",
    visible: false,
    anchor: [ "top", "right" ],
    child: Widget.Box({
        css: "background-color: red;",
        vertical: true,
        children: [
            Widget.Box({
                vertical: true,
                children: [
                    Widget.Box(
                        { css: "background-color: green;" },
                        Widget.Button({
                            child: Widget.Icon(icons.audio.volume.high),
                            onClicked: () => audioRevealer.reveal_child = !audioRevealer.reveal_child
                        }),
                        Widget.Label("speaker name here")
                    ),
                    audioRevealer
                ]
            })
        ]
    }),
});
