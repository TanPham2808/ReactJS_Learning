import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SideBar = ({ collapsed }) => {
    return (
        <>
            <Sidebar collapsed={collapsed}>
                <Menu>
                    <MenuItem component={<Link to="/admins" />}> Dashboard </MenuItem>
                    <SubMenu label="Chức năng">
                        <MenuItem component={<Link to="/admins/manage-users" />}>
                            Quản lý Users
                        </MenuItem>
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