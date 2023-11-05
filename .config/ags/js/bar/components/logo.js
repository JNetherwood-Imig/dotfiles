import { Button, Label } from 'resource:///com/github/Aylur/ags/widget.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';

export default () => Button({
	className: 'logo',
	child: Label(''),
	onClicked: 'ags -t applauncher',
})
