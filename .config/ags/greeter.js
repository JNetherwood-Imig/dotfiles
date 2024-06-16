#!/usr/bin/env -S ags -b compile-greeter -c

Utils.exec([
    "bun",
    "build",
    `${App.configDir}/greeter/main.ts`,
    "--outfile",
    "/tmp/ags/greeter.js",
    "--external",
    "resource://*",
    "--external",
    "gi://*",
    "--external",
    "file://*",
]);

App.quit()

export {};
