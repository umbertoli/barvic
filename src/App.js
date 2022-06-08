
import React, {useState} from 'react';
import './App.css';
import 'tachyons';
import QueryInput from './QueryInput';
import QueryColored from './QueryColored';
import ArticelInput from './ArticleInput';

function App() {
  const [query, setQuery] = useState('');
  const [article, setArticle] = useState('');
  return (
    <div>
      <article className="pa3 pa5-ns">
        <h1 className="f3 f2-m f1-l">Barvič</h1>
        <QueryInput setQueryCallback={setQuery}/>
        <ArticelInput setQueryCallback={setArticle} />
        <QueryColored query={query} article={article}/>
      </article>

    </div>
  );
}

export default App;
