return {
    {
        "folke/noice.nvim",
        dependencies = {
            "MunifTanjim/nui.nvim",
            "rcarriga/nvim-notify",
        },
        config = true
    },
    {
        "rcarriga/nvim-notify",
        config = true,
        opts = {
            background_colour = "#000000"
        }
    }
}
