import { Label } from 'resource:///com/github/Aylur/ags/widget.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

export default () => Label({
    className: 'clock',
    connections: [
        [1000, self => execAsync(['date', '+%H:%M:%S'])
            .then(date => self.label = date).catch(console.error)],
    ],
});

