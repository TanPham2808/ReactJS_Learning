import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideBar = ({ collapsed }) => {
    return (
        <>
            <Sidebar collapsed={collapsed}>
                <Menu>
                    <SubMenu label="Chartsdd">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar >
        </>
    )
}

export default SideBar;