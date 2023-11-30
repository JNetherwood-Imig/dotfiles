return {
	"nvim-tree/nvim-tree.lua",
	config = function()
		local nvimtree = require("nvim-tree")

		nvimtree.setup({
			view = {
				width = 30,
			},

			hijack_netrw = false,
		})

		local keymap = vim.keymap

		keymap.set("n", "<leader>ef", vim.cmd.NvimTreeFocus)
		keymap.set("n", "<leader>ee", vim.cmd.NvimTreeToggle)
		keymap.set("n", "<leader>ec", vim.cmd.NvimTreeCollapse)
		keymap.set("n", "<leader>er", vim.cmd.NvimTreeRefresh)
	end,
}
