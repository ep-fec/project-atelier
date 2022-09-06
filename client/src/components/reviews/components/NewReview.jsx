import axios from 'axios';
import React, { useState } from 'react';


const NewReview = ({productInfo, productMeta}) => {
    
    const [rating, setRating] = useState(0);
    const [selected, setSelected] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
    
    const handleStarClick = (star) => {
        console.log('hi');
        star === 1 ? setSelected({1: true, 2: false, 3: false, 4: false, 5: false })
        : star === 2 ? setSelected({ 1: true, 2: true, 3: false, 4: false, 5: false })
        : star === 3 ? setSelected({ 1: true, 2: true, 3: true, 4: false, 5: false })
        : star === 4 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: false })
        : star === 5 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: true })
        : null;
    };

    return (
        <div className="reviews new-review-component">
            <div className="new-review-header">
                <h1 className="reviews-logo">• WRITE YOUR REVIEW •</h1>
                <h2>About the {productInfo.name}</h2>
            </div>
            <div className="new-review-body">
                <span className="new-review-overall-rating"> Overall Rating: </span>
                <span className="reviews new-review-stars">
                    <span className={selected[5] ? 'new-review-stars-selected' : null}
                    onClick={() => handleStarClick(5)}>☆</span>
                    <span className={selected[4] ? 'new-review-stars-selected' : null}
                    onClick={() => handleStarClick(4)}>☆</span>
                    <span className={selected[3] ? 'new-review-stars-selected' : null}
                    onClick={() => handleStarClick(3)}>☆</span>
                    <span className={selected[2] ? 'new-review-stars-selected' : null}
                    onClick={() => handleStarClick(2)}>☆</span>
                    <span className={selected[1] ? 'new-review-stars-selected' : null}
                    onClick={() => handleStarClick(1)}>☆</span>
                </span>
            </div>
        </div>
    );
};

export default NewReview;