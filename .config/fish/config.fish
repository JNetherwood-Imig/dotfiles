# nitch
starship init fish | source
set fish_greeting ''
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dots/ --work-tree=$HOME'
alias fishcfg='nvim ~/.config/fish/config.fish'
alias hyprcfg='nvim ~/.config/hypr/'
alias hcl='hyprctl clients'
alias vimcfg='nvim /home/jackson/.config/nvim'
alias agscfg='nvim /home/jackson/.config/ags/'
if status is-interactive
    # Commands to run in interactive sessions can go here
end
