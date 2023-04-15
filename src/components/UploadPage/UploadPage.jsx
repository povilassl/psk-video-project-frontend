import { uploadVideo } from "../../services/video_endpoints/videos";
import { useState } from 'react';

export function UploadPage() {
    const [videoName, setVideoName] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [uploadState, setUploadState] = useState('');

    const handleSubmit = async (event) => {

        const videoFileSizeLimit = 10e6; // 10 MB
        const imageFileSizeLimit = 1e6; // 1 MB
        
        event.preventDefault();

        // Check file size and format constraints
        if (!videoName || !username || !description || !videoFile || !thumbnailImage) {
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
            await uploadVideo(videoName, username, description, videoFile, thumbnailImage);
            setUploadState('success');

            // Reset form, if successful
            setVideoName('');
            setUsername('');
            setDescription('');
            setVideoFile(null);
            setThumbnailImage(null);
        } catch (error) {
            setUploadState('failed');
            console.log(error);
        }
    };

    //disable upload button while uploading, to prevent spamming
    const isFormDisabled = uploadState === 'uploading';

    return (
        <div>
            <h1>Video Upload</h1>
            {uploadState === 'failed' && (
                <p className="error-message">
                    Please fill in all fields and select the video and thumbnail files. Or there may be an error with the server...
                </p>
            )}
            {uploadState === 'uploading' && <p className="uploading-message">Uploading...</p>}
            {uploadState === 'success' && <p className="success-message">Upload successful!</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Video Name:
                    <input
                        type="text"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        disabled={isFormDisabled}
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isFormDisabled}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isFormDisabled}
                    />
                </label>
                <br />
                <label>
                    Video File:
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        disabled={isFormDisabled}
                    />
                </label>
                <br />
                <label>
                    Thumbnail Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailImage(e.target.files[0])}
                        disabled={isFormDisabled}
                    />
                </label>
                <br />
                <button type="submit" disabled={isFormDisabled}>Upload Video</button>
            </form>
        </div>
    );
}
