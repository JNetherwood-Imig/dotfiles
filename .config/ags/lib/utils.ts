const apps = await Service.import("applications");
const {query} = apps;

export const AppIcon = (name: string) => {
    const app = query(name)[0];
    return Widget.Button({
        widthRequest: 85,
        heightRequest: 85,
        className: "app-icon",
        onClicked: () => {app.launch(); App.closeWindow("launcher");},
        child: Widget.Icon(app.icon_name)
    })
}
