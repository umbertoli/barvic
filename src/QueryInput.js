import React, {useState} from 'react';

const QueryInput = (props) => {
    const onChange = (e) => {
        props.setQueryCallback(e.target.value);
    }
    return (
        <form className="pa4 black-80">
            <div>
                <label htmlFor="comment" className="f6 b db mb2">Query</label>
                <textarea onChange={onChange} id="comment" name="comment" className="db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
                <small id="comment-desc" className="f6 black-60">Helper text for a form control. Can use this text to <a href="#" className="link underline black-80 hover-blue">link to more info.</a></small>
            </div>
        </form>
    )
}

export default QueryInput;