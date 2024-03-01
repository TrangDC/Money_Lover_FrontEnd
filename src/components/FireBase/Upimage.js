
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import axios from "axios";
import {useNavigate} from "react-router-dom";
function UploadImage() {
    const[imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "images/")
    const [imageList, setImageList] = useState([])
    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const uploadImage = () => {
        if (imageUpload == null) return;
        const urls = `images/${imageUpload.name + v4()}`;
        const imageRef = ref(storage, urls);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                axios.put(`http://localhost:8080/api/users/${user.id}/uploadImage`, {
                    userId: user.id,
                    image: url
                }).then(() => {
                    localStorage.setItem("avatar", url);
                    alert("Image Uploaded");
                }).catch((error) => {
                    console.error("Error uploading image URL:", error);
                    alert("Error uploading image URL");
                });
                alert("Image Uploaded");
                navigate("/auth/home");
            });
        })
    }
    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => (
                        [...prev, url]
                    ))
                })
            })
        })
    }, [])

    const [images, setImage] = useState("")

    const users = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + users.id)
            .then(res => {
                console.log(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, )
    return (
        // <div className="App" style={{display: "flex"}}>
        //     <div>
        //         <img src={images}/>
        //     </div>
        //
        //     <div style={{margin: "50px 20px"}}>
        //         <input type="file" onChange={(e) => {setImageUpload((e.target.files[0]))}}/>
        //         <button onClick={uploadImage} type="button" className="btn btn-primary" data-mdb-ripple-init>Upload Image</button>
        //     </div>
        //
        // </div>

        <div style={{ padding: "20px" }}>
            <img src="https://note.moneylover.me/content/images/2017/05/Money-Lover---Logo.png" style={{ margin: 'auto', marginBottom: '20px'}}/>
            <div style={{margin: "auto", display: "flex", alignItems: "center"}}>
                <input type="file" onChange={(e) => {
                    setImageUpload(e.target.files[0])
                }} style={{ marginRight: "20px", padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <button onClick={uploadImage} type="button" className="btn btn-primary" style={{backgroundColor: "blue", color: "white", padding: "10px", fontSize: "16px", borderRadius: "5px"}}>
                    Upload Image
                </button>
            </div>
        </div>
    );
}

export default UploadImage;