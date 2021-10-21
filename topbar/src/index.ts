import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ToolbarButton } from '@jupyterlab/apputils';

/**
 * Initialization data for the topbar extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'topbar:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension topbar is activated!');

    const button = new ToolbarButton({
      className: 'topbar-button',
      label: "Account",
      onClick: () => {
        console.log('clicked topbar account button')
      },
      tooltip: 'Account',
      iconClass: 'topbar-account-icon'
    })

    button.id = 'topbar-account-button'

    app.shell.add(button, 'top', {rank: 1000})
  }
};

export default plugin;
