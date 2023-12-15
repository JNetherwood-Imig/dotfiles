local keymap = vim.keymap
local opts = { noremap = true, silent = true }

vim.g.mapleader = " "

keymap.set("n", "+", "<C-a>")
keymap.set("n", "-", "<C-x>")
keymap.set("n", "<leader>l", vim.cmd.Lazy)
keymap.set("n", "<C-a>", "gg<S-v>G")

keymap.set("v", "<Tab>", ">")
keymap.set("v", "<S-Tab>", "<")

