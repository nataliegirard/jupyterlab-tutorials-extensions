# JupyterLab Tutorials: Extensions

This repo has examples on how to build various types of extensions for JupyterLab.

## Set up a JupyterLab local development environment

- Install miniforge
- Create conda environment for JupyterLab
  `conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=3 cookiecutter nodejs jupyter-packaging git`
- Activate conda environment
  `conda activate jupyterlab-ext`
- Run JupyterLab
  `jupyter lab`

### Building and installing extension

Use these same instructions to build and install each of the extensions

- From within the extension directory, run the following commands

```
> conda activate jupyterlab-ext
> pip install -e .
> jupyter labextension develop . --overwrite
> jlpm run build
```

- Verify the extension is installed with `jupyter labextension list`
- Run JupyterLab in watch mode while developing `jupyter lab --watch`

## Sidebar extension

- From project root directory, create a new extension using this command
  `cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts`
- Fill in the prompts for the extension

```
author_name []:
author_email []:
labextension_name [myextension]: sidebar
python_name [sidebar]:
project_short_description [A JupyterLab extension.]: Sidebar extension
has_settings [n]:
has_server_extension [n]:
has_binder [n]: y
repository [https://github.com/github_username/sidebar]:
```

- We need to install the `@lumino/widgets` package to get access to the `Stacked Panel` component
  `jlpm add @lumino/widgets`
- We will also include a `ReactWidget` within our sidebar
  `jlpm add @jupyterlab/apputils`
- Rebuild the extension in watch mode
  `jlpm run watch`

- Add a new file: `sidebar/schema/plugin.json` containing:

```
{
    "jupyter.lab.setting-icon-class": "jp-sidebar-icon",
    "jupyter.lab.setting-icon-label": "Sidebar example",
    "title": "Sidebar example",
    "description": "Sidebar example",
    "additionalProperties": false,
    "type": "object"
}
```

- Add an svg icon to the `style` directory for the sidebar icon. The repo has an example `tools.svg` file
- Add styles to `base.css` to add the svg icon to the sidebar and to set the background and padding for the sidebar panel

```
.jp-sidebar-icon {
  background-image: url(tools.svg);
}

.jp-sidebar {
  background-color: white;
  padding: 10px;
}
```

- add a `SidebarWidget` class to `index.ts` that extends `StackedPanel`

```
import { SidebarPanel } from './sidebar';
import { StackedPanel } from '@lumino/widgets';

class SidebarWidget extends StackedPanel {
    constructor() {
        super();
        this.addClass('jp-sidebar');
        this.id = 'sidebar';
        this.title.iconClass = 'jp-sidebar-icon';
        this.title.caption = 'Sidebar';

        const panel = new SidebarPanel();
        this.addWidget(panel);
    }
}
```

- Create a `SidebarPanel` component in a separate `sidebar.tsx` that will contain the data for the sidebar panel. For the sake of an example, user data is being fetched from jsonplaceholder.typicode.com and presented within a table

```
// src/sidebar.tsx
import { ReactWidget } from "@jupyterlab/apputils";

import React, {useState, useEffect} from 'react';

type User = {
    id: number,
    name: string,
    email: string,
    address: {city: string}
}

const SidePanelComponent = (): JSX.Element => {
    const [ users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            setUsers(data)
        };
        fetchData();
    }, [])

    return (
        <div>
            <p>This is an example side panel</p>
            <h2>Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">City</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.city}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export class SidebarPanel extends ReactWidget {
    constructor() {
        super();
        this.addClass('sidebar-panel-widget')
    }

    render(): JSX.Element {
        return <SidePanelComponent />;
    }
}
```

- Modify the main JupyterFrontEndPlugin code from index.ts to include the sidebar extension to the left bar within JupyterLab

```
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'sidebar:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension sidebar is activated!');

    const widget = new SidebarWidget();

    app.shell.add(widget, 'left', {rank: 1000});
  }
};
```

- Run JupyterLab using `jupyter lab`. You may need to resize the left sidebar to be able to see all the user table data.
