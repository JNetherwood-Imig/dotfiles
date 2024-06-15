const date = Variable("", {
    poll: [1000, 'date "+%H:%M:%S"'],
});

export default () =>
    Widget.Label({
        className: "clock",
        label: date.bind(),
        widthRequest: 100,
    });