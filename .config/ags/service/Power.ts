class PowerService extends Service {
    static {
        Service.register(
            this,
            {
                lock: ["boolean"],
                exit: ["boolean"],
                suspend: ["boolean"],
                hibernate: ["boolean"],
                reboot: ["boolean"],
                shutdown: ["boolean"],
            },
            {},
        );
    }

    #lockCmd = "loginctl lock-sesion";
    #exitCmd = "hyprctl dispatch exit";
    #suspendCmd = "systemctl suspend";
    #hibernateCmd = "systemctl hibernate";
    #rebootCmd = "systemctl reboot";
    #shutdownCmd = "systemctl poweroff";

    get lock_cmd() {
        return this.#lockCmd;
    }

    set lock_cmd(command: string) {
        this.#lockCmd = command;
    }

    get exit_cmd() {
        return this.#exitCmd;
    }

    set exit_cmd(command: string) {
        this.#exitCmd = command;
    }

    get suspend_cmd() {
        return this.#suspendCmd;
    }

    set suspend_cmd(command: string) {
        this.#suspendCmd = command;
    }

    get hibernate_cmd() {
        return this.#hibernateCmd;
    }

    set hibernate_cmd(command: string) {
        this.#hibernateCmd = command;
    }

    get reboot_cmd() {
        return this.#rebootCmd;
    }

    set reboot_cmd(command: string) {
        this.#rebootCmd = command;
    }

    get shutdown_cmd() {
        return this.#shutdownCmd;
    }

    set shutdown_cmd(command: string) {
        this.#shutdownCmd = command;
    }

    constructor() {
        super();
    }

    lock() {
        Utils.exec(this.#lockCmd)
    }

    exit() {
        Utils.exec(this.#exitCmd)
    }

    suspend() {
        Utils.exec(this.#suspendCmd)
    }

    hibernate() {
        Utils.exec(this.#hibernateCmd)
    }

    reboot() {
        Utils.exec(this.#rebootCmd)
    }

    shutdown() {
        Utils.exec(this.#shutdownCmd)
    }
}

const service = new PowerService();

export default service;
