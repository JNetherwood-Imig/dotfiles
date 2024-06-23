const Hyprland = await Service.import('hyprland')

export default () => Widget.Box({
    className: "workspaces",
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
        onClicked: () => Hyprland.message(`dispatch workspace ${i}`),
        child: Widget.Label({
            label: `${i}`,
            vpack: "center",
            setup: self => self.hook(Hyprland, () => {
                self.toggleClassName("active", Hyprland.active.workspace.id === i)
                self.toggleClassName("occupied", (Hyprland.getWorkspace(i)?.windows || 0) > 0)
            })
        })
    }))
})
