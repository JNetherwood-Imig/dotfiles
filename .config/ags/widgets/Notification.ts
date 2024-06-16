import {type Notification} from "types/service/notifications";
import GLib from "gi://GLib";

const time = (time: number, format = "%H:%M") =>
    GLib.DateTime.new_from_unix_local(time).format(format);

function NotificationIcon({app_entry, app_icon, image}: Notification) {
    if (image) {
        return Widget.Box({
            vpack: "start",
            hexpand: false,
            className: "image",
            css: `background-image: url("${image}");`,
        });
    }

    let icon = "dialog-information-symbolic";
    if (Utils.lookUpIcon(app_icon)) icon = app_icon;

    if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry;

    return Widget.Box({
        child: Widget.Icon(icon),
    });
}

export default (notification: Notification) => {
    const content = Widget.Box({
        class_name: "content",
        children: [
            NotificationIcon(notification),
            Widget.Box({
                hexpand: true,
                vertical: true,
                children: [
                    Widget.Box({
                        children: [
                            Widget.Label({
                                class_name: "title",
                                xalign: 0,
                                justification: "left",
                                hexpand: true,
                                max_width_chars: 24,
                                truncate: "end",
                                wrap: true,
                                label: notification.summary.trim(),
                                use_markup: true,
                            }),
                            Widget.Label({
                                class_name: "time",
                                vpack: "start",
                                label: time(notification.time),
                            }),
                            Widget.Button({
                                class_name: "close-button",
                                vpack: "end",
                                child: Widget.Icon("window-close-symbolic"),
                                on_clicked: notification.close,
                            }),
                        ],
                    }),
                    Widget.Label({
                        class_name: "description",
                        hexpand: true,
                        use_markup: true,
                        xalign: 0,
                        justification: "left",
                        label: notification.body.trim(),
                        max_width_chars: 24,
                        wrap: true,
                    }),
                ],
            }),
        ],
    });

    const actionsbox =
        notification.actions.length > 0
            ? Widget.Revealer({
                transition: "slide_down",
                child: Widget.EventBox({
                    child: Widget.Box({
                        class_name: "actions horizontal",
                        children: notification.actions.map((action) =>
                            Widget.Button({
                                class_name: "action-button",
                                on_clicked: () => notification.invoke(action.id),
                                hexpand: true,
                                child: Widget.Label(action.label),
                            }),
                        ),
                    }),
                }),
            })
            : null;

    const eventbox = Widget.EventBox({
        vexpand: false,
        on_primary_click: notification.dismiss,
        on_hover() {
            if (actionsbox) actionsbox.reveal_child = true;
        },
        on_hover_lost() {
            if (actionsbox) actionsbox.reveal_child = true;

            notification.dismiss();
        },
        child: Widget.Box({
            vertical: true,
            children: actionsbox ? [content, actionsbox] : [content],
        }),
    });

    return Widget.Box({
        class_name: `notification ${notification.urgency}`,
        child: eventbox,
    });
};
