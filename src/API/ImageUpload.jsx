import {storage} from "../FirebaseConfig";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { editProfile } from "./FirestoreAPI";


export const uploadImage = (file, id) => {
    
    const profilePicsRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
    }, (err) => {
        console.error(err);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            // console.log(response)
            editProfile(id, {imageLink: response});
        });
    });
};
