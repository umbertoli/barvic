import React from 'react';

const ArticelInput = (props) => {
    const onChange = (e) => {
        props.setQueryCallback(e.target.value);
    }
    return (
        <form className="pa4 black-80">
            <div>
                <label htmlFor="article" className="f6 b db mb2">Článek</label>
                <textarea onChange={onChange} id="article" name="article" className="db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
            </div>
        </form>
    )
}

export default ArticelInput;