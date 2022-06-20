export function highlight(queryString, article) {
    const queryGroups = queryParser(queryString);
    const coloredGroups = article.split(' ').map(word => ({ word, groups: [] }));
    const successPatterns = {};
    for (let i = 0; i < queryGroups.length; i++) {
        const group = queryGroups[i];
        coloredGroups.map(item => {
            for (let pattern of group) {
                const re = new RegExp('^'+pattern+'$', "i");
                let cleanedWord = item.word.replaceAll(/[.,:"'!?;-]/g, '');
                if (re.test(cleanedWord)) {
                    item.groups.push(i);
                    successPatterns[pattern] = true;
                }
            }
        })
    }

    const result = coloredGroups.map((item, i) => {
        let cssClasses = '';
        if (item.groups.length) {
            cssClasses = item.groups.map(g => 'highlight-' + g).join(' ');
        }
        return <span>
            <span key={'highlight-' + i} className={cssClasses}>{item.word}</span> </span>
    })

    return { successPatterns, result };
}

function queryParser(query) {
    const parenthesisDivided = splitQueryByBrackets(query);
    let clearedGroups = [];
    for (let bracketGroup of parenthesisDivided) {

        let clearedGroup = clearQuery(bracketGroup);

        console.log('~~', clearedGroup);
        const splittedWordToArr = splitToWordsArr(clearedGroup);
        clearedGroups.push(splittedWordToArr);

    }
    clearedGroups = clearedGroups.filter(item => item !== '');

    clearedGroups = clearedGroups.map(splitMultiWordStringsToArray);

    // console.log(parenthesisDivided);
    console.log(clearedGroups);

    return clearedGroups;
}

function splitMultiWordStringsToArray(arr) {
    let result = [];
    console.log(arr);
    for(let word of arr) {
        console.log(word);
        if(typeof word === 'string' && word !== '') {
            result.push(...word.split(' '));
        }
    }
    // console.log(result);
    return result;
}

function splitQueryByBrackets(query) {
    let parenthesisDivided = [];
    let groupIndex = 0;
    const groupStack = [];
    for (let i = 0; i < query.length; i++) {
        const char = query[i];
        if (char === '(') {
            groupStack.push(i);
            groupIndex = i;
            continue;
        } else if (char === ")") {
            groupIndex = groupStack.pop();
            continue;
        }
        if (parenthesisDivided[groupIndex] === undefined) {
            parenthesisDivided[groupIndex] = '';
        }
        parenthesisDivided[groupIndex] += char;
    }
    parenthesisDivided = parenthesisDivided.map(item => item.trim()).filter(item => item);

    return parenthesisDivided;

}


function splitToWordsArr(query) {
    let isInQuotes = false;
    let word = '';
    let wordsArr = [];
    for (let char of query) {
        if (char === '"') {
            if (isInQuotes) {
                if (word.length) {
                    wordsArr.push(word);
                    word = '';
                }
            }
            isInQuotes = !isInQuotes;
            continue;
        }
        if (char === ' ' && !isInQuotes) {
            if (word.length) {
                wordsArr.push(word);
                word = '';
            }
            continue;
        }
        word += char;
    }
    if (word.length) {
        wordsArr.push(word);
    }

    return wordsArr;

}

function clearQuery(query) {
    let tmpQuery = query.replaceAll(/(\(|\))/g, ' ');
    tmpQuery = tmpQuery.replaceAll(/\s(OR|AND|NOT)\s/g, ' ');
    tmpQuery = tmpQuery.replaceAll(/"(OR|AND|NOT)\s/g, '" ');
    tmpQuery = tmpQuery.replaceAll(/(OR|AND|NOT)"/g, ' "');
    tmpQuery = tmpQuery.replaceAll(/AND/g, ' ');


    tmpQuery = tmpQuery.replaceAll('?', '.');
    // tmpQuery = tmpQuery.replaceAll('*', '[^a-z]*'); 
    tmpQuery = tmpQuery.replaceAll('*', '[\\S]*');
    tmpQuery = tmpQuery.replaceAll('~\d', '');
    return tmpQuery;
}

const countOccurenceOfChar = (findingChar, sentence) => sentence.split('').reduce((prev, char) => char === findingChar ? ++prev : prev, 0)
export const countLeftBrackets = countOccurenceOfChar.bind(null, '(');
export const countRightBrackets = countOccurenceOfChar.bind(null, ')');
export const countQuotes = countOccurenceOfChar.bind(null, '"');


