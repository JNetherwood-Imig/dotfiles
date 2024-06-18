import Clock from "widgets/BarComponents/Clock"
import {Launcher, Media, Notifications, Power, BatteryIndicator, Volume, BrightnessIndicator} from "widgets/BarComponents/Buttons"
import Workspaces from "widgets/BarComponents/Workspaces"
import Tray from "widgets/BarComponents/Tray"

const Left = () => Widget.Box({
    hpack: "start",
    children: [
        Launcher(),
        Workspaces()
    ]
})

const Center = () => Widget.Box({
    hpack: "center",
    children: [
        Notifications(),
        Clock(),
        Media()
    ],
})

const Right = () => Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
        Tray(),
        BrightnessIndicator(),
        Volume(),
        BatteryIndicator(),
        Power(),
    ],
})

export default () => Widget.Window({
    name: "bar",
    className: "bar",
    monitor: 0,
    anchor: [
        "top",
        "left",
        "right"
    ],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    }),
})
