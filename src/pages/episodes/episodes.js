import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './episodes.css';
import videos from '../../data/videos';
import Footer from '../../components/footer/footer';
import axios from 'axios';

export default function Episodes() {


    const [episodes, setEpisodes] = useState(videos);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchEpisodes = async () => {
            console.log('api key:', process.env.REACT_APP_YOUTUBE_API_KEY);
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`);
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
            episode.title.toLowerCase().includes(searchTerm)
        );
        setEpisodes(filteredEpisodes);
    };


    return (
        <div className="episodes">
            <Header />

            <div className='controls-wrapper'>
                <h1>Episodes <span>{episodes.length}</span></h1>
                <input type='text' placeholder='Search episodes...' onChange={handleSearch} />
            </div>
            <div className='episodes-list'>
                <ul>
                    {episodes.map((episode) => (
                        <li key={episode.id}>
                            <div className='episode-wrapper'>
                                <div className='episode-image'>
                                    <img src={episode.thumbnail} alt={episode.title} />
                                </div>
                                <h2>{episode.title}</h2>
                            </div>

                            {/* <p>{episode.description}</p> */}
                        </li>
                    ))}
                </ul>
                {/* <button className='view-all-button' onClick={viewAllEpisodes}>View All Episodes</button> */}
            </div>
            <Footer />
        </div>
    );
}