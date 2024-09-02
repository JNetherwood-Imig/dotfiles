import "style/style";
import Bar from "widgets/Bar";
import NotificationPopups from "widgets/NotificationPopups";
import Media from "widgets/Media";
import Launcher from "widgets/Launcher";
import Powermenu from "widgets/Powermenu";
import ControlCenter from "widgets/ControlCenter";

Utils.monitorFile("/home/jackson/.config/kitty/kitty.conf",  () => Utils.execAsync("pkill kitty -SIGUSR1"))

App.config({
    style: "/tmp/ags/style.css",
    windows: [
        Bar(),
        NotificationPopups(),
        Media(),
        Launcher(),
        Powermenu(),
        //ControlCenter(),
        // notification center
        // dashboard
    ],
});

export {};
