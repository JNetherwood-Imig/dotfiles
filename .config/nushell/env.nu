let carapace_cache = "/home/jackson/.cache/carapace"
if not ($carapace_cache | path exists) {
    mkdir $carapace_cache
}
carapace _carapace nushell | save -f $"($carapace_cache)/init.nu"

let starship_cache = "/home/jackson/.cache/starship"
if not ($starship_cache | path exists) {
    mkdir $starship_cache
}
starship init nu | save -f /home/jackson/.cache/starship/init.nu
