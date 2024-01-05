import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState("/");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer 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",
                    },
                    body: JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            const data = await response.json();
            const dataArray = data.data;

            setImageUrl(dataArray[0].url);
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
                <div className="generate-btn" onClick={generateImage}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;
