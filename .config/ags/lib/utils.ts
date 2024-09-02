import { type Application } from "types/service/applications";

const apps = await Service.import("applications");
const {query} = apps;

export const AppIcon = (name: string) => {
    const app: Application = query(name)[0];
    return Widget.Button({
        widthRequest: 85,
        heightRequest: 85,
        className: "app-icon",
        onClicked: () => {App.closeWindow("launcher"); app.launch()},
        child: Widget.Icon(app.icon_name || "")
    })
}
