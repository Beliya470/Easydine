import React, { useState } from 'react';
import axios from 'axios';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', { name, email, message });
      // Reset state and close modal on successful submission
      setName('');
      setEmail('');
      setMessage('');
      setModalVisible(false);
    } catch (error) {
      // Handle errors here, if necessary
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Contact Us</h1>

      {/* Encouraging Messages */}
      <div style={encouragingMessageContainerStyle}>
        <div style={encouragingColumnStyle}>
          <img
            src="https://media.istockphoto.com/id/1458164457/photo/businessman-using-laptop-and-smartphone-with-contact-icons-on-virtual-screen-searching-web.jpg?b=1&s=612x612&w=0&k=20&c=XBXzfezfpuRWKT0SZtnrktYv63fyZUMgBgPDvHArcbw="
            alt="Encouragement 1"
            style={encouragingImageStyle}
          />
          <p>
            Your feedback matters to us! Reach out and let's chat. We value your thoughts and opinions.
          </p>
        </div>
        <div style={encouragingColumnStyle}>
          <img
            src="https://media.istockphoto.com/id/1308052781/photo/hand-of-businessman-holding-mobile-smartphone-with-icon-customer-support-concept-copy-space.jpg?b=1&s=612x612&w=0&k=20&c=h-nnTyFpDimUotGsa-kd4z37JbSqdd4usnMIry-bpio="
            alt="Encouragement 2"
            style={encouragingImageStyle}
          />
          <p>
            We are here to assist you. Drop us a message anytime. Your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Images */}
      <div style={imagesContainerStyle}>
        <img
        //   src="https://via.placeholder.com/300"
          alt="Image 1"
          style={imageStyle}
        />
        <img
        //   src="https://via.placeholder.com/300"
          alt="Image 2"
          style={imageStyle}
        />
      </div>

      {/* Contact Us Button */}
      <button onClick={() => setModalVisible(true)} style={contactButtonStyle}>
        Contact Us
      </button>

      {modalVisible && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <span style={closeButtonStyle} onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit} style={contactFormStyle}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                style={inputStyle}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                style={inputStyle}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows="4"
                style={textareaStyle}
              />
              <button type="submit" style={submitButtonStyle}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Social Media Icons (Footer) */}
      <div style={footerStyle}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="facebook-icon.png"
            alt="Facebook"
            style={socialMediaIconStyle}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="twitter-icon.png"
            alt="Twitter"
            style={socialMediaIconStyle}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="instagram-icon.png"
            alt="Instagram"
            style={socialMediaIconStyle}
          />
        </a>
      </div>
    </div>
  );
}

// CSS Styles
const containerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'soft blue',
  color: 'dark blue',
};

const contactButtonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '24px',
  cursor: 'pointer',
  color: 'black',
};

const contactFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  width: '100%',
  minHeight: '150px',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  backgroundColor: '#002d5e',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const encouragingMessageContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const encouragingColumnStyle = {
  flex: 1,
  textAlign: 'center',
};

const encouragingImageStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  marginBottom: '10px',
};

const imagesContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: '20px',
};

const imageStyle = {
  width: '100%',
  maxWidth: '300px',
  margin: '0 10px 20px',
  borderRadius: '5px',
};

const footerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const socialMediaIconStyle = {
  width: '30px', // Adjust the size of social media icons
  height: '30px',
  margin: '0 10px',
};

export default ContactPage;
