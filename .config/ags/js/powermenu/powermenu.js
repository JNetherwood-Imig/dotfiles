import { Button, Box, Label, Window } from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';

const sysActions = () => Box({
	className: 'powermenu-box',
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

export default Window({
	name: 'powermenu',
	className: 'powermenu',
    popup: true,
    focusable: true,
	child: sysActions(),
});
