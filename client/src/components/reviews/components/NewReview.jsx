import axios from 'axios';
import React, { useEffect, useState } from 'react';


const NewReview = ({productInfo, productMeta}) => {

    const charsDefinition = {
        Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
        Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    }

    const [selected, setSelected] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
    const [productChars, setChars] = useState([]);
    const [rating, setRating] = useState(0);
    const [summary, setSummary] = useState('');
    const [body, setBody] = useState('');
    const [recommend, setRecommend] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [characteristics, setCharacteristics] = useState({});

    useEffect(() => {
        setChars(Object.keys(productMeta?.characteristics));
    }, [productMeta])

    const handleStarClick = (star) => {
        star === 1 ? setSelected({1: true, 2: false, 3: false, 4: false, 5: false })
        : star === 2 ? setSelected({ 1: true, 2: true, 3: false, 4: false, 5: false })
        : star === 3 ? setSelected({ 1: true, 2: true, 3: true, 4: false, 5: false })
        : star === 4 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: false })
        : star === 5 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: true })
        : null;
        setRating(star);
    };

    return (
        <div className="reviews new-review-component">
            <div className="new-review-header">
                <h1 className="reviews-logo">Write Your Review</h1>
                <h3>About the <span className="new-review-product-name">{productInfo.name}</span></h3>
            </div>
            <form className="new-review-body">
                <span className="new-review-category"><span className="new-review-required">* </span>Overall Rating: </span>
                <span className="reviews new-review-stars" required>
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
                </span><br/>
                <div className="new-review-category new-review-recommend">
                    <span><span className="new-review-required">* </span>Do you recommend this product?</span>
                    <div className="new-review-radio">
                        <label>
                            <input
                                type="radio"
                                name="recommend"
                                value="yes"
                                required
                                onChange={() => setRecommend(true)}/>
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="recommend"
                                value="no"
                                onChange={() => setRecommend(false)} />
                            No
                        </label>
                    </div>
                </div>
                <div className="new-review-category new-review-categories">
                    <span><span className="new-review-required">* </span>Categories</span>
                    <div >
                        {productChars.length ? productChars.map((char, i) => {
                            return (
                            <div key={i} className="new-review-category new-review-char-section">
                                <div className="new-review-char-title">{char}:
                                <span className="new-review-char-selection"> none selected </span>
                                </div>
                                <div className="new-review-char-radios">
                                    <label className="char-radio"> {charsDefinition[char][0]}
                                        <input type="radio" name={char} value="1" required/>
                                    </label>
                                    <input type="radio" name={char} value="2" />
                                    <input type="radio" name={char} value="3" />
                                    <input type="radio" name={char} value="4" />
                                    <label className="char-radio">
                                        <input type="radio" name={char} value="5" />
                                        {charsDefinition[char][4]}
                                    </label><hr className="new-review-char-divider"/>
                                </div>
                            </div>
                            )})
                        : null}
                    </div>
                </div>

                <div className="new-review-category new-review-summary">
                    <label className="summary"><span className="new-review-required">* </span>Review Summary
                        <input
                            type="text"
                            name="summary"
                            placeholder="Example: Best purchase ever!"
                            size="40"
                            maxLength="60"
                            required/>
                    </label>
                </div>

                <div className="new-review-category new-review-reviewbody">
                    <span className="new-review-required">* </span>
                    <label>Review Body<br /><br/>
                        <textarea
                            className="new-review-text-form"
                            name="review-body-text"
                            placeholder="Why did you like the product or not?"
                            minLength="50"
                            maxLength="1000"
                            required />
                    </label>
                </div>

                <div className="new-review-upload-images">
                    <button className="reviewsbutton">UPLOAD IMAGES</button>
                </div>

                <div className="new-review-category new-review-nickname">
                    <label className="nickname">
                        <span className="new-review-required">* </span>Nickname
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Example: jackson11!"
                            size="40"
                            maxLength="60"
                            required/>
                    </label>
                    <div className="nickdisclaimer">
                        For privacy reasons, do not use your full name or email address.
                    </div>
                </div>

                <div className="new-review-category new-review-email">
                    <label className="newreviews-email">
                        <span className="new-review-required">* </span>Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Example: jackson11@email.com"
                            size="40"
                            maxLength="60"
                            required />
                    </label>
                    <div className="emaildisclaimer">
                        For authentication reasons, you will not be emailed.
                    </div>
                </div>

                <div className="new-review-category new-review-submit">
                    <button className="reviewsbutton">SUBMIT REVIEW</button>
                </div>
            </form>
        </div>
    );
};

export default NewReview;