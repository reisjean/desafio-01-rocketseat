import { useState } from 'react';

export default function App() {
    const [likes, setLikes] = useState(100);
    const [dislikes, setDislikes] = useState(25);
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    function handleLikes(){
      if(!likeClicked){
        setLikes(likes + 1);
        setLikeClicked(true);
        setDislikeClicked(false);
      }else{
        setLikes(likes - 1);
        setLikeClicked(false);
      }

      if(dislikeClicked){
        setDislikeClicked(false);
        setDislikes(dislikes - 1);
      }
    }

    function handleDislikes(){
        if(!dislikeClicked){
            setDislikes(dislikes + 1);
            setDislikeClicked(true);
            setLikeClicked(false);
        }else{
            setDislikes(dislikes - 1);
            setDislikeClicked(false);
        }

        if(likeClicked){
          setLikes(likes - 1);
          setLikeClicked(false);
        }
    }

    return (
        <>
            <div>
                <button
                    className={likeClicked ? 'like-button liked' : 'like-button'} 
                    onClick={handleLikes}>
                        Like | <span className="likes-counter">{likes}</span>
                </button>

                <button
                    className={dislikeClicked ? 'dislike-button disliked' : 'dislike-button'}
                    onClick={handleDislikes}>
                        Dislike | <span className="dislikes-counter">{dislikes}</span>
                    </button>
            </div>


            <style>{`
                .like-button, .dislike-button {
                    font-size: 1rem;
                    padding: 5px 10px;
                    color:   #585858;
                }

                .liked, .disliked {
                    font-weight: bold;
                    color: #1565c0;
                }
            `}</style>
        </>
    );
}