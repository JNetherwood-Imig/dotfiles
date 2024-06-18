return {
    "kylechui/nvim-surround",
    config = function ()
        require("nvim-surround").setup()
        vim.keymap.set("n", "<leader>ss", 'ys$"')
    end
}
