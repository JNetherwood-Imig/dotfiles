import icons from "lib/icons"
const audio = await Service.import("audio");

export default () => Widget.Icon().hook(audio.speaker, (self) => {
    const vol = audio.speaker.is_muted ? 0 : audio.speaker.volume;
    const {muted, low, medium, high, overamplified} = icons.audio.volume;
    const cons = [
        [101, overamplified],
        [67, high],
        [34, medium],
        [1, low],
        [0, muted],
    ] as const;
    self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
})