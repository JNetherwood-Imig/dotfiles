import { Button, Box, Label, Window, CenterBox } from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';

const Powermenu = () => Box({
	className: 'powermenu-box',
	hexpand: true,
	vexpand: true,
	halign: 'center',
	valign: 'center',
	children: [
		Box({
			className: 'powermenu',
			halign: 'center',
			valign: 'center',
			hexpand: false,
			children: [
				Button({
					child: Label('⏻'),
					className: 'shutdown-icon',
					onClicked: () => exec('shutdown now'),
				}),
				Button({
					child: Label(''),
					className: 'reboot-icon',
					onClicked: () => exec('systemctl reboot'),
				}),
				Button({
					child: Label('󰗽'),
					className: 'logout-icon',
					onClicked: () => exec('hyprctl dispatch exit'),
				}),
				Button({
					child: Label(''),
					className: 'lock-icon',
					onClicked: () => exec('swaylock'),
				}),
				Button({
					child: Label('X'),
					className: 'close-icon',
					onClicked: () => App.closeWindow('powermenu'),
				}),
			],
		})
	]
})

export default Window({
	name: 'powermenu',
	className: 'powermenu-window',
    popup: true,
    focusable: true,
	anchor: ['top', 'bottom', 'left', 'right'],
	child: CenterBox({
		centerWidget: Powermenu(),
	}),
});
