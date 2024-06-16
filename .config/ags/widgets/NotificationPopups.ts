import Notification from "./Notification";

const notifications = await Service.import("notifications");

function Animated(id: number) {
    const notification = notifications.getNotification(id)!;
    const widget = Notification(notification);
    const transitionDuration = 200;

    const inner = Widget.Revealer({
        transition: "slide_left",
        transitionDuration,
        revealChild: true,
        child: widget,
    });

    const outer = Widget.Revealer({
        transition: "slide_down",
        transitionDuration,
        child: inner,
    });

    const box = Widget.Box({
        hpack: "end",
        child: outer,
    });

    Utils.idle(() => {
        outer.reveal_child = true;
    });

    return Object.assign(box, {
        dismiss() {
            (inner.reveal_child = false),
                Utils.timeout(transitionDuration, () => {
                    outer.reveal_child = false;
                    Utils.timeout(transitionDuration, () => box.destroy());
                });
        },
    });
}

const PopupList = () => {
    const map: Map<number, ReturnType<typeof Animated>> = new Map();
    const box = Widget.Box({
        hpack: "end",
        vertical: true,
        css: "min-width: 440px;",
    });

    function remove(_: unknown, id: number) {
        map.get(id)?.dismiss();
        map.delete(id);
    }

    return box
        .hook(
            notifications,
            (_, id: number) => {
                if (id !== undefined) {
                    if (map.has(id)) remove(null, id);

                    const w = Animated(id);
                    map.set(id, w);
                    box.children = [w, ...box.children];
                }
            },
            "notified",
        )
        .hook(notifications, remove, "dismissed")
        .hook(notifications, remove, "closed");
};

export default (monitor: number = 0) =>
    Widget.Window({
        monitor,
        name: `notifications${monitor}`,
        anchor: ["top", "right"],
        class_name: "notifications",
        child: Widget.Box({
            css: "padding: 2px;",
            child: PopupList(),
        }),
    });
