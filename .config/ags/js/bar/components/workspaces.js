import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { Box, Button, EventBox, Label } from 'resource:///com/github/Aylur/ags/widget.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

export const Workspaces = ({ fixed = 10, indicator, ...props } = {}) =>
Box({
  ...props,
  children: Array.from({ length: fixed }, (_, i) => i + 1).map((i) =>
  Button({
    onClicked: () =>
          execAsync(`hyprctl dispatch workspace ${i}`).catch(print),
          child: indicator ? indicator() : Label(`${i}`),
          connections: [
            [
            Hyprland, (btn) => {
              const { active } = Hyprland;
              const occupied = Hyprland.getWorkspace(i)?.windows > 0;
              
              btn.toggleClassName("active", active.workspace.id === i);
              btn.toggleClassName("occupied", occupied);
              btn.toggleClassName("empty", !occupied);
            },
          ],
        ],
      })
      ),
    });
    
    export default (props) =>
    Box({
    ...props,
    className: "workspaces__panel panel-button",
    children: [
      Box({
        children: [
          EventBox({
            className: "eventbox",
            child: Workspaces({
              indicator: () =>
              Box({
                className: "indicator",
                valign: "center",
                children: [Box({ className: "fill" })],
              }),
            }),
          }),
        ],
      }),
    ],
  });