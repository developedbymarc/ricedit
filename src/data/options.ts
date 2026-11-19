export const DISTROS = ["Arch", "CachyOS", "Fedora", "Gentoo", "Debian", "NixOS", "Void", "Other"] as const;
export const DESKTOPS_WMS = ["Hyprland", "i3", "sway", "bspwm", "KDE Plasma", "GNOME", "Other"] as const;
export const SHELLS = ["zsh", "bash", "fish", "nushell", "Other"] as const;
export const TERMINALS = ["kitty", "alacritty", "GNOME Terminal", "Konsole", "foot", "Other"] as const;

export const QUEUE_STATUSES = ["to try", "tried", "keeper"] as const;
export const VERDICTS = ["worked", "needed tweaks", "broke"] as const;
