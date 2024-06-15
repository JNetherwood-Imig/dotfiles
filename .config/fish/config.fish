# nitch
starship init fish | source
set fish_greeting ''
if status is-interactive
end

# bun
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

alias fishcfg='nvim ~/.config/fish/config.fish'
alias vimcfg='nvim /home/jackson/.config/nvim/'
alias fzman='ls -a /bin | fzf | xargs man'
alias yeet="yay -Rns"
alias hyprcfg="nvim ~/.config/hypr"
