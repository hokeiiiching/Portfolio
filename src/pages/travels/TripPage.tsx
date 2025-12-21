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
            {
                type: 'text',
                text: 'Sydney greeted me with crisp autumn air and that unmistakable Australian warmth—not just the weather, but the cheerful energy of a city that knows how to live well. My May 2025 journey through Australia\'s harbor city was filled with architectural wonders, culinary delights, and the kind of serendipitous discoveries that make travel so rewarding.',
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/cover.jpg', caption: 'The iconic Queen Victoria Building interior' },
            },
            {
                type: 'text',
                text: 'The Queen Victoria Building, or QVB as locals affectionately call it, left me speechless. Built in 1898 as a marketplace, this Romanesque Revival masterpiece has been transformed into one of the world\'s most beautiful shopping centers. The ornate clock hanging from the glass ceiling became my constant point of orientation as I wandered through multiple levels of boutiques, each turn revealing more intricate tilework and wrought-iron railings.',
            },
            {
                type: 'image-right',
                text: 'Just around the corner, The Strand Arcade offered a more intimate Victorian-era shopping experience. The beautifully preserved heritage building, with its geometric floor tiles in blue, gold, and brown, felt like stepping into a living museum. I found myself browsing through independent Australian designers and specialty shops, the JB Hi-Fi signage providing a delightfully incongruous modern touch amidst all that 19th-century grandeur.',
                image: { src: '/travels/sydney/gallery-2.jpg', caption: 'The Strand Arcade\'s heritage interior' },
            },
            {
                type: 'image-left',
                text: 'Navigating Sydney\'s public transport was surprisingly intuitive. Central Station\'s grand departure board, with its classic clock and colorful service information, reminded me of great European train stations. The mix of Sydney suburban services, intercity trains, and the new Metro line all converging in one place made exploring beyond the CBD effortless.',
                image: { src: '/travels/sydney/gallery-3.jpg', caption: 'Sydney Central Station departure board' },
            },
            {
                type: 'image-right',
                text: 'For a casual lunch, I stumbled upon a charming Italian spot serving what might be the most satisfying comfort food of the trip. Orecchiette with chunks of meatball in a rich tomato sauce, generously dusted with parmesan, arrived in a quirky newspaper-print container alongside golden fries and a perfectly blistered calzone. Sydney\'s multicultural dining scene never disappoints.',
                image: { src: '/travels/sydney/gallery-1.jpg', caption: 'Italian comfort food done right' },
            },
            {
                type: 'image-left',
                text: 'No visit to Sydney is complete without indulging in the city\'s legendary seafood. At the Sydney Fish Market, I assembled my dream platter: succulent grilled prawns, a beautifully spiced half lobster, plump baked oysters, and an assortment of the day\'s freshest catch—all served over crispy chips with wedges of fresh lemon. With a Jarritos soda in hand, I found a sunny spot and savored every bite.',
                image: { src: '/travels/sydney/gallery-4.jpg', caption: 'Fresh seafood platter from Sydney Fish Market' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-5.jpg', caption: 'The Sydney Opera House across the harbor' },
            },
            {
                type: 'text',
                text: 'And then there was the harbor—the beating heart of Sydney. From the moment I caught my first glimpse of the Opera House across the deep blue water, I understood why this city captivates so many. Those iconic white sails, designed by Jørn Utzon to resemble billowing clouds or perhaps shells on the shore, looked even more magnificent in person than in any photograph.',
            },
            {
                type: 'image-right',
                text: 'Walking along Circular Quay felt like being at the crossroads of everything Sydney has to offer. To one side, ferries glided in and out of the wharves, carrying commuters and tourists alike. Behind me rose the gleaming towers of the CBD—an impressive wall of glass and steel that included the distinctive geometric facade of One Circular Quay and the Salesforce Tower still under construction, a city constantly reinventing itself.',
                image: { src: '/travels/sydney/gallery-6.jpg', caption: 'Circular Quay waterfront promenade' },
            },
            {
                type: 'image-left',
                text: 'I couldn\'t resist hopping on a ferry to see the city from the water. As we pulled away from the quay, the Sydney skyline unfolded in all its glory—a forest of modern towers reflecting the afternoon sun, their glass facades shimmering in hues of blue and green. The perspective from the water reveals just how dramatically Sydney has grown, yet the harbor remains its defining feature.',
                image: { src: '/travels/sydney/gallery-7.jpg', caption: 'Sydney CBD skyline from the harbor' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-8.jpg', caption: 'Golden hour over the Opera House and Harbour Bridge' },
            },
            {
                type: 'text',
                text: 'As the afternoon light turned golden, I found myself on a ferry full of silhouetted passengers, all turned toward the same breathtaking view. The Sydney Opera House and Harbour Bridge stood side by side against a dramatic sky streaked with clouds catching the setting sun. It was one of those perfect travel moments—surrounded by strangers all sharing the same sense of wonder.',
            },
            {
                type: 'image-right',
                text: 'The final ferry ride of the day offered perhaps the most serene view of all. With dusk settling over the city, the Crown Sydney tower—the tallest building in the city—stood as a gleaming sentinel against a sky painted in soft pinks and blues. The city lights were just beginning to flicker on, and from the deck of the ferry, Sydney felt both impossibly modern and timelessly beautiful.',
                image: { src: '/travels/sydney/gallery-9.png', caption: 'Crown Sydney tower at dusk from the ferry' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-10.jpg', caption: 'Sydney Town Hall illuminated at dusk' },
            },
            {
                type: 'text',
                text: 'Back on solid ground, I made my way to Sydney Town Hall just as the evening lights began their nightly transformation. This grand Second Empire building, completed in 1889, glowed like a golden beacon against the darkening sky. The ornate clock tower watching over the busy square below felt like a guardian of the city\'s Victorian soul—a reminder that beneath all the glass and steel, Sydney\'s heart beats with 19th-century grandeur.',
            },
            {
                type: 'image-right',
                text: 'Perhaps no building in Sydney captures the city\'s spiritual heritage quite like St Mary\'s Cathedral. Rising majestically near Hyde Park, its twin Gothic spires reach toward the heavens with an elegance that rivals the great cathedrals of Europe. The golden Sydney sandstone, quarried from local sources, gives the facade a warmth unique to Australian Gothic architecture.',
                image: { src: '/travels/sydney/gallery-11.jpg', caption: 'St Mary\'s Cathedral\'s Gothic facade' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-12.jpg', caption: 'The soaring nave of St Mary\'s Cathedral' },
            },
            {
                type: 'text',
                text: 'Stepping inside St Mary\'s was like entering another world entirely. The soaring nave, with its ribbed vaulting and slender columns bathed in warm amber light, seemed to stretch endlessly toward the ornate altar. The air hung still and reverent, punctuated only by soft footsteps and whispered prayers. Rows of wooden pews led the eye toward the stunning stained glass windows that filtered the afternoon light into kaleidoscopic patterns.',
            },
            {
                type: 'image-left',
                text: 'Wandering through the side aisles, I discovered quiet chapels, intricate stone carvings, and rows of flickering votive candles. A statue of a saint stood watch beside the candle rack, where visitors left small flames of hope and remembrance. Even as a visitor simply appreciating the architecture, there was something profoundly moving about these intimate corners of devotion.',
                image: { src: '/travels/sydney/gallery-13.jpg', caption: 'Prayer candles in the cathedral side aisle' },
            },
            {
                type: 'image-right',
                text: 'Just steps from the cathedral, Hyde Park offered a welcome respite from the urban hustle. The Archibald Fountain, with its bronze figures of Apollo, Diana, and their mythological companions, spurted graceful arcs of water against a backdrop of towering trees. It felt wonderfully European—a slice of Parisian park life transplanted to the Antipodes, where office workers ate lunch on benches and tourists paused for photographs.',
                image: { src: '/travels/sydney/gallery-14.jpg', caption: 'Archibald Fountain in Hyde Park' },
            },
            {
                type: 'image-left',
                text: 'From another angle, the fountain revealed an even more spectacular composition. With St Mary\'s Cathedral rising proudly in the background, its Gothic spires framing the classical fountain sculptures, I was struck by how seamlessly Sydney layers its histories. The Archibald Fountain, completed in 1932, commemorates the Australian-French alliance in World War I—another reminder of how this young city weaves together stories from across the globe.',
                image: { src: '/travels/sydney/gallery-15.jpg', caption: 'Archibald Fountain with St Mary\'s Cathedral behind' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-16.jpg', caption: 'The iconic Luna Park entrance face' },
            },
            {
                type: 'text',
                text: 'A ferry ride across the harbor brought me to Milsons Point and one of Sydney\'s most beloved landmarks: Luna Park. The giant smiling face that serves as the entrance has been welcoming visitors since 1935, its wide grin and twinkling eyes both charming and slightly surreal. Stepping through those painted lips felt like passing through a portal into pure, unadulterated fun.',
            },
            {
                type: 'image-right',
                text: 'Inside Luna Park, the atmosphere was delightfully kitschy—colorful geometric patterns painted across the ground, vintage-style ride facades in yellows and reds, and the unmistakable silhouette of the Coney Island attraction in the distance. Even on a quiet weekday, there was magic in the air. The Heritage Carousel, the Wild Mouse, and the iconic Ferris wheel offering harbor views all beckoned with nostalgic charm.',
                image: { src: '/travels/sydney/gallery-17.jpg', caption: 'The colorful midway of Luna Park' },
            },
            {
                type: 'image-left',
                text: 'For a different perspective entirely, I ascended Sydney Tower Eye as night fell over the city. From 250 meters above street level, Sydney transformed into a glittering tapestry of light. I could trace Hyde Park\'s dark rectangle, pick out the illuminated cruciform of St Mary\'s Cathedral, and follow the web of streets stretching endlessly toward the eastern suburbs. The harbor sparkled in the distance, and I understood why they call this the city of light.',
                image: { src: '/travels/sydney/gallery-18.jpg', caption: 'Sydney by night from Sydney Tower Eye' },
            },
            {
                type: 'image-right',
                text: 'The highlight of my Sydney journey awaited inside the Opera House itself. The interior was a revelation—where the exterior is all sweeping curves and white ceramic tiles, the inside reveals a brutalist warmth of raw concrete and rich timber. The foyer\'s wooden slat walls and sculptural staircases felt like being inside a musical instrument, the architecture itself seeming to resonate with the performances it houses.',
                image: { src: '/travels/sydney/gallery-19.jpg', caption: 'Inside the Sydney Opera House foyer' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-20.jpg', caption: 'Sydney Symphony Orchestra in concert' },
            },
            {
                type: 'text',
                text: 'And then came the moment I had been waiting for: taking my seat in the Concert Hall as the Sydney Symphony Orchestra prepared to perform. The hall wrapped around me in waves of brushbox timber, while enormous pink acoustic reflectors—nicknamed the "clouds"—hung overhead like abstract flowers. As the orchestra launched into their program, the sound was transcendent, every note filling the space with perfect clarity. To experience live music in one of the world\'s most celebrated performance venues felt like a privilege beyond words.',
            },
            {
                type: 'image-left',
                text: 'Emerging from the concert into the cool evening air, I paused on the forecourt to take one last look at the Opera House up close. Under overcast skies, the interlocking shells seemed almost sculptural, their geometric precision more apparent than ever. A few visitors wandered the vast expanse of granite steps, dwarfed by Utzon\'s masterpiece. I thought about how this building, once so controversial, has become the very symbol of a nation.',
                image: { src: '/travels/sydney/gallery-21.png', caption: 'The Opera House forecourt at dusk' },
            },
            {
                type: 'full-image',
                image: { src: '/travels/sydney/gallery-22.png', caption: 'Sydney skyline from my hotel at night' },
            },
            {
                type: 'text',
                text: 'On my final night, I stood at the window of my hotel, gazing out at the Sydney skyline one last time. The CBD glittered in the distance, Sydney Tower\'s spire glowing red against the night sky, while the quiet rooftops of the inner suburbs stretched out below. It was a view that somehow captured everything about this city—the ambition of its towers, the charm of its neighborhoods, the way urban energy and peaceful moments exist side by side.',
            },
            {
                type: 'text',
                text: 'Sydney has this remarkable ability to blend the historic with the contemporary, the urban with the coastal, the sacred with the whimsical. Whether I was admiring Gothic cathedrals, stepping through the mouth of a giant laughing face at Luna Park, watching a world-class orchestra beneath pink acoustic clouds, or simply gazing at the skyline from my hotel window—each moment felt quintessentially Sydney. This city doesn\'t just welcome visitors; it invites you to become part of its vibrant, sun-soaked story, even if just for a few days. And as my plane lifted off over the harbor, I knew I would carry a piece of Sydney with me wherever I go.',
            },
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
