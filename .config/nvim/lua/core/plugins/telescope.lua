return {
	"nvim-telescope/telescope.nvim",
	event = "VimEnter",
	dependencies = {
		"nvim-telescope/telescope-file-browser.nvim",
		"nvim-telescope/telescope-fzy-native.nvim",
	},

	keys = {
		{
			"<C-o>",
			function ()
				local telescope = require("telescope")
				local function telescope_buffer_dir()
					return vim.fn.expand("%:p:h")
				end
				telescope.extensions.file_browser.file_browser({
					path = "%:p:h",
					cwd = telescope_buffer_dir(),
					respect_gitignore = false,
					hidden = true,
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 30 },
				})
			end
		},

		{
			"<leader>ff",
			function ()
				require("telescope.builtin").find_files({
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 30 },
				})
			end
		},

		{
			"<leader>fb",
			function ()
				require("telescope.builtin").buffers({
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 30 },
				})
			end
		},

		{
			"<leader>gf",
			function ()
				require("telescope.builtin").git_files({
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 30 },
				})
			end
		},
	},

	config = function ()
		local telescope = require("telescope")
		local fb_actions = telescope.extensions.file_browser.actions

		telescope.setup({
			wrap_results = true,
			layout_strategy = "horizontal",
			layout_config = { prompt_position = "top" },
			sorting_strategy = "ascending",
			winblend = 0,
			mappings = {
				n = {},
			},
			extensions = {
				file_browser = {
					hijack_netrw = true,
					theme = "dropdown",
					grouped=true,
					mappings = {
						["n"] = {
							-- normal mode mappings
							["N"] = fb_actions.create,
							["h"] = fb_actions.goto_parent_dir,
						}
					},
				},
				fzy_native = {
					override_generic_sorter = false,
					override_file_sorter = true,
				},
			},
		})

		telescope.load_extension("file_browser")
		telescope.load_extension("fzy_native")

	end,

}
