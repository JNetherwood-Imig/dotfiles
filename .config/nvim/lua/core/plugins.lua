local ensure_packer = function()
	local fn = vim.fn
	local install_path = fn.stdpath("data").."/site/pack/packer/start/packer.nvim"
	if fn.empty(fn.glob(install_path)) > 0 then
		fn.system({"git", "clone", "--depth", "1", "https://github.com/wbthomason/packer.nvim", install_path})
		vim.cmd [[packadd packer.nvim]]
		return true
	end
	return false
end

local packer_bootstrap = ensure_packer()

vim.cmd [[
	augroup packer_user_config
		autocmd!
		autocmd BufWritePost plugins.lua source <afile> | PackerSync
	augroup end
]]

local status_ok, packer = pcall(require, "packer")
if not status_ok then
	print("Could not locate packer.")
	return
end

packer.init {
	display = {
		open_fn = function()
			return require("packer.util").float { border = "rounded" }
		end,
	},
}

return require('packer').startup(function(use)
	use "wbthomason/packer.nvim"
	use "nvim-lua/popup.nvim"
	use "nvim-lua/plenary.nvim"
	use "windwp/nvim-autopairs"
	use "numToStr/Comment.nvim"
	use "JoosepAlviste/nvim-ts-context-commentstring"

	use "projekt0n/github-nvim-theme"
	-- use "xiyaowong/transparent.nvim"

	use "nvim-tree/nvim-tree.lua"
	use "nvim-tree/nvim-web-devicons"

	use ("nvim-treesitter/nvim-treesitter", {run = ":TSUpdate"})
	use "luckasRanarison/tree-sitter-hypr"
	use "bfg-coding/tree-sitter-yuck"

	use "theprimeagen/harpoon"

	use "nvim-telescope/telescope.nvim"

	use "neovim/nvim-lspconfig"
	use 'williamboman/mason.nvim'
	use 'williamboman/mason-lspconfig.nvim'
	use {
		'VonHeikemen/lsp-zero.nvim',
		branch = 'v3.x',
	}
	use "elkowar/yuck.vim"

	use "hrsh7th/nvim-cmp"
	use "hrsh7th/cmp-nvim-lsp"
	use "hrsh7th/cmp-buffer"
	use "hrsh7th/cmp-path"
	use "hrsh7th/cmp-cmdline"
	use "saadparwaiz1/cmp_luasnip"

	use "L3MON4D3/LuaSnip"
	use "rafamadriz/friendly-snippets"

	-- Automatically set up your configuration after cloning packer.nvim
	-- Put this at the end after all plugins
	if packer_bootstrap then
		require("packer").sync()
	end
end)
