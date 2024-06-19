import { type TrayItem } from "types/service/systemtray"

const Tray = await Service.import("systemtray")

const TrayIcon = (item: TrayItem) => Widget.Button({
    className: "tray-item",
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
    child: Widget.Icon().bind("icon", item, "icon"),
    tooltipMarkup: item.bind("tooltip_markup")
})

export default () => Widget.Box({
    classNames: ["panel-button", "tray"],
    children: Tray.bind("items").as(i => i.map(TrayIcon))
})
