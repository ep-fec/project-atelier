import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import UploadImage from './UploadImage.jsx';


const NewReview = ({productInfo, productMeta}) => {

    const form = useRef(null);
    const reviewBody = useRef(null);

    const [selected, setSelected] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
    const [productChars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState({
        Size: ['none selected', 'A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
        Width: ['none selected', 'Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
        Comfort: ['none selected', 'Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['none selected', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
        Length: ['none selected', 'Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['none selected', 'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    });
    const [displayChar, setDisplayChar] = useState({
        Size: 'none selected',
        Width: 'none selected',
        Comfort: 'none selected',
        Quality: 'none selected',
        Length: 'none selected',
        Fit: 'none selected'
    });

    const [previewSources, setPreviewSources] = useState([]);
    const [rating, setRating] = useState(0);
    const [summary, setSummary] = useState('');
    const [body, setBody] = useState('');
    const [recommend, setRecommend] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [characteristics, setCharacteristics] = useState({});
    const [posted, setPosted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ratingError, setRatingError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setChars(Object.keys(productMeta?.characteristics).map((char) => {
            return ([char, productMeta.characteristics[char].id])
        }));
    }, [productMeta]);

    useEffect(() => {
        if (productChars.length) {
            productChars.forEach(char => setCharacteristics(characteristics => ({...characteristics, [char[1]]: null})));
        }
    }, [productChars]);

    const handleStarClick = (star) => {
        star === 1 ? setSelected({1: true, 2: false, 3: false, 4: false, 5: false })
        : star === 2 ? setSelected({ 1: true, 2: true, 3: false, 4: false, 5: false })
        : star === 3 ? setSelected({ 1: true, 2: true, 3: true, 4: false, 5: false })
        : star === 4 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: false })
        : star === 5 ? setSelected({ 1: true, 2: true, 3: true, 4: true, 5: true })
        : null;
        setRating(star);
    };

    const handleCharRating = (e, char) => {
        setDisplayChar({ ...displayChar, [char]: selectedChar[char][e.target.value]});
        setCharacteristics({ ...characteristics, [e.target.name]: Number(e.target.value) });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.current.reportValidity()) {

            if (rating === 0) {
                setRatingError(true);
                form.current.scrollIntoView(true);
                return;
            }

            if (body.length < 50) {
                setBodyError(true);
                reviewBody.current.scrollIntoView(true);
                return;
            }

            setLoading(true);
            axios.post('/reviews/uploads', {
                product_id: productInfo.id,
                rating,
                summary,
                body,
                recommend,
                name,
                email,
                photos: previewSources,
                characteristics
            })
            .then((res) => {
                setLoading(false);
                setPosted(true)
            })
            .catch((err) => {
                if (err.message?.includes('Unsupported')) {
                    setImageError(true);
                }
                console.log(err)});
        }
    }

    return (
        <div className="reviews new-review-component">
            {!posted ? <>
            <div className="new-review-header">
                <h1 className="reviews-logo">Write Your Review</h1>
                <h3>About the <span className="new-review-product-name">{productInfo.name}</span></h3>
            </div>
            <form className="new-review-body" ref={form}>
                <span className="new-review-category"><span className="new-review-required">* </span>Overall Rating: </span>
                {ratingError ? <span className="write-review-error"> **Please select a rating.** </span> : null}
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
                                <div className="new-review-char-title">{char[0]}:
                                <span className="new-review-char-selection"> {displayChar[char[0]]}</span>
                                </div>
                                <div className="new-review-char-radios">
                                    <label className="char-radio"> {selectedChar[char[0]][1]}
                                        <input
                                            type="radio"
                                            name={char[1]}
                                            value="1"
                                            onChange={(e) => handleCharRating(e, char[0])}
                                            required />
                                    </label>
                                    <input
                                        type="radio"
                                        name={char[1]}
                                        onChange={(e) => handleCharRating(e, char[0])}
                                        value="2"
                                         />
                                    <input
                                        type="radio"
                                        name={char[1]}
                                        onChange={(e) => handleCharRating(e, char[0])}
                                        value="3" />
                                    <input
                                        type="radio"
                                        name={char[1]}
                                        onChange={(e) => handleCharRating(e, char[0])}
                                        value="4" />
                                    <label className="char-radio">
                                        <input
                                            type="radio"
                                            name={char[1]}
                                            onChange={(e) => handleCharRating(e, char[0])}
                                            value="5" />
                                        {selectedChar[char[0]][5]}
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
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required/>
                    </label>
                </div>

                <div className="new-review-category new-review-reviewbody">
                    <span className="new-review-required">* </span>
                    <label>Review Body<br /><br/>
                        <textarea
                            ref={reviewBody}
                            className="new-review-text-form"
                            name="review-body-text"
                            placeholder="Why did you like the product or not?"
                            minLength="50"
                            maxLength="1000"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required />
                    </label>
                    {body.length < 50 ?
                    <div className="new-review-category">Minimum required characters left: {50 - body.length}</div>
                    :
                    <div className="new-review-category">Minimum reached.</div>}
                    {(bodyError && body.length < 50) ? <span className="write-review-error"> **Please type at least 50 characters.**</span> : null}

                </div>
                {imageError ? <div className="write-review-error">**Invalid upload file.**</div> : null}
                <UploadImage
                    previewSources={previewSources}
                    setPreviewSources={setPreviewSources}
                />

                <div className="new-review-category new-review-nickname">
                    <label className="nickname">
                        <span className="new-review-required">* </span>Nickname
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Example: jackson11!"
                            size="40"
                            maxLength="60"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <div className="emaildisclaimer">
                        For authentication reasons, you will not be emailed.
                    </div>
                </div>

                <div className="new-review-category new-review-submit">
                    <button
                    className="reviewsbutton"
                    onClick={(e) => handleSubmit(e)}>SUBMIT REVIEW</button>
                </div>
            </form>
            </> : loading ? <img className="reviews-loading" src="https://res.cloudinary.com/absaga/image/upload/v1662736077/Spin-1s-200px_g6wnrc.gif" />
            : <h1 className="reviews-logo">Thank you for submitting your review!</h1>}
        </div>
    );
};

export default NewReview;