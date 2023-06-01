import React, { useState } from 'react'
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}
const Profile = () => {
    const [myInterval, setMyInterval] = useState(0) 
    const [picture, setPicture] = useState('')
    const [started, setStated]=useState(false)
    const webcamRef = React.useRef(null)
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        console.log(pictureSrc)
        const formData = new FormData()
        formData.append("file", pictureSrc)
        const requestOptions = {
            method: "POST",
            body: formData
        };
        fetch("http://localhost:8000/uploadPhoto", requestOptions)
    })
    return (
        <div>
            <h2 className="mb-5 text-center">
                React Photo Capture using Webcam Examle
            </h2>
            <div>
                {picture == '' ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} />
                )}
            </div>
            <div>
                {started ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setStated(false)
                            clearInterval(myInterval)
                        }}
                        className="btn btn-primary"
                    >
                        Retake
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setStated(true)
                            const mInterval=setInterval(capture, 1000)
                            setMyInterval(mInterval)
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                )}
            </div>
        </div>
    )
}
export default Profile