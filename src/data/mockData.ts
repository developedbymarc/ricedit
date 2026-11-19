import { TUser, TSetup, TQueueEntry, TReport } from "@/data/types";

export const mockUsers: TUser[] = [
  {
    id: "u1",
    userName: "marc",
    email: "marc@ricedit.dev",
    password: "ricedit2026",
    bio: "Tinkering with my desktop every weekend.",
  },
  {
    id: "u2",
    userName: "joe",
    email: "joe@ricedit.dev",
    password: "kde12345",
    bio: "Minimal setups only.",
  },
  {
    id: "u3",
    userName: "i.need.ram",
    email: "ram@ricedit.dev",
    password: "ram12345",
    bio: "hello. i love debian",
  },
];

export const mockSetups: TSetup[] = [
  {
    id: "s1",
    ownerId: "u2",
    title: "Tokyo Night Hyprland",
    distro: "Arch",
    dewm: "Hyprland",
    shell: "zsh",
    terminal: "kitty",
    description:
      "Blurred panels, a Tokyo Night palette and smooth workspace animations.",
    repoUrl: "https://github.com/example/tokyo-hypr-dots",
  },
  {
    id: "s2",
    ownerId: "u3",
    title: "Declarative sway",
    distro: "NixOS",
    dewm: "sway",
    shell: "fish",
    terminal: "foot",
    description:
      "A whole sway desktop described in one Nix flake. Reproducible in minutes.",
    repoUrl: "https://gitlab.com/example/nix-sway-flake",
  },
  {
    id: "s3",
    ownerId: "u1",
    title: "Calm i3 for work",
    distro: "Debian",
    dewm: "i3",
    shell: "bash",
    terminal: "alacritty",
    description: "A quiet i3 setup with a simple bar and large readable fonts.",
    repoUrl: "https://github.com/example/calm-i3",
  },
  {
    id: "s4",
    ownerId: "u2",
    title: "GNOME but pretty",
    distro: "Fedora",
    dewm: "GNOME",
    shell: "bash",
    terminal: "GNOME Terminal",
    description:
      "Extensions, a dock and a custom theme that keeps GNOME feeling stock.",
    repoUrl: "https://github.com/example/pretty-gnome",
  },
  {
    id: "s5",
    ownerId: "u3",
    title: "Gruvbox bspwm",
    distro: "Void",
    dewm: "bspwm",
    shell: "zsh",
    terminal: "alacritty",
    description:
      "Warm gruvbox colors, tiling rules and a polybar made of small scripts.",
    repoUrl: "https://github.com/example/gruvbox-bspwm",
  },
];

export const mockReports: TReport[] = [
  {
    id: "r1",
    setupId: "s1",
    userId: "g1",
    userName: "Alex",
    distro: "Arch",
    verdict: "worked",
  },
  {
    id: "r2",
    setupId: "s1",
    userId: "g2",
    userName: "Jo",
    distro: "Arch",
    verdict: "worked",
  },
  {
    id: "r3",
    setupId: "s1",
    userId: "g3",
    userName: "Riya",
    distro: "Fedora",
    verdict: "worked",
  },
  {
    id: "r4",
    setupId: "s1",
    userId: "g4",
    userName: "Lee",
    distro: "Debian",
    verdict: "worked",
  },
  {
    id: "r5",
    setupId: "s1",
    userId: "g5",
    userName: "Omar",
    distro: "NixOS",
    verdict: "broke",
  },
  {
    id: "r6",
    setupId: "s2",
    userId: "g1",
    userName: "Alex",
    distro: "NixOS",
    verdict: "needed tweaks",
  },
];

export const mockQueue: TQueueEntry[] = [
  { userId: "u1", setupId: "s1", status: "to try" },
  { userId: "u1", setupId: "s2", status: "keeper" },
];
