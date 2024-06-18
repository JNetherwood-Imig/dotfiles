const Mpris = await Service.import("mpris")
import { MprisPlayer } from "types/service/mpris"
const Battery = await Service.import("battery")
const Audio = await Service.import("audio")

import Brightness from "service/Brightness"
import icons from "lib/icons"

export const Launcher = () => Widget.Button({
    onClicked: () => App.toggleWindow("launcher"),
    classNames: ["panel-button", "launcher-button"],
    child: Widget.Icon("system-search-symbolic")
})

export const Media = () => Widget.Button({
    onClicked: () => App.toggleWindow("media"),
    classNames: ["panel-button", "media-button"],
    child: Widget.Icon({
        icon: icons.media.fallback,
        setup: self => self.hook(Mpris, self => {
            const getPlayer = (name = "spotify") => Mpris.getPlayer(name) || Mpris.players[0] || null
            const getPlayerIcon = (player: MprisPlayer) => Utils.lookUpIcon(player.entry) ? player.entry : icons.media.fallback

            let player = Mpris.getPlayer("spotify") || Mpris.players[0] || null

            if (!player) {
                self.icon = icons.media.fallback
                return
            }

            self.icon = getPlayerIcon(getPlayer())
        }, "notify::players")
    })
})

export const Notifications = () => Widget.Button({
    onClicked: () => App.toggleWindow("notifications"),
    classNames: ["panel-button", "notifications-button"],
    child: Widget.Icon(icons.notifications.enabled),
})

export const Power = () => Widget.Button({
    onClicked: () => App.toggleWindow("powermenu"),
    classNames: ["panel-button", "powermenu-button"],
    child: Widget.Icon(icons.power.shutdown),
})

export const BatteryIndicator = () => Widget.Box({
    classNames: ["panel-button", "battery-indicator"],
    visible: Battery.bind("available"),
    children: [
        Widget.Icon({icon: Battery.bind("icon_name")}),
        Widget.Label({
            label: Battery.bind("percent").as(p => Battery.charged ? "100%" : `${p}%`)
        })
    ],
    setup: self => self.hook(Battery, () => {
        self.toggleClassName("low", Battery.percent <= 20)
        self.toggleClassName("very-low", Battery.percent <= 10)
        self.toggleClassName("charging", Battery.charging)
        self.toggleClassName("charged", Battery.charged)
    }),
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
