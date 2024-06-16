import icons from "lib/icons"
import Power from "service/Power"

const WINDOW_NAME = "powermenu";

const PowerButton = (callback: () => any, icon: string) => Widget.Button({
    widthRequest: 200,
    heightRequest: 200,
    hpack: "center",
    vpack: "center",
    className: "power-button",
    onClicked: () => {
        App.closeWindow(WINDOW_NAME);
        callback();
    },
    child: Widget.Icon(icon),
})

export default () => Widget.Window({
    name: WINDOW_NAME,
    className: WINDOW_NAME,
    visible: false,
    anchor: ["top", "bottom", "left", "right"],
    keymode: "exclusive",
    setup: self => {self.keybind("Escape", () => App.closeWindow(WINDOW_NAME)); Power.lock_cmd = "hyprlock";},
    child: Widget.Box({
	    hpack: "center",
        children: [
            PowerButton(
                () => Power.lock(),
                icons.power.lock,
            ),
            PowerButton(
                () => Power.exit(),
                icons.power.exit,
            ),
            PowerButton(
                () => Power.suspend(),
                icons.power.suspend,
            ),
            PowerButton(
                () => Power.hibernate(),
                icons.power.hibernate,
            ),
            PowerButton(
                () => Power.reboot(),
                icons.power.reboot,
            ),
            PowerButton(
                () => Power.shutdown(),
                icons.power.shutdown,
            ),
        ]
    })
})
