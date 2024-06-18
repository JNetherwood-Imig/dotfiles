return {
    {
        "nvim-telescope/telescope.nvim",
        branch = "0.1.x",
        dependencies = { "nvim-lua/plenary.nvim" },
        config = function()
            local telescope = require("telescope.builtin")

            vim.keymap.set("n", "<leader>ff", telescope.find_files, {})
            vim.keymap.set("n", "<leader>fg", telescope.live_grep, {})
        end
    },
    {
        "nvim-telescope/telescope-ui-select.nvim",
        config = function()
            local telescope = require("telescope")
            telescope.setup({
                extensions = {
                    [ "ui-select" ] = {
                        require("telescope.themes").get_dropdown({})
                    }
                }
            })
            telescope.load_extension("ui-select")
        end
    }
}
