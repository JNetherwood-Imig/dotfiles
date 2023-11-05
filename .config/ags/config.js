// importing 
import Bar from './js/bar/bar.js';
import Applauncher from './js/applauncher/applauncher.js'
import App from 'resource:///com/github/Aylur/ags/app.js';
import Powermenu from './js/powermenu/powermenu.js'
import { exec, subprocess } from 'resource:///com/github/Aylur/ags/utils.js';

const scss = App.configDir + '/scss/style.scss';
const css = App.configDir + '/style.css';
exec(`sassc ${scss} ${css}`);

subprocess([
    'inotifywait',
    '--recursive',
    '--event', 'create,modify',
    '-m', App.configDir + '/scss',
], () => {
    exec(`sassc ${scss} ${css}`);
    App.resetCss();
    App.applyCss(App.configDir + '/style.css');
});

// exporting the config so ags can manage the windows
export default {
    style: App.configDir + '/style.css',
    windows: [
        Bar(0),
        Bar(1),
		Applauncher,
		Powermenu
    ],
};
