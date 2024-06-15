const apps = await Service.import("applications")
const { query } = apps
import {AppIcon} from "lib/utils";
import type { Application } from "types/service/applications"

const WINDOW_NAME = "launcher"

const AppItem = (app: Application) => Widget.Button({
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name || "",
                size: 42,
            }),
            Widget.Label({
                class_name: "title",
                label: app.name,
                xalign: 0,
                css: "margin-left: 10px;",
                vpack: "center",
                truncate: "end",
            }),
        ],
    }),
})

const Applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
    let applications = query("").map(AppItem)

    const list = Widget.Box({
        vertical: true,
        children: applications,
        spacing,
    })

    function repopulate() {
        applications = query("").map(AppItem)
        list.children = applications
    }

    const entry = Widget.Entry({
        hexpand: true,
        css: `margin-bottom: ${spacing}px;`,

        onAccept: () => {
	    const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.toggleWindow(WINDOW_NAME)
                results[0].attribute.app.launch()
            }
        },

        onChange: ({ text }) => applications.forEach(item => {
            item.visible = item.attribute.app.match(text ?? "")
        }),
    })

    const favorites = Widget.Box({
        css: "font-size: 4em; border: 1px solid gray; border-radius: 10px; margin: 10px 0;",
        children: [
            AppIcon("kitty"),
            AppIcon("firefox"),
            AppIcon("thorium"),
            AppIcon("spotify"),
            AppIcon("files"),
            AppIcon("code"),
        ]
    });

    return Widget.Box({
        vertical: true,
        css: `margin: ${spacing * 2}px;`,
        children: [
            entry,
            favorites,
            Widget.Scrollable({
                hscroll: "never",
                widthRequest: width,
                heightRequest: height,
                child: list,
            }),
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            // when the applauncher shows up
            if (visible) {
                repopulate()
                entry.text = ""
                entry.grab_focus()
            }
        }),
    })
}

export default () => Widget.Window({
    name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    className: "launcher",
    child: Applauncher({
        width: 500,
        height: 500,
        spacing: 12,
    }),
})