import { storage } from "../FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

export const uploadImage = (
    file,
    id,
    setModalOpen,
    setProgress,
    steCurrentImage
) => {
    const profilePicsRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (err) => {
            console.error(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                // console.log(response)
                editProfile(id, { imageLink: response });
                setModalOpen(false);
                steCurrentImage({});
                setProgress(0);
            });
        }
    );
};

export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postPicsRef = ref(storage, `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postPicsRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (err) => {
            console.error(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                setPostImage(response);
            });
        }
    );
};

export const uploadResume = (file, id, setProgress) => {
    const resumeRef = ref(storage, `resumes/${file.name}`);
    const uploadTask = uploadBytesResumable(resumeRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            console.log(progress);
        },
        (err) => {
            console.error(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref);
        }
    );
};
