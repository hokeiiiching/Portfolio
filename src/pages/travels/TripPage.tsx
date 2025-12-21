import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

interface ContentBlock {
    type: 'text' | 'image-left' | 'image-right' | 'full-image';
    text?: string;
    image?: { src: string; caption: string };
}

interface TripData {
    id: string;
    destination: string;
    location: string;
    date: string;
    coverImage: string;
    content: ContentBlock[];
}

const TRIPS_DATA: Record<string, TripData> = {
    'hongkong': {
        id: 'hongkong',
        destination: 'Hong Kong',
        location: 'Hong Kong SAR, China',
        date: 'February 2025',
        coverImage: '/travels/hongkong/cover.jpg',
        content: [
            {
                type: 'text',
                text: 'There\'s something magical about holding your passport at an airport, knowing adventure awaits. My February 2025 trip to Hong Kong began at the sleek Hong Kong International Airport, where the familiar blend of efficiency and chaos that defines this city greeted me immediately.',
            },
            {
                type: 'image-right',
                text: 'Stepping onto the streets of Kowloon felt like entering a canyon of glass and steel. The iconic red taxis weaved through traffic beneath towering skyscrapers, while luxury boutiques stood alongside traditional shops. This juxtaposition of old and new, East and West, is what makes Hong Kong so captivating.',
                image: { src: '/travels/hongkong/gallery-1.jpg', caption: 'Classic Hong Kong streetscape in Kowloon' },
            },
            {
                type: 'image-left',
                text: 'No visit to Hong Kong is complete without indulging in dim sum. I found myself at a local tea house, surrounded by bamboo steamers filled with colorful dumplings—har gow, siu mai, and specialty creations in vibrant greens, oranges, and blacks. The ritual of yum cha, sipping tea while picking at small dishes, is a Hong Kong tradition I could never tire of.',
                image: { src: '/travels/hongkong/gallery-2.jpg', caption: 'Traditional dim sum feast' },
            },
            {
                type: 'image-right',
                text: 'For a more casual meal, I joined the locals at a bustling roast meat shop. Plates of glistening char siu, crispy-skinned roast goose, and succulent duck arrived over fragrant rice, accompanied by the quintessential Hong Kong iced milk tea—strong, sweet, and utterly refreshing.',
                image: { src: '/travels/hongkong/gallery-3.jpg', caption: 'Classic Hong Kong roast meats' },
            },
            {
                type: 'image-left',
                text: 'As dusk settled over Kowloon, I wandered into the labyrinthine streets of Sham Shui Po. This working-class neighborhood comes alive at night with its famed street markets. Stalls spilled onto the sidewalks selling everything from vintage clothing to electronics, their warm lights creating a cozy glow against the towering residential blocks above.',
                image: { src: '/travels/hongkong/gallery-5.jpg', caption: 'Evening stroll through Sham Shui Po market' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/hongkong/gallery-6.jpg', caption: 'The view from Kowloon Peak' },
            },
            {
                type: 'text',
                text: 'The next morning demanded something more adventurous. I set out to conquer Kowloon Peak (飛鵝山), one of Hong Kong\'s most rewarding hikes. The trail wound steeply upward through dry grassland, each turn revealing more of the city spread out below. At the summit, I sat among the wild grass, watching the urban jungle stretch endlessly toward the harbor.',
            },
            {
                type: 'image-right',
                text: 'The highlight was reaching Suicide Cliff—a dramatic rock outcrop jutting over the city. I sat on its edge, legs dangling over hundreds of meters of open air, the entire Kowloon peninsula sprawled beneath my feet. It\'s a humbling experience, perched between earth and sky, feeling both insignificant and infinite at once.',
                image: { src: '/travels/hongkong/gallery-7.png', caption: 'Perched on the edge of Suicide Cliff' },
            },
            {
                type: 'image-left',
                text: 'From this vantage point, the Hong Kong Coliseum, residential towers with their distinctive red roofs, and cargo ships dotting the harbor all looked like miniatures. The endless towers of the New Territories stretched toward the misty horizon, a testament to this city\'s relentless vertical ambition.',
                image: { src: '/travels/hongkong/gallery-8.png', caption: 'Endless towers stretching to the horizon' },
            },
            {
                type: 'image-right',
                text: 'Needing a change of pace, I dedicated a day to Hong Kong Disneyland. Passing through its whimsical entrance gates felt like stepping into another dimension entirely—from the raw edges of Suicide Cliff to the polished magic of Main Street, USA. The park offered a different kind of escape, one filled with childhood nostalgia and the universal language of theme park joy.',
                image: { src: '/travels/hongkong/gallery-9.jpg', caption: 'The magical entrance to Hong Kong Disneyland' },
            },
            {
                type: 'image-left',
                text: 'The marching band struck up a jaunty tune as I watched their parade down Main Street, the Castle of Magical Dreams rising in the hazy distance. Hong Kong Disneyland may be compact, but it carries a distinct charm—where else can you experience Disney magic with misty mountains as your backdrop? The park felt festive, families laughing, characters waving, a world away from the urban intensity beyond the gates.',
                image: { src: '/travels/hongkong/gallery-11.png', caption: 'Marching band parade at Hong Kong Disneyland' },
            },
            {
                type: 'image-right',
                text: 'After a long day at the park, I treated myself to a mango pomelo sago dessert, crowned with a generous scoop of mango ice cream. This iconic Cantonese dessert, with its layers of fresh mango, chewy sago pearls, and creamy pomelo, was the perfect way to cool down before the evening ahead.',
                image: { src: '/travels/hongkong/gallery-4.jpg', caption: 'Mango pomelo sago dessert' },
            },
            {
                type: 'image-left',
                text: 'For a quick dinner before my final adventure, I grabbed a humble takeaway box brimming with char siu, crispy roast pork, and sliced sausage over steaming white rice. Eaten on a park bench as the sun began to set, this simple meal embodied everything I love about this city—no pretense, just perfectly executed flavors honed over generations.',
                image: { src: '/travels/hongkong/gallery-10.jpg', caption: 'Roast meat rice box from a local cha chaan teng' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/hongkong/gallery-12.jpg', caption: 'The iconic Hong Kong skyline from Victoria Peak' },
            },
            {
                type: 'text',
                text: 'On my final evening, I made the pilgrimage to Victoria Peak. As the Peak Tram crawled up the steep incline, the city revealed itself layer by layer. At the summit, I stood in silence, taking in the sprawling urban tapestry—a sea of skyscrapers rising from the harbor, ferries crossing the water like floating lanterns, and beyond it all, the hazy silhouette of Kowloon stretching to the horizon. It\'s a view I\'ve seen countless times in photographs, yet nothing prepares you for the sheer scale of it in person.',
            },
            {
                type: 'text',
                text: 'Hong Kong has a way of surprising you. It\'s a city where you can hike to dramatic clifftops in the morning, lose yourself in Disneyland by afternoon, and stand atop Victoria Peak watching the city lights flicker to life as evening descends. This February journey reminded me why I keep coming back—there\'s always another layer to discover, another story waiting in the next narrow alley or atop the next misty peak.',
            },
        ],
    },
    'sydney': {
        id: 'sydney',
        destination: 'Sydney',
        location: 'New South Wales, Australia',
        date: 'May 2025',
        coverImage: '/travels/sydney/cover.jpg',
        content: [
            { type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { type: 'text', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
        ],
    },
    'chongqing-chengdu': {
        id: 'chongqing-chengdu',
        destination: 'Chongqing & Chengdu',
        location: 'Sichuan Province, China',
        date: 'December 2025',
        coverImage: '/travels/chongqing-chengdu/cover.jpg',
        content: [
            { type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { type: 'text', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
        ],
    },
};

// Content Block Components
const TextBlock: React.FC<{ text: string }> = ({ text }) => (
    <div className="content-block content-block--text">
        <p>{text}</p>
    </div>
);

const ImageTextBlock: React.FC<{
    text: string;
    image: { src: string; caption: string };
    imagePosition: 'left' | 'right';
}> = ({ text, image, imagePosition }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.background = 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)';
    };

    return (
        <div className={`content-block content-block--image-${imagePosition}`}>
            <figure className="content-block__figure">
                <img
                    src={image.src}
                    alt={image.caption}
                    className="content-block__image"
                    onError={handleImageError}
                />
                <figcaption className="content-block__caption">{image.caption}</figcaption>
            </figure>
            <div className="content-block__text">
                <p>{text}</p>
            </div>
        </div>
    );
};

const FullImageBlock: React.FC<{ image: { src: string; caption: string } }> = ({ image }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.background = 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)';
    };

    return (
        <div className="content-block content-block--full-image">
            <figure className="content-block__figure--full">
                <img
                    src={image.src}
                    alt={image.caption}
                    className="content-block__image--full"
                    onError={handleImageError}
                />
                <figcaption className="content-block__caption">{image.caption}</figcaption>
            </figure>
        </div>
    );
};

export const TripPage: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const trip = tripId ? TRIPS_DATA[tripId] : null;

    if (!trip) {
        return <Navigate to="/travels" replace />;
    }

    return (
        <>
            {/* Hero with Cover Image */}
            <div
                className="trip-hero"
                style={{
                    backgroundImage: `url(${trip.coverImage})`,
                    backgroundColor: '#374151'
                }}
            >
                <div className="trip-hero-content">
                    <div className="trip-hero-date">
                        <Calendar size={14} />
                        {trip.date}
                    </div>
                    <h1 className="trip-hero-title">{trip.destination}</h1>
                    <div className="trip-hero-location">
                        <MapPin size={18} />
                        {trip.location}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="trip-content">
                <section className="trip-section">
                    <h2 className="trip-section-title">The Journey</h2>

                    {trip.content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return <TextBlock key={index} text={block.text!} />;
                            case 'image-left':
                                return (
                                    <ImageTextBlock
                                        key={index}
                                        text={block.text!}
                                        image={block.image!}
                                        imagePosition="left"
                                    />
                                );
                            case 'image-right':
                                return (
                                    <ImageTextBlock
                                        key={index}
                                        text={block.text!}
                                        image={block.image!}
                                        imagePosition="right"
                                    />
                                );
                            case 'full-image':
                                return <FullImageBlock key={index} image={block.image!} />;
                            default:
                                return null;
                        }
                    })}
                </section>
            </div>
        </>
    );
};
