import React from 'react';
import AnchorLinkc from 'react-anchor-link-smooth-scroll'
import './style.css'
const AnchorLink = AnchorLinkc.default || AnchorLinkc
const Scrollbar = () => {

    return(
        <div className="col-lg-12">
            <div className="header-menu">
                <ul className="smothscroll">
                    <li><AnchorLink href='#scrool'><i className="ti-arrow-up"></i></AnchorLink></li>
                </ul>
            </div>
        </div>
        
    )
}

export default Scrollbar;
