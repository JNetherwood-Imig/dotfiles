import icons from "lib/icons"
import Power from "service/Power"

const WINDOW_NAME = "powermenu";

const PowerButton = (callback: () => any, icon: string) => Widget.Button({
    hexpand: true,
    vexpand: true,
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
    widthRequest: 1200,
    heightRequest: 200,
    visible: false,
    keymode: "exclusive",
    setup: self => {self.keybind("Escape", () => App.closeWindow(WINDOW_NAME)); Power.lock_cmd = "hyprlock";},
    child: Widget.Box({
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
