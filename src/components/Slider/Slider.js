import React, { useState } from 'react';
import "./Styles.scss";

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

import { sliderData } from './slider-data';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = sliderData.length

    const next = () => {
        setCurrentSlide(currentSlide === slideLength-1 ? 0 : currentSlide + 1)
    }
const prev = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength-1   : currentSlide - 1)
        
    }
  return (
    <div className='slider'>
        <AiOutlineDoubleLeft className='slider_left' onClick={prev}/>
        <AiOutlineDoubleRight className='slider_right' onClick={next}/>

        {sliderData.map((slide, index) => {
            const {image, heading, desc} = slide
            return (
                <div key={index} 
                className={index === currentSlide ? "slide current" : "slide"}>
                    {index === currentSlide && (
                        <>
                        <img src={image} alt="slide" />
                        <div className='slider_content'>
                            <h2>{heading}</h2>
                            <p>{desc}</p>
                            <hr/>
                            <a href='#product' className='--btn --btn-primary'>
                               Shop now 
                            </a>
                        </div>
                        </>
                    )}
                </div>
            )
        })}
      
    </div>
  )
}

export default Slider;
