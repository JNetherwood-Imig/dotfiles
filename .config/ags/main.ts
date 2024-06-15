import Bar from "widgets/Bar";
import NotificationPopups from "widgets/NotificationPopups";
import Media from "widgets/Media";
import "style/style";
import Launcher from "widgets/Launcher";
import Dock from "widgets/Dock";
import Powermenu from "widgets/Powermenu";

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
        // power menu
        // notification center
        // dashboard
    ],
});

export {};
