import icons from "lib/icons"

import {type MprisPlayer} from "types/service/mpris";

const mpris = await Service.import("mpris");
const players = mpris.bind("players");

const WINDOW_NAME = "media";

function LengthString(length: number): string {
    const minutes = Math.floor(length / 60)
    const seconds = Math.floor(length % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function Player(player: MprisPlayer = mpris.players[0]) {
    const img = Widget.Box({
        className: "cover",
        vpack: "start",
        hexpand: false,
        css: player.bind("cover_path").transform(p => `background-image: url('${p}')`),
    })

    const title = Widget.Label({
        className: "title",
        wrap: true,
        hpack: "start",
        label: player.bind("track_title"),
    })

    const artist = Widget.Label({
        className: "artist",
        wrap: true,
        hpack: "start",
        label: player.bind("track_artists").transform(a => a.join(", ")),
    })

    const positionSlider = Widget.Slider({
        classNames: ["position", "slider"],
        drawValue: false,
        onChange: ({value}) => player.position = value * player.length,
        visible: player.bind("length").as(l => l > 0),
        setup: self => {
            function Update() {
                const value = player.length != 0 ? player.position / player.length : 0
                self.value = value > 0 ? value : 0
            }

            self.hook(player, Update)
            self.hook(player, Update, "position")
            self.poll(1000, Update)
        }
    })

    const positionLabel = Widget.Label({
        className: "position",
        hpack: "start",
        setup: self => {
            const Update = (_: any, time: any) => {
                self.label = LengthString(time || player.position)
                self.visible = player.length > 0
            }

            self.hook(player, Update, "position")
            self.poll(1000, Update)
        }
    })

    const lengthLabel = Widget.Label({
        className: "length",
        hpack: "end",
        visible: player.bind("length").as(l => l > 0),
        label: player.bind("length").transform(LengthString),
    })

    const icon = Widget.Icon({
        className: "icon",
        hexpand: true,
        hpack: "end",
        vpack: "start",
        tooltipText: player.identity || "",
        icon: player.bind("entry").transform(entry => {
            const name = `${entry}-symbolic`
            return Utils.lookUpIcon(name) ? name : Utils.lookUpIcon(player.identity) ? player.identity : icons.media.fallback
        }),
    })

    const playPause = Widget.Button({
        className: "play-pause",
        onClicked: () => player.playPause(),
        visible: player.bind("can_play"),
        child: Widget.Icon({
            icon: player.bind("play_back_status").transform(s => {
                switch (s) {
                    case "Playing":
                        return icons.media.pause
                    case "Paused":
                    case "Stopped":
                        return icons.media.play
                }
            })
        })
    })

    const previous = Widget.Button({
        className: "previous",
        onClicked: () => player.previous(),
        visible: player.bind("can_go_prev"),
        child: Widget.Icon(icons.media.previous)
    })

    const next = Widget.Button({
        className: "next",
        onClicked: () => player.next(),
        visible: player.bind("can_go_next"),
        child: Widget.Icon(icons.media.next)
    })

    return Widget.Box(
        {className: "player"},
        img,
        Widget.Box(
            {
                vertical: true,
                hexpand: true,
            },
            Widget.Box([title, icon]),
            artist,
            Widget.Box({vexpand: true}),
            positionSlider,
            Widget.CenterBox({
                startWidget: positionLabel,
                centerWidget: Widget.Box([previous, playPause, next]),
                endWidget: lengthLabel
            })
        )
    )
}

export default () => Widget.Window({
    name: WINDOW_NAME,
    className: WINDOW_NAME,
    anchor: ["top"],
    visible: false,
    widthRequest: 350,
    heightRequest: 100,
    child: Widget.Box({
        vertical: true,
        widthRequest: 2,
        heightRequest: 2,
        visible: players.as(p => p.length > 0),
        child: Player()
    }),
    keymode: "exclusive",
    setup: self => self.keybind("Escape", () => App.closeWindow(WINDOW_NAME)),
})
