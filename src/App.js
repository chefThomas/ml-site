import { useEffect, useState } from 'react'
import logo from './logo.svg';
import tsLogo from './TFLogo.svg';
import * as toxicity from '@tensorflow-models/toxicity'
import './App.css';

function App() {

  const [ modelLoading, setModelLoading ] = useState( false )
  const [ classifying, setClassifying ] = useState( false )
  const [ sentence, setSentence ] = useState( "Sally is nice" )
  const [ threshold, setThreshold ] = useState( 0.85 )

  useEffect( () => {
    setModelLoading( true )
    toxicity.load( threshold ).then( ( model ) => {
      setModelLoading( false )
      setClassifying( true )
      model.classify( sentence ).then( ( predictions ) => {
        // semi-pretty-print results
        setClassifying( false )
        console.log( JSON.stringify( predictions, null, 2 ) );
      } );
    } );
  }, [ setModelLoading, setClassifying, sentence, threshold ] )

  return (
    <div className="App">
      <header className="App-header">
        <img src={tsLogo} alt='TensorFlow logo' />
        {modelLoading && <>        <img src={logo} className="App-logo" alt="logo" />
          <p>
            Model Loading
          </p></>}
        {classifying && <p>Classifying</p>}
      </header>
    </div>
  );
}

export default App;
