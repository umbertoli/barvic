import React from 'react';
import { highlight, countLeftBrackets, countRightBrackets, countQuotes } from './highlight';
// import { highlightByQuery } from './hightlighter';

const QueryColored = ({ query, article }) => {
    let res = 'no text';
    // res = highlight(query, article);
    if (query && article) {
        if (countLeftBrackets(query) === countRightBrackets(query) && countQuotes(query) % 2 === 0) {
            const output = highlight(query, article);
            res = <div>
                    <div className="success-pattern mb4 athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
                        Shoda: {Object.keys(output.successPatterns).join(' ')}
                    </div>
                    {output.result}
                </div>;
        } else {
            res = <span className="error-highlight">Chyba v query syntaxi</span>;
        }
        // try {
        //     res = highlight(query, article);
        // } catch (error) {
        //     res = <span className="error-highlight">Chyba v query syntaxi</span>;
        // }
        console.log(res);
    }
    // return <div className="measure lh-copy" dangerouslySetInnerHTML={{ __html: res }} />
    return <div className="measure lh-copy" >{res}</div>


}

export default QueryColored;