const main = "/tmp/ags/greeter.js";

try {
    await Utils.execAsync([
        "bun",
        "build",
        `${App.configDir}/greeter/main.ts`,
        "--outfile",
        main,
        "--external",
        "resource://*",
        "--external",
        "gi://*",
        "--external",
        "file://*",
    ]);
    await import(`file://${main}`);
} catch (error) {
    console.error(error);
    App.quit();
}

export {};
