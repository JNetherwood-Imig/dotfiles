import Clock from "widgets/BarComponents/Clock"
import {Media, Notifications, Power, BatteryIndicator, Volume, BrightnessIndicator} from "widgets/BarComponents/Buttons"
// import Volume from "widgets/BarComponents/Volume"
import Workspaces from "widgets/BarComponents/Workspaces";

const Left = () => Widget.Box({
    hpack: "start",
    children: [
        // Launcher
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
        // Tray
        // Bluetooth, Wi-fi
        BrightnessIndicator(),
        Volume(),
        BatteryIndicator(),
        Power(),
    ],
})

export default (monitor: number = 0) => Widget.Window({
    name: `bar-${monitor}`,
    className: "bar",
    monitor,
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
