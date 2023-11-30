return {
	{
		"folke/noice.nvim",
		dependencies = {
			"MunifTanjim/nui.nvim",
		},

		config = function ()
			require("noice").setup({
				cmdline = {
					enabled = true,
					view = "cmdline_popup",
				},
			})
		end
	},

	{
		"rcarriga/nvim-notify",
		config = function()
			require("notify").setup({
				background_colour = "#00000000"
			})
		end
	},

	{
		"nvimdev/dashboard-nvim",
		event = "VimEnter",
		config = function()
			require("dashboard").setup {
				theme = "hyper"
			}
		end,
		dependencies = {
			"nvim-tree/nvim-web-devicons"
		},
	},
}
