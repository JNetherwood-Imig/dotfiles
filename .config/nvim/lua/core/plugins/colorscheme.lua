return {
	"projekt0n/github-nvim-theme",
	priority = 1000,
	config = function()
		vim.cmd([[colorscheme github_dark]])
		vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
		vim.api.nvim_set_hl(0, "NormalNC", { bg = "none" })
		vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
		vim.api.nvim_set_hl(0, "NvimTreeNormal", { bg = "none" })
	end,
}
