import React, { useState } from 'react';
import { createImageUrl } from '../services/movieServices';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';

const MovieItem = ({ movie }) => {
    const { title, backdrop_path, poster_path } = movie;
    const [like, setLike] = useState(false);
    const { user } = UserAuth();

    const markFavShow = async () => {
        const userEmail = user?.email;
        if (userEmail) {
            const userDoc = doc(db, 'users', userEmail);
            setLike(!like);
            await updateDoc(userDoc, {
                favShows: arrayUnion({ ...movie }),
            });
        } else {
            alert('Login to save a movie');
        }
    };

    const playTrailer = async () => {
        // Fetch trailer using YouTube Data API
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
                    `${title} trailer`
                )}&key=AIzaSyCM0JY_sLy5kfD5z0C4n1YMf3skSIx_vro&type=video&videoEmbeddable=true`
            );
            const data = await response.json();
            const videoId = data.items[0]?.id.videoId;

            // Open trailer in a new window
            if (videoId) {
                window.open(`https://www.youtube.com/watch?v=${videoId}`);
            } else {
                console.error('No trailer found');
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    return (
        <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
            <img
                className="w-full h-40 block object-cover object-top"
                src={createImageUrl(backdrop_path ?? poster_path, 'w500')}
                alt={movie.title}
                
            />
            <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p onClick={playTrailer} className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                </p>
                <p onClick={markFavShow} className="cursor-pointer">
                    {like ? (
                        <FaHeart size={20} className="absolute top-2 left-2 text-gray-300" />
                    ) : (
                        <FaRegHeart size={20} className="absolute top-2 left-2 text-gray-300" />
                    )}
                </p>
            </div>
        </div>
    );
};

export default MovieItem;
