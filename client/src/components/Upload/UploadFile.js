

function UploadFile({onUpload, onChange}) {

    return (
        <div>
            <input type="file" onChange={onChange} />
            <button onClick={onUpload}>Upload</button>
        </div>
    );
}

export default UploadFile;