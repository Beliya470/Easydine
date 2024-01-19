from app import db, create_app  # Assuming create_app is a function that initializes your Flask app
from models import User, Room, HotelBooking, RoomServiceItem
from werkzeug.security import generate_password_hash

# Create an instance of the Flask application
app = create_app()

# Wrap the database operations in a with statement to push an application context
with app.app_context():
    # Check if the 'admin' user already exists
    admin_user = User.query.filter_by(username='admin').first()
    
    if admin_user is None:
        # If the 'admin' user doesn't exist, create it
        admin_user = User(username='admin', password=generate_password_hash('adminpass'), is_admin=True)
        db.session.add(admin_user)
    else:
        # If the 'admin' user already exists, you can update its password or other attributes if needed
        admin_user.password = generate_password_hash('adminpass')

    # Create 15 rooms with different categories
    room_categories = [
        ("Classic", "25 Sq Mt", 2, "Opulent double bed", "Classic British-styled decor with warm tones", 'static/pexels-charlotte-may-5824519.jpg', 99.99),
        ("Deluxe", "30 Sq Mt", 2, "Luxurious queen bed", "Modern decor with a touch of elegance", 'static/pexels-max-rahubovskiy-6782473.jpg', 84.56),
        ("Executive", "35 Sq Mt", 2, "King-sized bed", "Executive suite with a work desk and lounge area", 'static/pexels-andrea-davis-2873951.jpg', 71.56),
        ("Junior Suite", "40 Sq Mt", 3, "King-sized bed and a sofa bed", "Spacious suite with a sitting area", 'static/pexels-andrea-piacquadio-3760514.jpg', 72.24),
        ("Master Suite", "50 Sq Mt", 4, "Two queen beds", "Large suite with separate living and sleeping areas", 'static/pexels-jonathan-borba-3316926.jpg', 89.34),
        ("Presidential Suite", "70 Sq Mt", 4, "Grand king-sized bed", "Top-floor location with panoramic views", 'static/pexels-julie-aagaard-2351289.jpg', 67.45),
        ("Romantic Escape", "28 Sq Mt", 2, "Canopy queen bed", "Intimate setting with a focus on privacy and elegance", 'static/pexels-liza-summer-6347923.jpg', 100.12),
        ("Artist's Loft", "45 Sq Mt", 3, "Bohemian-style bedding", "Eclectic decor with an inspiring artist studio vibe", 'static/pexels-max-rahubovskiy-6186822.jpg', 90.12),
        ("Zen Retreat", "33 Sq Mt", 2, "Bamboo-framed bed", "Minimalist design with a tranquil Zen garden", 'static/pexels-max-rahubovskiy-6394559.jpg', 123.12),
        ("Ocean Front", "38 Sq Mt", 2, "Queen bed with ocean view", "Nautical themes and uninterrupted sea views", 'static/pexels-max-rahubovskiy-6587907.jpg', 45.90),
        ("Safari Adventure", "40 Sq Mt", 4, "Twin beds", "African-inspired decor with a wild twist", 'static/pexels-max-rahubovskiy-6782473.jpg', 56.12),
        ("Skyline Penthouse", "60 Sq Mt", 4, "King bed with skyline views", "Modern luxury with floor-to-ceiling windows", 'static/pexels-pixabay-271624 (1).jpg', 78.45),
        ("Garden Bungalow", "42 Sq Mt", 3, "Queen bed", "Private garden oasis with tropical plants", 'static/pexels-quark-studio-2506990.jpg', 78.91),
        ("Alpine Chalet", "48 Sq Mt", 4, "Twin beds", "Mountain lodge decor with a cozy fireplace", 'static/pexels-rachel-claire-4825701.jpg', 78.32),
        ("Royal Chamber", "55 Sq Mt", 4, "Four-poster royal bed", "Opulent furnishings reminiscent of a royal palace", 'static/pexels-roberto-nickson-2417842.jpg', 54.17),
    ]

    for i in range(15):
        
        category, size, occupancy, bed_type, style, image_url, price = room_categories[i % len(room_categories)]  # Include the price
        room = Room(category=category, size=size, occupancy=occupancy, bed_type=bed_type, style=style, image_url=image_url, price=price)  # Include the price
        db.session.add(room)

    # Create 15 meals for room service
    meal_descriptions = [
        ("Sunny Italian Pizza", "A classic thin crust pizza topped with sun-dried tomatoes, fresh mozzarella, basil, and a drizzle of extra virgin olive oil.", 'static/pexels-christina-petsos-11568775.jpg'),
        ("Mediterranean Grilled Chicken Salad", "Grilled chicken breast served on a bed of mixed greens with feta cheese, kalamata olives, and a light lemon-oregano dressing.", 'static/pexels-sakina-mammadli-15911841.jpg'),
        ("Spicy Thai Green Curry", "Aromatic Thai green curry with bamboo shoots, bell peppers, and tender chicken pieces, served with jasmine rice.", 'static/pexels-eaksit-sangdee-15797986.jpg'),
        ("Japanese Sushi Platter", "An assortment of fresh sashimi, nigiri, and rolls featuring tuna, salmon, and avocado, served with wasabi and pickled ginger.", 'static/pexels-sebastian-coman-photography-3475617.jpg'),
        ("Moroccan Tagine", "Slow-cooked lamb tagine with apricots, almonds, and fragrant spices, served with fluffy couscous.", 'static/pexels-enesfi̇lm-8029190.jpg'),
        ("Mexican Beef Tacos", "Soft corn tortillas filled with seasoned beef, topped with salsa, guacamole, and fresh cilantro.", 'static/pexels-hana-brannigan-3642718.jpg'),
        ("Indian Butter Chicken", "Creamy tomato curry with tender pieces of chicken, served with basmati rice and naan bread.", 'static/pexels-loren-castillo-9218754.jpg'),
        ("French Coq au Vin", "Classic French stew with chicken braised in red wine with mushrooms and pearl onions, served with creamy mashed potatoes.", 'static/pexels-valeria-boltneva-10038705.jpg'),
        ("Italian Seafood Risotto", "Creamy Arborio rice cooked with a medley of seafood, white wine, and a touch of saffron.", 'static/pexels-dana-tentis-725997.jpg'),
        ("American BBQ Ribs", "Smoked and slow-cooked pork ribs glazed with a sweet and tangy BBQ sauce, served with cornbread and coleslaw.", 'static/pexels-valeria-boltneva-16474897.jpg'),
    ]

    for name, description, image_url in meal_descriptions:
        meal = RoomServiceItem(name=name, description=description, price=12.99, image_url=image_url)
        db.session.add(meal)

    # Commit all the changes to the database
    db.session.commit()
