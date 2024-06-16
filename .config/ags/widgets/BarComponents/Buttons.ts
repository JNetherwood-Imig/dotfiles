const Mpris = await Service.import("mpris")
const Battery = await Service.import("battery")
const Audio = await Service.import("audio")

import Brightness from "service/Brightness"
import icons from "lib/icons"

const PanelButton = (callback: () => any, icon: string, className?: string) => Widget.Button({
    onClicked: () => callback(),
    classNames: ["panel-button", className ?? ""],
    child: Widget.Icon(icon)
})

export const Media = () => Widget.Button({
    onClicked: () => App.toggleWindow("media"),
    classNames: ["media-button", "panel-button"],
    child: Widget.Icon({
        icon: Mpris.players[0].bind("entry").transform(entry => {
            return Utils.lookUpIcon(entry) ? entry : icons.media.fallback
        })
    })
})

export const Notifications = () => PanelButton(
    () => App.toggleWindow("notifications"),
    icons.notifications.enabled,
    "notifications-button"
)

export const Power = () => PanelButton(
    () => App.toggleWindow("powermenu"),
    icons.power.shutdown,
    "powermenu-button"
)

export const BatteryIndicator = () => Widget.Box({
    classNames: ["panel-button", "battery-indicator"],
    visible: Battery.bind("available"),
    children: [
        Widget.Icon({
            icon: Utils.merge([Battery.bind("percent"), Battery.bind("charging")], (percent: number, charging: boolean) => 
                `battery-level-${Math.floor(percent > 0 ? percent / 10 : 0) * 10}${charging ? "-charging" : ""}-symbolic`)}),
        Widget.Label({
            label: Battery.bind("percent").as(p => `${Math.floor(p)}%`)
        })
    ]
})

export const Volume = () => Widget.Box({
    classNames: ["panel-button", "volume-indicator"],
    children: [
        Widget.Icon().hook(Audio.speaker, (self) => {
            const vol = Audio.speaker.is_muted ? 0 : Audio.speaker.volume;
            const {muted, low, medium, high, overamplified} = icons.audio.volume;
            const cons = [
                [101, overamplified],
                [67, high],
                [34, medium],
                [1, low],
                [0, muted],
            ] as const;
            self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
        }),
        Widget.Label().hook(Audio.speaker, self => {
            self.label = `${Audio.speaker.is_muted ? 0 : Math.floor(Audio.speaker.volume * 100)}%`
        })
    ]
})

export const BrightnessIndicator = () => Widget.Box({
    classNames: ["panel-button", "brightness-indicator"],
    children: [
        Widget.Icon("display-brightness-symbolic"),
        Widget.Label().hook(Brightness, self => {
            self.label = `${Brightness.value * 100}%`
        })
    ]
})
