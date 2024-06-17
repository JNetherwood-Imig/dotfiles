# Aliases
alias grep="rg --color always"
alias ls="ls --color"
alias yeet="yay -Rns"
alias la="ls -A"

# Set zinit directory
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

# Clone zinit if it is not present
if [ ! -d "$ZINIT_HOME" ]; then
	mkdir -p "$(dirname $ZINIT_HOME)"
	git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

# Load zinit
source "${ZINIT_HOME}/zinit.zsh"

# Load plugins with zinit
zinit ice depth=1
# zinit light jeffreytse/zsh-vi-mode
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light Aloxaf/fzf-tab

# Load completions
autoload -U compinit && compinit

# Completion styling
zstyle ":completion:*" matcher-list "m:{a-z}={A-Za-z}"
zstyle ":completion:*" list-colors "${(s.:.)LS_COLORS}"
zstyle ":completion:*" menu no
zstyle ":fzf-tab:complete:cd:*" fzf-preview "ls --color $realpath"

# Keybinds
bindkey -e
bindkey "^p" history-search-backward
bindkey "^n" history-search-forward

# Disable beep (peace is a lovely thing)
unsetopt BEEP

# History
HISTSIZE=5000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase

setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_find_no_dups

# Misc options
setopt globdots

# Shell integrations
eval "$(oh-my-posh init zsh --config ${XDG_CONFIG_HOME}/ohmyposh/config.yaml)"
eval "$(fzf --zsh)"
eval "$(zoxide init --cmd cd zsh)"
