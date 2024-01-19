import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
// Images already imported
import MainBanner from '../assets/pexels-elevate-1267320.jpg';
import DiningExperience from '../assets/pexels-nadezhda-moryak-6229458.jpg';
import RoomPreview from '../assets/pexels-vincent-rivaud-2363807.jpg';
import Image4 from '../assets/pexels-rachel-claire-5490150.jpg';
import Image5 from '../assets/pexels-tim-douglas-6210764.jpg';
import Image6 from '../assets/pexels-vincent-rivaud-2363807.jpg';
import Image7 from '../assets/pexels-tim-douglas-6210764.jpg';
import Image8 from '../assets/pexels-vincent-rivaud-2363807.jpg';
import Image9 from '../assets/pexels-vincent-rivaud-2363807.jpg';





// Placeholder imports (use actual imports in your project)
import RoomPlaceholder from '../assets/pexels-vincent-rivaud-2363807.jpg';
import Image10 from '../assets/pexels-tim-douglas-6210764.jpg';
import Image11 from '../assets/pexels-vincent-rivaud-2363807.jpg';
import Image12 from '../assets/pexels-vincent-rivaud-2363807.jpg';

function HomePage() {
  const [showMore, setShowMore] = useState(false);
  const [expandedRoom, setExpandedRoom] = useState(null); // Define expandedRoom state here

  // Toggle function for "Show More" / "Show Less"
  const handleShowMore = (roomName) => {
    setExpandedRoom(expandedRoom === roomName ? null : roomName); // Correctly toggle expandedRoom state
  }; 


  // Define the details for each room
  const guestRooms = [
    {
      name: "Classic Room",
      description: "Our Classic Room is a tribute to timeless British charm, offering a comfortable double bed enveloped in luxurious linens, perfect for a restful night's sleep.",
      size: "25 Sq Mt",
      wifi: "Inclusive high-speed WiFi",
      occupancy: "Up to 2 guests",
      bedType: "Opulent double bed",
      style: "Classic British-styled decor with warm tones",
      image: RoomPlaceholder,
      unavailable: false
    },
    {
      name: "Classic King Room",
      description: "Experience stately elegance in our Classic King Room. It's equipped with a luxurious king-sized bed and an array of amenities to provide a royal stay.",
      size: "35 Sq Mt",
      wifi: "Complimentary high-speed WiFi",
      occupancy: "Ideal for up to 2 guests",
      bedType: "Regal king-sized bed",
      style: "Sophisticated decor with a touch of classic comfort",
      image: Image10, // Replace with actual image file path
      unavailable: false
      
      
    },
    {
      name: "Executive Room",
      description: "Designed for success, our Executive Room offers a sleek, professional space with a comfortable double bed and a work area to keep you productive and relaxed.",
      size: "25 Sq Mt",
      wifi: "Unlimited WiFi access",
      occupancy: "Perfect for up to 2 guests",
      bedType: "Comfortable double bed",
      style: "Modern design with functional elegance",
      image: Image11, // Replace with actual image file path
      unavailable: false
      
    },
    {
      name: "Premium Suite",
      description: "Our Premium Suite is a sanctuary of luxury, featuring a spacious king bed, elegant furnishings, and premium amenities for an exclusive and unforgettable stay.",
      size: "21 Sq Mt",
      wifi: "High-speed WiFi at your fingertips",
      occupancy: "Exclusive for 1 guest",
      bedType: "Expansive king bed",
      style: "Contemporary suite with upscale design elements",
      image: Image12, // Replace with actual image file path
      unavailable: false
      
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="home-page">
      {/* Header and other content */}

      {/* Guest Rooms Section */}
      <section className="guest-rooms-section">
        <header>
          <h2>Guest Rooms</h2>
          <Link to="/booking" className="see-more-link">SEE MORE</Link>
        </header>
        <div className="guest-rooms-container">
          {guestRooms.map((room, index) => (
            <div key={index} className="room-card">
              <img src={room.image} alt={room.name} className="room-image" />
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{expandedRoom === room.name ? room.description : `${room.description.substring(0, 100)}...`}</p>
                <ul className="room-details">
                  <li><img src="/path/to/size-icon.svg" alt="Size"/> {room.size}</li>
                  <li><img src="/path/to/wifi-icon.svg" alt="WiFi"/> {room.wifi}</li>
                  <li><img src="/path/to/occupancy-icon.svg" alt="Occupancy"/> {room.occupancy}</li>
                  <li><img src="/path/to/bed-icon.svg" alt="Bed Type"/> {room.bedType}</li>
                  <li><img src="/path/to/style-icon.svg" alt="Style"/> {room.style}</li>
                </ul>
                <button onClick={() => handleShowMore(room.name)}>
                  {expandedRoom === room.name ? 'Show Less' : 'Show More'}
                </button>
                {room.unavailable && <div className="unavailable">Currently Unavailable</div>}
              </div>
            </div>
          ))}
        </div>
      </section>






      <section className="hotel-info-section">
        <div className="hotel-info-images">
          <img src={MainBanner} alt="Main Banner" />
          <img src={DiningExperience} alt="Dining Experience" />
          <img src={RoomPreview} alt="Room Preview" />
          <img src={Image4} alt="Additional Image 4" />
          <img src={Image5} alt="Additional Image 5" />
          <img src={Image6} alt="Additional Image 6" />
          <img src={Image7} alt="Additional Image 7" />
          <img src={Image8} alt="Additional Image 8" />
          <img src={Image9} alt="Additional Image 9" />
         </div>

        <div className="hotel-info-content">
          <h1>EasyDine, A Culinary Retreat</h1>
          <p className="hotel-description">
            {showMore ? (
              `EasyDine offers an unforgettable experience with its gourmet dining, luxurious rooms,
               and first-class service. Nestled in the heart of the city, our hotel boasts a timeless elegance
               and a legacy of impeccable hospitality. Since opening our doors, we've been an escape for those 
               seeking a stay of comfort and sophistication.`
            ) : (
              `EasyDine offers an unforgettable experience with its gourmet dining and luxurious rooms. Nestled in the heart...`
            )}
            <button onClick={() => handleShowMore()} className="show-more-btn">

            
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </p>
          <div className="hotel-highlights">
          <div className="hotel-highlights">
            <h4 className="centered-heading">Hotel Highlights</h4>
            <ul className="highlight-list">
              <li><span className="icon">🏋️</span> 24-Hour Fitness Centre</li>
              <li><span className="icon">🍽️</span> Quilon - Michelin Starred Restaurant</li>
              <li><span className="icon">🏊</span> Outdoor Pool</li>
              <li><span className="icon">🛏️</span> Luxurious Suites</li>
              <li><span className="icon">🚗</span> Complimentary Parking</li>
              <li><span className="icon">🍸</span> Cocktail Lounge</li>
            </ul>
          </div>
          <div className="hotel-policies">
          <h4 className="centered-heading">Hotel Policies</h4>
          <ul className="policy-list">
            <li>Check-in: 3:00 PM</li>
            <li>Check-out: 12:00 Noon</li>
            <li>Cancelation Policy: 24 hours prior to check-in</li>
            <li>Pets Allowed: No</li>
            <li>Smoking Allowed: No</li>
            <li>Children: Welcome</li>
            <li>Additional Bed: Available on request</li>
          </ul>
            
          </div>
          <Link to="/booking" className="btn-primary">Reserve</Link>
          </div>
        </div>
      </section>
    
      
    
    

      <section className="hotel-features">
        <div className="feature">
          <span className="icon">🍽️</span>
          <h3>Special Orders</h3>
          <p>Customize your dining experience with our special order service.</p>
          <Link to="/special-order" className="btn-primary">Place a Special Order</Link>
        </div>
        <div className="feature">
          <span className="icon">🏨</span>
          <h3>Effortless Bookings</h3>
          <p>Book your stay with ease using our seamless online reservation system.</p>
          <Link to="/booking" className="btn-primary">Reserve Now</Link>
        </div>
        <div className="feature">
          <span className="icon">🚚</span>
          <h3>Reliable Deliveries</h3>
          <p>Enjoy the convenience of our prompt in-room delivery service.</p>
          <Link to="/delivery" className="btn-primary">Order Delivery</Link>
        </div>
      </section>
      {/* Subscription Section */}
      <section className="subscription-section">
        <h2>Subscribe for Exclusive Offers</h2>
        <p>Don't miss out on our latest deals and promotions. Subscribe now!</p>
        <form onSubmit={handleSubmit} className="subscription-form">
          {/* Input field for email */}
          {/* Add appropriate input element and label here */}
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="hotel-footer">
        <nav className="footer-navigation">
          <Link to="/login" className="footer-link">Login/Register</Link>
          <Link to="/profile" className="footer-link">Profile</Link>
          <Link to="/orders" className="footer-link">View Orders</Link>
          <Link to="/feedback" className="footer-link">Feedback</Link>
        </nav>
        <p>Join us on a culinary and comfort adventure at EasyDine.</p>
        <div className="social-icons">
          <a href="#" className="social-icon"><span className="icon">📷</span></a>
          <a href="#" className="social-icon"><span className="icon">📘</span></a>
          <a href="#" className="social-icon"><span className="icon">🐦</span></a>
          <a href="#" className="social-icon"><span className="icon">📽️</span></a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;



  















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css';
// // Images already imported
// import MainBanner from '../assets/pexels-elevate-1267320.jpg';
// import DiningExperience from '../assets/pexels-nadezhda-moryak-6229458.jpg';
// import RoomPreview from '../assets/pexels-vincent-rivaud-2363807.jpg';
// import Image4 from '../assets/pexels-rachel-claire-5490150.jpg';
// import Image5 from '../assets/pexels-tim-douglas-6210764.jpg';
// import Image6 from '../assets/pexels-vincent-rivaud-2363807.jpg';
// import Image7 from '../assets/pexels-tim-douglas-6210764.jpg';
// import Image8 from '../assets/pexels-vincent-rivaud-2363807.jpg';
// import Image9 from '../assets/pexels-vincent-rivaud-2363807.jpg';



// // // Import icons from react-icons library
// // import { AiOutlineArea, AiOutlineWifi, AiOutlineUser, AiOutlineBed, AiOutlineStyle } from 'react-icons/ai';

// // // ...

// // Placeholder imports (use actual imports in your project)
// import RoomPlaceholder from '../assets/pexels-vincent-rivaud-2363807.jpg';
// import Image10 from '../assets/pexels-tim-douglas-6210764.jpg';
// import Image11 from '../assets/pexels-vincent-rivaud-2363807.jpg';
// import Image12 from '../assets/pexels-vincent-rivaud-2363807.jpg';

// function HomePage() {
//   const [showMore, setShowMore] = useState(false);
//   const [expandedRoom, setExpandedRoom] = useState(null); // Define expandedRoom state here

//   const handleShowMore = (index) => {
//     const updatedGuestRooms = [...guestRooms];
//     updatedGuestRooms[index].showMore = !updatedGuestRooms[index].showMore;
//     setGuestRooms(updatedGuestRooms);
//   };
  


//   // Define the details for each room
//   const [guestRooms, setGuestRooms] = useState([
  
//     {
//       name: "Classic Room",
//       description: "Our Classic Room is a tribute to timeless British charm, offering a comfortable double bed enveloped in luxurious linens, perfect for a restful night's sleep.",
//       size: "25 Sq Mt",
//       wifi: "Inclusive high-speed WiFi",
//       occupancy: "Up to 2 guests",
//       bedType: "Opulent double bed",
//       style: "Classic British-styled decor with warm tones",
//       image: RoomPlaceholder,
//       unavailable: false,
//       showMore: false
//     },
//     {
//       name: "Classic King Room",
//       description: "Experience stately elegance in our Classic King Room. It's equipped with a luxurious king-sized bed and an array of amenities to provide a royal stay.",
//       size: "35 Sq Mt",
//       wifi: "Complimentary high-speed WiFi",
//       occupancy: "Ideal for up to 2 guests",
//       bedType: "Regal king-sized bed",
//       style: "Sophisticated decor with a touch of classic comfort",
//       image: Image10, // Replace with actual image file path
//       unavailable: false,
//       showMore: false
      
      
//     },
//     {
//       name: "Executive Room",
//       description: "Designed for success, our Executive Room offers a sleek, professional space with a comfortable double bed and a work area to keep you productive and relaxed.",
//       size: "25 Sq Mt",
//       wifi: "Unlimited WiFi access",
//       occupancy: "Perfect for up to 2 guests",
//       bedType: "Comfortable double bed",
//       style: "Modern design with functional elegance",
//       image: Image11, // Replace with actual image file path
//       unavailable: false,
//       showMore: false
      
//     },
//     {
//       name: "Premium Suite",
//       description: "Our Premium Suite is a sanctuary of luxury, featuring a spacious king bed, elegant furnishings, and premium amenities for an exclusive and unforgettable stay.",
//       size: "21 Sq Mt",
//       wifi: "High-speed WiFi at your fingertips",
//       occupancy: "Exclusive for 1 guest",
//       bedType: "Expansive king bed",
//       style: "Contemporary suite with upscale design elements",
//       image: Image12, // Replace with actual image file path
//       unavailable: false,
//       showMore: false
      
//     }
//   ]);



  

//   return (
//     <div className="home-page">
//       <header style={{ backgroundImage: `url(${MainBanner})` }}>
//         <h1>Welcome to EasyDine</h1>
//         <p>Indulge in comfort and taste at your home away from home.</p>
//       </header>
//       {/* Guest Rooms Section */}
//       <section className="guest-rooms-section">
//         <header>
//           <h2>Guest Rooms</h2>
//           <Link to="/rooms" className="see-more-link">
//             BOOK A ROOM
//           </Link>
//         </header>
//         <div className="guest-rooms-container">
//           {guestRooms.map((room, index) => (
//             <div key={index} className="room-card">
//               <img src={room.image} alt={room.name} className="room-image" />
//               <div className="room-content">
//                 <h3 className="room-name">{room.name}</h3>
//                 <p className="room-description">{room.description}</p>
//                 <ul className="room-details">
//                   <li>
//                     <i className="fa fa-expand" aria-hidden="true"></i> {room.size}
//                   </li>
//                   <li>
//                     <i className="fa fa-wifi" aria-hidden="true"></i> {room.wifi}
//                   </li>
//                   <li>
//                     <i className="fa fa-users" aria-hidden="true"></i> {room.occupancy}
//                   </li>
//                   <li>
//                     <i className="fa fa-bed" aria-hidden="true"></i> {room.bedType}
//                   </li>
//                   <li>
//                     <i className="fa fa-paint-brush" aria-hidden="true"></i> {room.style}
//                   </li>
//                 </ul>

//                 <button className="show-more-btn" onClick={() => handleShowMore(index)}>
//                   {room.showMore ? 'Show Less' : 'Show More'}
//                 </button>
//                 {room.showMore && (
//                   <ul className="room-details">
//                     {room.details.map((detail, detailIndex) => (
//                       <li key={detailIndex}>
//                         <i className={`fa ${detail.icon}`} aria-hidden="true"></i> {detail.text}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>






//       <section className="hotel-info-section">
//         <div className="hotel-info-images">
//           <img src={MainBanner} alt="Main Banner" />
//           <img src={DiningExperience} alt="Dining Experience" />
//           <img src={RoomPreview} alt="Room Preview" />
//           <img src={Image4} alt="Additional Image 4" />
//           <img src={Image5} alt="Additional Image 5" />
//           <img src={Image6} alt="Additional Image 6" />
//           <img src={Image7} alt="Additional Image 7" />
//           <img src={Image8} alt="Additional Image 8" />
//           <img src={Image9} alt="Additional Image 9" />
//          </div>

//         <div className="hotel-info-content">
//           <h1>EasyDine, A Culinary Retreat</h1>
//           <p className="hotel-description">
//             {showMore ? (
//               `EasyDine offers an unforgettable experience with its gourmet dining, luxurious rooms,
//                and first-class service. Nestled in the heart of the city, our hotel boasts a timeless elegance
//                and a legacy of impeccable hospitality. Since opening our doors, we've been an escape for those 
//                seeking a stay of comfort and sophistication.`
//             ) : (
//               `EasyDine offers an unforgettable experience with its gourmet dining and luxurious rooms. Nestled in the heart...`
//             )}
//             <button onClick={handleShowMore} className="show-more-btn">
//               {showMore ? 'Show Less' : 'Show More'}
//             </button>
//           </p>
//           <div className="hotel-highlights">
//           <div className="hotel-highlights">
//             <h4 className="centered-heading">Hotel Highlights</h4>
//             <ul className="highlight-list">
//               <li><span className="icon">🏋️</span> 24-Hour Fitness Centre</li>
//               <li><span className="icon">🍽️</span> Quilon - Michelin Starred Restaurant</li>
//               <li><span className="icon">🏊</span> Outdoor Pool</li>
//               <li><span className="icon">🛏️</span> Luxurious Suites</li>
//               <li><span className="icon">🚗</span> Complimentary Parking</li>
//               <li><span className="icon">🍸</span> Cocktail Lounge</li>
//             </ul>
//           </div>
//           <div className="hotel-policies">
//           <h4 className="centered-heading">Hotel Policies</h4>
//           <ul className="policy-list">
//             <li>Check-in: 3:00 PM</li>
//             <li>Check-out: 12:00 Noon</li>
//             <li>Cancelation Policy: 24 hours prior to check-in</li>
//             <li>Pets Allowed: No</li>
//             <li>Smoking Allowed: No</li>
//             <li>Children: Welcome</li>
//             <li>Additional Bed: Available on request</li>
//           </ul>
            
//           </div>
//           <Link to="/food-order" className="btn-primary">Order Now</Link>
//           </div>
//         </div>
//       </section>
    
      
    
    

//       <section className="hotel-features">
//         <div className="feature">
//           <span className="icon">🍽️</span>
//           <h3>Special Orders</h3>
//           <p>Customize your dining experience with our special order service.</p>
//           <Link to="/special-order" className="btn-primary">Place a Special Order</Link>
//         </div>
//         <div className="feature">
//           <span className="icon">🏨</span>
//           <h3>Effortless Bookings</h3>
//           <p>Book your stay with ease using our seamless online reservation system.</p>
//           <Link to="/booking" className="btn-primary">Reserve Now</Link>
//         </div>
//         <div className="feature">
//           <span className="icon">🚚</span>
//           <h3>Reliable Deliveries</h3>
//           <p>Enjoy the convenience of our prompt in-room delivery service.</p>
//           <Link to="/delivery" className="btn-primary">Order Delivery</Link>
//         </div>
//       </section>

//       <footer className="hotel-footer">
//         <nav className="footer-navigation">
//           <Link to="/login" className="footer-link">Login/Register</Link>
//           <Link to="/profile" className="footer-link">Profile</Link>
//           <Link to="/orders" className="footer-link">View Orders</Link>
//           <Link to="/feedback" className="footer-link">Feedback</Link>
//         </nav>
//         <p>Join us on a culinary and comfort adventure at EasyDine.</p>
//         <div className="social-icons">
//           <a href="#" className="social-icon"><span className="icon">📷</span></a>
//           <a href="#" className="social-icon"><span className="icon">📘</span></a>
//           <a href="#" className="social-icon"><span className="icon">🐦</span></a>
//           <a href="#" className="social-icon"><span className="icon">📽️</span></a>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;



  