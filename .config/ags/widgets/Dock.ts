import {AppIcon} from "lib/utils";

const revealer = Widget.Revealer({
    transition: "slide_up",
    transitionDuration: 300,
    revealChild: false,
    className: "revealer",
    child: Widget.Box({
        className: "apps",
        children: [
            AppIcon("kitty"),
            AppIcon("firefox"),
            AppIcon("thorium"),
            AppIcon("spotify"),
            AppIcon("files"),
            AppIcon("code"),
            AppIcon("webstorm"),
            AppIcon("clion"),
            AppIcon("minecraft"),
        ]
    })
})

export default () => Widget.Window({
    heightRequest: 10,
    anchor: ["bottom"],
    name: "dock",
    className: "dock",
    child: Widget.Box({
        className: "container",
        child:Widget.EventBox({
            heightRequest: 10,
            className: "event",
            onHover: () => revealer.reveal_child = true,
            onHoverLost: () => revealer.reveal_child = false,
            child: revealer
        })
    })
})
