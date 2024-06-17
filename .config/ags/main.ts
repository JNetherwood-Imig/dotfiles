import Bar from "widgets/Bar";
import NotificationPopups from "widgets/NotificationPopups";
import Media from "widgets/Media";
import "style/style";
import Launcher from "widgets/Launcher";
import Dock from "widgets/Dock";
import Powermenu from "widgets/Powermenu";

Utils.monitorFile("/home/jackson/.config/kitty/kitty.conf",  () => {
    Utils.execAsync("pkill kitty -SIGUSR1")
})

App.config({
    style: "/tmp/ags/style.css",
    windows: [
        Bar(),
        NotificationPopups(),
        Media(),
        Launcher(),
        Dock(),
        Powermenu(),
        // control center
        // notification center
        // dashboard
    ],
});

export {};
