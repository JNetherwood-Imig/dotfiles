import icons from "lib/icons"
import Power from "service/Power"

const WINDOW_NAME = "powermenu";

const PowerButton = ( callback: () => any, icon: string) => Widget.Button({
    hexpand: true,
    vexpand: true,
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
    widthRequest: 1200,
    heightRequest: 200,
    visible: false,
    setup: self => self.keybind("Escape", () => App.closeWindow(WINDOW_NAME)),
    child: Widget.Box({
        children: [
            PowerButton({
                callback: () => Power.lock(),
                icon: icons.power.lock,
            }),
            PowerButton({
                callback: () => Power.exit(),
                icon: icons.power.exit,
            }),
            PowerButton({
                callback: () => Power.suspend(),
                icon: icons.power.suspend,
            }),
            PowerButton({
                callback: () => Power.hibernate(),
                icon: icons.power.hibernate,
            }),
            PowerButton({
                callback: () => Power.reboot(),
                icon: icons.power.reboot,
            }),
            PowerButton({
                callback: () => Power.shutdown(),
                icon: icons.power.shutdown,
            }),
        ]
    })
})
