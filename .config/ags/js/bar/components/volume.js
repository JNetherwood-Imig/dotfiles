import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import { Button, Box, Stack, Icon, Slider, Revealer, EventBox } from 'resource:///com/github/Aylur/ags/widget.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js'

const showVolumeBar = Variable(false);

const volumeBox = () => EventBox({
	onHover: () => showVolumeBar.setValue(true),
	onHoverLost: () => showVolumeBar.setValue(false),
	onSecondaryClick: () => exec('pavucontrol'),
	connections: [[Audio, self => {
		if (!Audio.speaker)
			return;

		const vol = Audio.speaker.volume * 100;
		self.tooltipText = `Volume ${Math.floor(vol)}%`;
	}]],
	child: Box({
		children: [
			Button({
				className: 'volume-button',
				onPrimaryClick: () => Audio.speaker.isMuted = !Audio.speaker.isMuted,
				child: Icon({
					connections: [[Audio, self => {
						if (!Audio.speaker)
							return;

						const vol = Audio.speaker.volume * 100;
						const icon = [
							[151, 'high'],
							[101, 'medium'],
							[51,  'low'],
							[1,   'muted'],
							[0,   'off'],
						].find(([threshold]) => threshold <= vol * 1.5)[1];

						self.icon = `audio-volume-${icon}-symbolic`;
					}, 'speaker-changed']],
				}),  
			}),
			Revealer({
				transitionDuration: 500,
				transition: 'slide_right',
				child: Slider({
					className: 'volume-bar',
					hexpand: true,
					drawValue: false,
					onChange: ({ value }) => (Audio.speaker.volume = value * 1.5),
					connections: [[Audio, (self) => {
						self.value = Audio.speaker?.volume / 1.5 || 0;
					},'speaker-changed']],
				}),
				connections: [[showVolumeBar, self => {
					self.revealChild = showVolumeBar.getValue();
				}]],
			}),
		],
	}),
})

export default () => Box({
	children: [
		Button({
			className: 'microphone-button',
			onPrimaryClick: () => Audio.microphone.isMuted = !Audio.microphone.isMuted,
			child: Stack({
				items: [
					['unmute', Icon('audio-input-microphone-symbolic')],
					['mute', Icon('audio-input-microphone-muted-symbolic')],
				],
				connections: [[Audio, self => {
					if (Audio.microphone.isMuted) {
						self.shown = 'mute';
					} else {
						self.shown = 'unmute';
					}
				}, 'microphone-changed']],
			}),
		}),
		volumeBox(),
	],
});

