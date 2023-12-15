return {
	"nvim-treesitter/nvim-treesitter",
	dependencies = {
		"luckasRanarison/tree-sitter-hypr",
		"p00f/nvim-ts-rainbow",
	},
	config = function()
		require("nvim-treesitter.configs").setup {
			ensure_installed = "all",

			sync_install = false,

			auto_install = true,

			highlight = {
				enable = true,

				additional_vim_regex_highlighting = true,
			},

			indent = {
				enable = true,
			},

			rainbow = {
				enable = false,
			},

		}

		local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
		parser_config.hypr = {
			install_info = {
				url = "https://github.com/luckasRanarison/tree-sitter-hypr",
				files = { "src/parser.c" },
				branch = "master",
			},
			filetype = "hypr",
		}
	end,
}
