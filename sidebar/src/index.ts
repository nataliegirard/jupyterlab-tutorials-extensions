import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { SidebarPanel } from './sidebar';

import { StackedPanel } from '@lumino/widgets';

class SidebarWidget extends StackedPanel {
  constructor() {
    super();
    this.addClass('jp-sidebar')
    this.id = 'sidebar';
    this.title.iconClass = 'jp-sidebar-icon';
    this.title.caption = 'Sidebar';

    const panel = new SidebarPanel();

    this.addWidget(panel)
  }
}

/**
 * Initialization data for the sidebar extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'sidebar:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension sidebar is activated!');

    const widget = new SidebarWidget();
    
    app.shell.add(widget, 'left', {rank: 1000});
  }
};

export default plugin;