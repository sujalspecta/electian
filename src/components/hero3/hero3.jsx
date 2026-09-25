import { Link } from 'react-router-dom';
// 1. Added Parallax JavaScript Module
import { Navigation, A11y, Parallax } from "swiper/modules"; 
import { Swiper, SwiperSlide } from "swiper/react";

// 2. Added Core and Feature Specific CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax'; 

import hero1 from '../../images/slider/slide-7.jpg';
import hero2 from '../../images/slider/slide-8.jpg';

const Hero3 = () => {

    const ClickHandler = () => {
        window.scrollTo(0, 0); // Corrected to absolute top (0, 0)
    };

    return (
        // 3. Enforced explicit parent viewport dimensions
        <section className="wpo-hero-slider-s2" style={{ width: '100%', height: '100vh' }}>
            {/* 4. REMOVED manual .swiper-container and .swiper-wrapper elements */}
            <Swiper
                modules={[Navigation, A11y, Parallax]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                speed={1800}
                parallax={true}
                navigation={true}
                
                // 5. Explicitly sized the Swiper element to fill the section
                style={{ width: "100%", height: "100%" }} 
                
                // 6. Configured DOM Observer guards
                observer={true}
                observeParents={true}
                
                // 7. Configured Asynchronous Init Defibrillator
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
                    {/* Cleaned up duplicate nested slide-inner container */}
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero1})`, width: "100%", height: "100%" }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                {/* Using standard negative values for smoother left-to-right parallax entry */}
                                <div data-swiper-parallax="-300" className="slide-title">
                                    <h2>Life Without Liberty, As like Hell.</h2>
                                </div>
                                <div data-swiper-parallax="-400" className="slide-text">
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the scrambled it to make.</p>
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
                                    <h2>World Needs A Leader</h2>
                                </div>
                                <div data-swiper-parallax="-400" className="slide-text">
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the scrambled it to make.</p>
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

export default Hero3;
