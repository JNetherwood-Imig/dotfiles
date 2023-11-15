function ApplyColors(color)
	color = color or "github_dark"
	vim.cmd.colorscheme(color)

	vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
	vim.api.nvim_set_hl(0, "NormalNC", { bg = "none" })
	vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
	vim.api.nvim_set_hl(0, "NvimTreeNormal", { bg = "none" })
end

function NoTransparency()
	color = color or "github_dark"
	vim.cmd.colorscheme(color)
end

ApplyColors()
