export default {
  audio: {
    volume: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
      overamplified: "audio-volume-pveramplified-symbolic"
    },
  },
  media: {
    fallback: "audio-x-generic-symbolic",
    play: "media-playback-start-symbolic",
    pause: "media-playback-pause-symbolic",
    previous: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic"
  },
  notifications: {
    enabled: "preferences-system-notifications-symbolic",
    disabled: "notifications-disabled-symbolic",
  },
  power: {
    lock: "lock-symbolic",
    exit: "",
    suspend: "",
    hibernate: "",
    reboot: "system-reboot-symbolic",
    shutdown: "system-shutdown-symbolic"
  },
};

App.addIcons("assets/icons");
