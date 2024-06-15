const scss = `${App.configDir}/style.scss`;
const css = "/tmp/ags/style.css";

Utils.exec(`sassc ${scss} ${css}`);

Utils.monitorFile(
    `${App.configDir}/style`,
    function () {
        Utils.exec(`sassc ${scss} ${css}`);
        App.resetCss();
        App.applyCss(css);
    });
