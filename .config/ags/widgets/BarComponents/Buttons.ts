const Mpris = await Service.import("mpris")
import icons from "lib/icons"

const PanelButton = (callback: () => any, icon: string, className?: string) => Widget.Button({
    onClicked: () => callback(),
    classNames: ["panel-button", className ?? ""],
    child: Widget.Icon(icon)
})

export const Media = () => PanelButton({
    callback: () => App.toggleWindow("media"),
    icon: (Mpris.getPlayer("spotify") || null) ? "spotify" : icons.media.fallback,
    className: "media-button"
})

export const Notifications = () => PanelButton({
    callback: () => App.toggleWindow("notifications"),
    icon: icons.notifications.enabled,
    className: "notifications-button"
})

export const Power = () => PanelButton({
    callback: () => App.toggleWindow("powermenu"),
    icon: icons.power.shutdown,
    className: "power-button"
})
