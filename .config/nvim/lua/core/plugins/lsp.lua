return {
	"VonHeikemen/lsp-zero.nvim", branch = "v3.x",
	dependencies = {
		"neovim/nvim-lspconfig",
		"williamboman/mason-lspconfig.nvim",
		"williamboman/mason.nvim",
	},
	config = function()
		local lsp_zero = require('lsp-zero')

		lsp_zero.on_attach(function(client, bufnr)
			lsp_zero.default_keymaps({buffer = bufnr})
		end)

		require("mason").setup()

		require('mason-lspconfig').setup({
			ensure_installed = {},
			handlers = {
				lsp_zero.default_setup,
			},
		})
	end
}
