import { uploadVideo } from "../../services/video_endpoints/videos";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "../../css/UploadPage/uploadPage.css";

export function UploadPage() {
    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [uploadState, setUploadState] = useState('');

    const handleSubmit = async (event) => {

        const videoFileSizeLimit = 10e6; // 10 MB
        const imageFileSizeLimit = 1e6; // 1 MB
        
        event.preventDefault();

        // Check file size and format constraints
        if (!videoName  || !description || !videoFile || !thumbnailImage) {
            setUploadState('failed');
            return;
        }
        if (videoFile.size > videoFileSizeLimit || !/\.mp4$/i.test(videoFile.name)) {
            setUploadState('failed');
            return;
        }
        if (thumbnailImage.size > imageFileSizeLimit || !/\.(jpe?g|png)$/i.test(thumbnailImage.name)) {
            setUploadState('failed');
            return;
        }

        // Upload video
        setUploadState('uploading');
        try {
            await uploadVideo(videoName, description, videoFile, thumbnailImage);
            setUploadState('success');

            // Reset form, if successful
            setVideoName('');
            setDescription('');
            setVideoFile(null);
            setThumbnailImage(null);
        } catch (error) {
            setUploadState('failed');

            if(error.response.data === 'Error: this endpoint can be called only in production')
                toast.error("This endpoint can be called only in production!");
        }
    };

    useEffect(() => {
        if (uploadState === 'success') {
          toast.success('Upload successful!');
        } else if (uploadState === 'failed') {
          toast.error('Upload failed. Please fill in all fields and select the video and thumbnail files.');
        }
      }, [uploadState]);

    //disable upload button while uploading, to prevent spamming
    const isFormDisabled = uploadState === 'uploading';

    return (
        <div className="videoUploadDiv">
                <div className="videoUploadCard">
                <h1>Video Upload</h1>
                {uploadState === 'uploading' && <span className="small_loader"></span>}
                <div className="uploadInputSection">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Video Name:
                        </label>
                        <input
                            className="upload-input-style"
                            type="text"
                            value={videoName}
                            onChange={(e) => setVideoName(e.target.value)}
                            disabled={isFormDisabled}
                        />
                        <label>
                            Description: 
                        </label>
                        <textarea
                            className="upload-input-style"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isFormDisabled}
                        />
                        <div className="LabelAndUploadDiv">
                            <label>
                                Video File:                       
                            </label>
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                    disabled={isFormDisabled}
                                />
                                {videoFile ? (
                                    <span className="file-selected">{videoFile.name}</span>
                                ) : (
                                    <>
                                        <i className="uil-file-upload-alt"></i> Upload video file
                                    </>
                                )}
                            </label>
                        
                            <label>
                                Thumbnail Image:
                            </label>
                            <label className="custom-file-upload">
                                <input
                                        className="upload-input-style"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setThumbnailImage(e.target.files[0])}
                                        disabled={isFormDisabled}
                                    />
                                {thumbnailImage ? (
                                    <span className="file-selected">{thumbnailImage.name}</span>
                                ) : (
                                    <>
                                        <i className="uil-file-upload-alt"></i> Upload thumbnail file
                                    </>
                                )}
                            </label>
                        </div>
                        <button className="uploadButton" type="submit" disabled={isFormDisabled}>Upload Video</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

