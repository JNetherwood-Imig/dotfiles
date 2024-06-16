class BrightnessService extends Service {
  static {
    Service.register(
      this,
      {
        "value-changed": ["float"],
      },
      {
        "value": ["float", "rw"],
      },
    );
  }

  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");

  #brightnessValue = 0;
  #max = Number(Utils.exec("brightnessctl max"));

  get value() {
    return this.#brightnessValue;
  }

  set value(value: number) {
    if (value < 0) value = 0;
    if (value > 1) value = 1;

    Utils.execAsync(`brightnessctl set ${value * 100}% -q`);
  }

  constructor() {
    super();

    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());

    this.#onChange();
  }

  #onChange() {
    this.#brightnessValue = Number(
      (Number(Utils.exec("brightnessctl get")) / this.#max).toFixed(2),
    );
    this.emit("changed");
    this.notify("value");
    this.emit("value-changed", this.#brightnessValue);
  }

  connect(
    event = "value-changed",
    callback: (_: this, ...args: any[]) => void,
  ) {
    return super.connect(event, callback);
  }
}

const service = new BrightnessService();

export default service;
