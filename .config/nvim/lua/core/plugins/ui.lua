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
		opts = function()
			local logo = [[
			███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗
			████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║
			██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║
			██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║
			██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║
			╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝
			]]

			logo = string.rep("\n", 4) .. logo .. "\n\n"

			local opts = {
				theme = "doom",
				hide = {
					-- this is taken care of by lualine
					-- enabling this messes up the actual laststatus setting after loading a file
					statusline = false,
				},
				config = {
					header = vim.split(logo, "\n"),
					-- stylua: ignore
					center = {
						{
							action = "lua require('telescope').extensions.file_browser.file_browser({ previewer = false, initial_mode = 'normal', layout_config = { height = 30 }, })",
							desc = " Browse Files",
							icon = " ", key = "o"
						},
						{
							action = "lua require('telescope.builtin').find_files({ previewer = false, initial_mode = 'normal', layout_config = { height = 30 }, })",
							desc = " Find file",
							icon = " ", key = "f"
						},
						{ action = "ene | startinsert",                                        desc = " New file",        icon = " ", key = "n" },
						{
							action = "lua require('telescope.builtin').oldfiles({ previewer = false, initial_mode = 'normal', layout_config = { height = 30 }, })",
							desc = " Recent files",
							icon = " ", key = "r"
						},
						{
							action = "lua require('telescope.builtin').live_grep({ initial_mode = 'insert', layout_config = { height = 30 }, })",
							desc = " Find text",
							icon = " ", key = "g"
						},
						{ action = "Lazy",                                                     desc = " Lazy",            icon = "󰒲 ", key = "l" },
						{ action = "qa",                                                       desc = " Quit",            icon = " ", key = "q" },
					},
				},
			}

			for _, button in ipairs(opts.config.center) do
				button.desc = button.desc .. string.rep(" ", 43 - #button.desc)
				button.key_format = "  %s"
			end

			-- close Lazy and re-open when the dashboard is ready
			if vim.o.filetype == "lazy" then
				vim.cmd.close()
				vim.api.nvim_create_autocmd("User", {
					pattern = "DashboardLoaded",
					callback = function()
						require("lazy").show()
					end,
				})
			end

			return opts
		end,
		dependencies = {
			"nvim-tree/nvim-web-devicons",
		event = "VimEnter",
		},
	},
}
