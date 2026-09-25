import { Link } from 'react-router-dom';
import { Navigation, A11y, Parallax } from "swiper/modules"; 
import { Swiper, SwiperSlide } from "swiper/react";

// 1. Bundle Modules with Core & Feature CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax'; // Added Parallax Feature Stylesheet!

import hero1 from '../../images/slider/slide-6.jpg';
import hero2 from '../../images/slider/slide-4.jpg';
import hero3 from '../../images/slider/slide-8.jpg';

const Hero = () => {
    const ClickHandler = () => {
        window.scrollTo(0, 0); 
    };

    return (
        <section className="wpo-hero-slider-s2 wpo-hero-slider-1" style={{ width: '100%', height: '100vh' }}>
            <Swiper
                modules={[Navigation, A11y, Parallax]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1800}
                parallax={true}
                navigation={true}
                pagination={{ clickable: true }} 
                
                // 2. Declare explicit Dimensions upfront
                style={{ width: "100%", height: "100%" }} 
                
                // 3. DOM Observers Activated
                observer={true}
                observeParents={true}
                
                // 4. Standard "Init Defibrillator" Lifecycle Hook
                onSwiper={(swiper) => {
                    setTimeout(() => {
                        if (swiper && !swiper.destroyed) {
                            swiper.update();
                        }
                    }, 150);
                }}
            >
                {/* Slide 1 */}
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero1})`, width: "100%", height: "100%" }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                <div data-swiper-parallax="-300" className="slide-title">
                                    <h2>Life Without Liberty, As like Hell.</h2>
                                </div>
                                <div data-swiper-parallax="-400" className="slide-text">
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                                <div className="clearfix"></div>
                                <div data-swiper-parallax="-500" className="slide-btns">
                                    <Link onClick={ClickHandler} to="/about" className="theme-btn-s3">JOIN THE CAMPAIGN</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero2})`, width: "100%", height: "100%" }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                <div data-swiper-parallax="-300" className="slide-title">
                                    <h2>Let's Make America Great Again</h2>
                                </div>
                                <div data-swiper-parallax="-400" className="slide-text">
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                                <div className="clearfix"></div>
                                <div data-swiper-parallax="-500" className="slide-btns">
                                    <Link onClick={ClickHandler} to="/about" className="theme-btn-s3">JOIN THE CAMPAIGN</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero3})`, width: "100%", height: "100%" }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                <div data-swiper-parallax="-300" className="slide-title">
                                    <h2>Life Without Liberty, As like Hell.</h2>
                                </div>
                                <div data-swiper-parallax="-400" className="slide-text">
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                                <div className="clearfix"></div>
                                <div data-swiper-parallax="-500" className="slide-btns">
                                    <Link onClick={ClickHandler} to="/about" className="theme-btn-s3">JOIN THE CAMPAIGN</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
