return {
    "mfussenegger/nvim-dap",
    config = function()
        local dap = require("dap")
        vim.keymap.set("n", "<leader>db", dap.toggle_breakpoint, {})
        vim.keymap.set("n", "<leader>dc", dap.continue, {})
        vim.keymap.set("n", "<leader>di", dap.step_into, {})
        vim.keymap.set("n", "<leader>do", dap.step_out, {})
        vim.keymap.set("n", "<leader>du", dap.step_over, {})
    end,
}
