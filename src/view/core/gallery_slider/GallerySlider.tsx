


import React, { useState } from "react"
import "./slider.css"
import IconMaterial from "../universal/IconMaterial";
import {
    MdAdjust,
    MdArrowBack,
    MdArrowBackIos, MdArrowBackIosNew, MdArrowForward,
    MdArrowForwardIos,
    MdCheckBox,
    MdCheckBoxOutlineBlank
} from "react-icons/md";
import {css} from "@emotion/react";

type GallerySliderProps = {
    sliderWidth:string
    images: {
        url: string
        alt: string
    }[]
}

export function GallerySlider({ images,sliderWidth }: GallerySliderProps) {
    const [imageIndex, setImageIndex] = useState(0)

    function showNextImage() {
        setImageIndex(index => {
            if (index === images.length - 1) return 0
            return index + 1
        })
    }

    function showPrevImage() {
        setImageIndex(index => {
            if (index === 0) return images.length - 1
            return index - 1
        })
    }

    return (
        <section
            aria-label="Image Slider"
            style={{
                width:sliderWidth, height:'auto',
                position: "relative" }}
        >
            <a href="#after-image-slider-controls" className="skip-link">
                Skip Image Slider Controls
            </a>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflow: "hidden",
                }}
            >
                {images.map(({ url, alt }, index) => (
                    <img

                        key={url}
                        src={url}
                        alt={alt}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ width:sliderWidth, height:'auto', translate: `${-100 * imageIndex}%` }}
                    />
                ))}
            </div>
            <button
                onClick={showPrevImage}
                className="img-slider-btn"
                style={{ left: -40 }}
                aria-label="View Previous Image"
            >
                <IconMaterial size={12} icon={MdArrowBackIosNew} aria-hidden />
            </button>
            <button
                onClick={showNextImage}
                className="img-slider-btn"
                style={{ right: -40 }}
                aria-label="View Next Image"
            >
                <IconMaterial size={12} icon={MdArrowForwardIos} aria-hidden />
            </button>
            <div
                style={{
                    position: "absolute",
                    bottom: "-1rem",
                    left: "50%",
                    translate: "-50%",
                    display: "flex",
                    gap: ".25rem",
                }}
            >
                {images.map((_, index) => (
                    <button
                        key={index}
                        className="img-slider-dot-btn"
                        aria-label={`View Image ${index + 1}`}
                        onClick={() => setImageIndex(index)}
                    >
                        {index === imageIndex ? (
                            <IconMaterial icon={MdAdjust} aria-hidden />
                        ) : (
                            <IconMaterial icon={MdCheckBoxOutlineBlank} aria-hidden />
                        )}
                    </button>
                ))}
            </div>
            <div id="after-image-slider-controls" />
        </section>
    )
}

// const IMAGES = [
//         { url: 'https://lmt-web.mstatic.lv/eshop/28913/conversions/2-samsung-galaxy-s25-s931-icy-blue-860.webp', alt: "Car One" },
//         { url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a50/freeform/storage-d-0905.png', alt: "Car Two" },
//         { url: 'https://images.samsung.com/is/image/samsung/lv-galaxy-a50-sm-a505fzkse40--Black-308536043?$330_330_JPG$', alt: "Car Three" },
//     ]
//
//     <div css={css` width: 150px; height: 150px`}>
//     <GallerySlider sliderWidth={"80px"} images={IMAGES} />
// </div>
