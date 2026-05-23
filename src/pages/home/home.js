import { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/carousel';
import Header from '../../components/header/header';
import './home.css';
import Episodes from '../episodes/episodes';
import videos from '../../data/videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import headshot from '../../assets/headshot/headshot.jpg';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

    const navigate = useNavigate();

    const [episodes, setEpisodes] = useState(videos.slice(0, 8));

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchEpisodes = async () => {
            console.log('api key:', process.env.REACT_APP_YOUTUBE_API_KEY);
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=8`);
                setEpisodes(response.data.items);
                console.log(response.data.items);
            } catch (error) {
                console.error('Error fetching episodes:', error);
            }
        };
        fetchEpisodes();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredEpisodes = videos.filter((episode) =>
            episode.snippet.title.toLowerCase().includes(searchTerm)
        );
        setEpisodes(filteredEpisodes);
    };

    const viewAllEpisodes = () => {
        navigate('/episodes');
    };


    return (
        <>
            <Header />
            <Carousel />
            <div className="home">
                <div className='about-wrapper'>
                    <h1>About the Show</h1>
                    <p>Sheena is a comedian, writer, and podcaster based in Los Angeles. Her podcast, "Safe Space," is a hilarious and insightful exploration of mental health, relationships, and the human experience. Each episode features candid conversations with guests from all walks of life, as well as Sheena's own unique perspective on the world around her. Whether you're looking for a good laugh or some thoughtful insights, "Safe Space" is the perfect place to find both.

                        <div className='headshot-wrapper'>
                        <div className='headshot-image'>
                            <img src={headshot} alt='Sheena headshot' />
                        </div>
                        <p className='headshot-title'>Sheena Rayvon<span>author, entrepeneur</span></p>
                    </div>
                    </p>
                    
                </div>
                
                <div className='controls-wrapper'>
                    <h1>Recent Episodes</h1>
                    <input type='text' placeholder='Search episodes...' onChange={handleSearch} />
                </div>
                <div className='episodes-list'>
                    <ul>
                        {episodes.map((episode) => (
                            <li key={episode.id}>
                                <div className='episode-wrapper' 
                                onClick={() => window.location.href=`https://www.youtube.com/watch?v=${episode.id.videoId}`}>
                                    <div className='episode-image' style={{backgroundImage: `url(${episode.snippet.thumbnails.high.url})`}}>
                                        {/* <img src={episode.snippet.thumbnails.high.url} alt={episode.snippet.title} /> */}
                                    </div>
                                   <h2>{episode.snippet.title}</h2> 
                                </div>
                                
                                {/* <p>{episode.description}</p> */}
                            </li>
                        ))}
                    </ul>
                    <button className='view-all-button' onClick={viewAllEpisodes}>View All Episodes</button>
                </div>
                <div className='contact-wrapper'>
                    <form>
                        <h2>Drop Sheena a line!</h2>
                    <input type='text' placeholder='Your name...' /><br></br>
                    <input type='text' placeholder='Your email address...' /><br></br>
                    <textarea placeholder='Your message...'></textarea><br></br>
                    <button>Send</button>
                    </form>

                    <ul className='social-list'>
                        <li><a href='https://www.youtube.com/@SafeSpacewithSheenaRayvon'><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></a></li>
                        <li><a href='https://www.tiktok.com/@sheena.rayvon?lang=en'><FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon></a></li>
                        <li><a href='https://www.instagram.com/safespacewithsheenarayvon/'><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a></li>
                    </ul>

                   
                    
                    
                </div>
            </div>
            <Footer />
        </>
    );
}