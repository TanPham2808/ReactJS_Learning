import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideBar = ({ collapsed }) => {
    return (
        <>
            <Sidebar collapsed={collapsed}>
                <Menu>
                    <SubMenu label="Chức năng">
                        <MenuItem> Quản lý Users </MenuItem>
                        <MenuItem> Quản lý Bài Quiz </MenuItem>
                        <MenuItem> Quản lý Câu Hỏi </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar >
        </>
    )
}

export default SideBar;