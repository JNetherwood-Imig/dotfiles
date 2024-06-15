const WINDOW_NAME = "ControlCenter";

export const ControlCenterIcon = () => Widget.Button({
    onClicked: () => App.toggleWindow(WINDOW_NAME),
})
export const ControlCenterWindow = () => Widget.Window({
    name: WINDOW_NAME,
    anchor: ["top", "right"],
    widthRequest: 100,
    heightRequest: 200,
    setup: self => self.keybind("Escape", () => App.closeWindow(WINDOW_NAME)),
    exclusivity: "exclusive",
    layer: "top",
    visible: false,
    child: Widget.Box({
    })
})