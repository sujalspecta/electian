import React, { useState, useRef } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import Navbar2 from '../../components/Navbar2/Navbar2'
import PageTitle from '../../components/pagetitle/PageTitle'
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import vImg from '../../images/volunteer.jpg'
import TeamSection from '../../components/TeamSection/TeamSection';

const VolunteerPage = (props) => {
    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
        file: null,
        message: ''
    });

    const [, forceUpdate] = useState();

    const validator = useRef(new SimpleReactValidator({
        className: 'errorMessage',
        validators: {
            file_type: {
                message: 'The file must be a valid document format (PDF, DOC, DOCX).',
                rule: (val) => {
                    if (!val) return true;
                    const allowedExtensions = ['pdf', 'doc', 'docx'];
                    const fileExtension = val.name.split('.').pop().toLowerCase();
                    return allowedExtensions.includes(fileExtension);
                }
            }
        }
    }));

    const fileInputRef = useRef(null);

    const changeHandler = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setForms(prev => ({ ...prev, [name]: files[0] || null }));
        } else {
            setForms(prev => ({ ...prev, [name]: value }));
        }
        forceUpdate({});
    };

    const submitHandler = e => {
        e.preventDefault();
        if (validator.current.allValid()) {
            validator.current.hideMessages();
            setForms({
                name: '',
                email: '',
                subject: '',
                file: null,
                message: ''
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            forceUpdate({});
        } else {
            validator.current.showMessages();
            forceUpdate({});
        }
    };

    return (
        <div className="volunteer-page">
            <Navbar2 />
            <PageTitle pageTitle={'Volunteer'} pagesub={'Volunteer'} />
            <div className="volunteer-area">
                <div className="volunteer-wrap">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="volunteer-item">
                                    <div className="volunteer-img-wrap">
                                        <div className="volunter-img">
                                            <img src={vImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="volunteer-contact">
                                    <div className="volunteer-contact-form">
                                        <h2>Become a Volunteer</h2>
                                        <form onSubmit={submitHandler} className="contact-validation-active" id="contact-form-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                                                    <div className="form-field">
                                                        <input
                                                            value={forms.name}
                                                            type="text"
                                                            name="name"
                                                            onChange={changeHandler}
                                                            placeholder="Your Name" />
                                                        {validator.current.message('name', forms.name, 'required|alpha_space')}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group clearfix">
                                                    <div className="form-field">
                                                        <input
                                                            value={forms.email}
                                                            type="email"
                                                            name="email"
                                                            onChange={changeHandler}
                                                            placeholder="Your Email" />
                                                        {validator.current.message('email', forms.email, 'required|email')}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                                                    <div className="form-field">
                                                        <input
                                                            value={forms.subject}
                                                            type="text"
                                                            name="subject"
                                                            onChange={changeHandler}
                                                            placeholder="Your subject" />
                                                        {validator.current.message('subject', forms.subject, 'required|alpha_space')}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group form-group-in">
                                                    <label htmlFor="file">Upload Your CV</label>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        name="file"
                                                        id='file'
                                                        onChange={changeHandler} />
                                                    {validator.current.message('file', forms.file, 'required|file_type')}
                                                    <i className="ti-cloud-up"></i>
                                                </div>
                                                <div className="col-lg-12 col-12 form-group">
                                                    <textarea
                                                        onChange={changeHandler}
                                                        value={forms.message}
                                                        name="message"
                                                        placeholder="Message">
                                                    </textarea>
                                                    {validator.current.message('message', forms.message, 'required')}
                                                </div>
                                                <div className="submit-area col-lg-12 col-12">
                                                    <button type="submit" className="theme-btn submit-btn">Send Message</button>
                                                    <div id="loader">
                                                        <i className="ti-reload"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix error-handling-messages"></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TeamSection />
            <Footer />
            <Scrollbar />
        </div>
    )
}

export default VolunteerPage;
