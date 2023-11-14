import { Box, CenterBox, Window } from 'resource:///com/github/Aylur/ags/widget.js'
import Logo from './components/logo.js';
import Workspaces from './components/workspaces.js';
import ClientTitle from './components/client.js';
import Volume from './components/volume.js';
import Clock from './components/clock.js';
import PowermenuIcon from './components/powermenu-icon.js'

const Left = () => Box({
	children: [
		Logo(),
		Workspaces(),
    ],
});

const Center = () => Box({
    children: [
		ClientTitle(),
    ],
});

const Right = () => Box({
	halign: 'end',
    children: [
		Volume(),
		Clock(),
		PowermenuIcon(),
    ],
});

export default monitor => Window({
	name: `bar-${monitor}`,
	className: 'bar',
	monitor,
	exclusive: true,
	anchor: ['bottom', 'left', 'right'],
	child: CenterBox({
	    startWidget: Left(),
	    centerWidget: Center(),
	    endWidget: Right(),
	}),
});
