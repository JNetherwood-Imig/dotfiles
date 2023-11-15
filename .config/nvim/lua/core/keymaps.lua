local opts = { noremap = true, silent = true }

local nvkeymap = vim.api.nvim_set_keymap
vim.g.mapleader = " "

vim.keymap.set("n", "<leader>of", vim.cmd.Ex)

nvkeymap("", "<Space>", "<Nop>", opts)

nvkeymap("n", "<leader>e", ":NvimTreeToggle<CR>", opts)
