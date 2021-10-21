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