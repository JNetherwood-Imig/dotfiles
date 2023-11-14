import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { Label } from 'resource:///com/github/Aylur/ags/widget.js';

export default () => Label({
    className: 'client-title',
    binds: [
        ['label', Hyprland.active.client, 'title'],
    ],
});
