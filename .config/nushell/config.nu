# Imports
source /home/jackson/.cache/carapace/init.nu
source /home/jackson/.cache/starship/init.nu

# Autostart
nitch

# Aliases
alias hyprcfg = nvim ~/.config/hypr/
alias nucfg = nvim ~/.config/nushell/config.nu
alias hcl = hyprctl clients
alias agscfg = nvim ~/.config/ags/
alias vimcfg = nvim ~/.config/nvim/
alias dotfiles = /usr/bin/git --git-dir=$HOME/.dots/ --work-tree=$HOME
alias vcInstall = sudo /home/jackson/Repos/Installer/VencordInstaller --install
alias vcUninstall = sudo /home/jackson/Repos/Installer/VencordInstaller --uninstall

$env.config = {
    show_banner: false
}

let carapace_cache = "/home/jackson/.cache/carapace"
if not ($carapace_cache | path exists) {
    mkdir $carapace_cache
}

carapace _carapace nushell | save -f $"($carapace_cache)/init.nu"

