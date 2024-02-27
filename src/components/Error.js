import React from 'react';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
const Error = () => {
    return (
        // <div style={{margin: "auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
        //     <div>
        //         <h2 style={{marginTop: "60%"}}>Bạn chưa có quyền truy cập</h2>
        //         <Link to={"/login"} style={{margin: "auto", display: "flex", justifyContent: "center", marginTop: "50px"}}>
        //             <button type="button" className="btn btn-primary" data-mdb-ripple-init>
        //                 Login Page
        //             </button>
        //         </Link>
        //     </div>
        //

        <div style={{backgroundColor: 'palegreen',height :'100vh'}}>
                <div style={{width: '500px',height: '150px',backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #fff',margin:'auto'}}>
                    <h2 style={{marginTop: '0', color: '#333'}}>Bạn chưa có quyền truy cập</h2>
                    <Link to="/login" style={{margin: 'auto', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                            Trang Đăng nhập
                        </button>
                    </Link>
                </div>
            <img src="https://note.moneylover.me/content/images/2017/05/Money-Lover---Logo.png" style={{ margin: 'auto'}}/>
            </div>
    );
};

export default Error;