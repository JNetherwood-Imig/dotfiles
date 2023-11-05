import { Button, Label } from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';

export default () => Button({
	onClicked: () => App.openWindow('powermenu'),
	child: Label('⏻'),
	className: 'powermenu-icon',
})
