require'nvim-treesitter.configs'.setup {
	-- a list of parser names, or "all" (the five listed parsers should always be installed)
	ensure_installed = { "nix", "python", "rust", "javascript", "c", "lua", "vim", "vimdoc", "query" },

	-- install parsers synchronously (only applied to `ensure_installed`)
	sync_install = false,

	-- automatically install missing parsers when entering buffer
	-- recommendation: set to false if you don't have `tree-sitter` cli installed locally
	auto_install = true,

	highlight = {
		enable = true,


		-- setting this to true will run `:h syntax` and tree-sitter at the same time.
		-- set this to `true` if you depend on 'syntax' being enabled (like for indentation).
		-- using this option may slow down your editor, and you may see some duplicate highlights.
		-- instead of true it can also be a list of languages
		additional_vim_regex_highlighting = false,
	},

	context_commentstring = {
		enable = true,
		enable_autocmd = false,
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
