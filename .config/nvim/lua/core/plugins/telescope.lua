return {
	"nvim-telescope/telescope.nvim",
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
					return vim.fn.expand("&:p:h")
				end
				telescope.extensions.file_browser.file_browser({
					path = "%:p:h",
					cwd = telescope_buffer_dir(),
					respect_gitignore = false,
					hidden = true,
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 40 },
				})
			end
		},

		{
			"<leader>ff",
			function ()
				require("telescope.builtin").find_files()
			end
		},

		{
			"<leader>fb",
			function ()
				require("telescope.builtin").buffers()
			end
		},

		{
			"<leader>gf",
			function ()
				require("telescope.builtin").git_files()
			end
		},
	},

	config = function ()
		local telescope = require("telescope")
		telescope.setup({
			extensions = {
				file_browser = {
					initial_mode = "insert",
					hijack_netrw = true,
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
