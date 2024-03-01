import React from 'react';
import {Sidebar, Menu, MenuItem, SubMenu, menuClasses} from 'react-pro-sidebar';
import { IoReorderThree } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
const SideBar = () => {
    const [toggled, setToggled] = React.useState(false);
    return (
        <div>
            <div style={{ display: 'flex', height: '100%', minHeight: '400px',background: 'none' }}>
                <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
                    <Menu>
                        <SubMenu label="Charts" >
                            <MenuItem> Pie charts</MenuItem>
                            <MenuItem> Line charts</MenuItem>
                            <MenuItem> Bar charts</MenuItem>
                        </SubMenu>
                        <MenuItem active >
                            Calendar (active)
                        </MenuItem>
                        <MenuItem disabled >
                            E-commerce (disabled)
                        </MenuItem>
                        <MenuItem > Examples</MenuItem>
                    </Menu>
                </Sidebar>
                {/*<div style={{ display: 'flex', height: '100vh', width: '6%', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>*/}
                {/*    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',margin: 'auto',textAlign: 'center'}}>*/}
                {/*        <IoReorderThree style={{ width: '30px', height: '30px',marginTop: '40%',color: '#696969' }} onClick={() => setToggled(!toggled)} />*/}
                {/*        <span style={{marginTop: '40%'}}>*/}
                {/*             <MdAccountBalanceWallet style={{ width: '30px', height: '30px',marginTop: '5%',color: '#696969' }}/>*/}
                {/*            Transactions*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div style={{ display: 'flex', height: '100vh', width: '6%', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: '40%', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <IoReorderThree className= "ml-3" style={{ width: '30px', height: '30px', color: '#696969' }} onClick={() => setToggled(!toggled)} />
                        </div>
                        <div style={{ marginTop: '40%', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <MdAccountBalanceWallet className= "ml-2.5" style={{ width: '25px', height: '25px', color: '#228B22' }}/>
                            <span className= "ml-2.5" style={{ marginTop: '5px', textAlign: 'center',color: '#228B22' }}>Transactions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;