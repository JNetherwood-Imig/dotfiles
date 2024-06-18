return {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    config = true,
    opts = {
        sync_install = false,
        auto_install = true,
        highlight = {
            enable = true,
            additional_vim_regex_highlighting = false
        },
        indent = { enable = true },
    },
}
