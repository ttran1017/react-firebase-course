import React, { useState } from "react";
import { db, auth, storage } from "../config/Firebase";
import { ref, uploadBytes } from "firebase/storage";

function Storage() {
  // File uplaod state
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `ProjectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => setFileUpload(event.target.files[0])}
      />
      <button onClick={uploadFile}>Upload file</button>
    </div>
  );
}

export default Storage;
