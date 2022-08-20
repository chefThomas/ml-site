import { useEffect, useState } from 'react';
import '../App.css';
import {
  Anchor,
  Button,
  Container,
  SimpleGrid,
  Slider,
  Text,
  Textarea,
  Title,
} from '@mantine/core';

import logo from './logo.svg';
import * as toxicity from '@tensorflow-models/toxicity';

function Toxicity() {
  const [modelLoading, setModelLoading] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [sentence, setSentence] = useState('Sally is nice!');
  const [threshold, setThreshold] = useState(0.8);

  function classify() {
    setModelLoading(true);
    toxicity.load(threshold).then((model) => {
      setModelLoading(false);
      setClassifying(true);
      model.classify(sentence).then((predictions) => {
        setClassifying(false);
        console.log(JSON.stringify(predictions, null, 2));
      });
    });
  }

  return (
    <div>
      <Title order={1} mb="md">
        Language-based Classifier
      </Title>
      <Container size="sm" sx={{ marginLeft: 0, marginBottom: '100px' }}>
        <Text size="md" color="dimmed">
          Uses Google's pre-trained model{' '}
          <Anchor
            href="https://github.com/tensorflow/tfjs-models/tree/master/toxicity"
            target="_blank"
          >
            Toxicity{' '}
          </Anchor>
          to detect toxic content, such as identity-based insults, threats and
          more. The model was built using{' '}
          <Anchor href="https://www.tensorflow.org/js" target="_blank">
            TensorFlow.js
          </Anchor>
          : Google's adaptation of their TensorFlow library for use in the
          browser and Node applications.
        </Text>
      </Container>
      <Container>
        <Textarea
          value={sentence}
          onChange={(event) => setSentence(event.currentTarget.value)}
          placeholder="Your sentence"
          label="Sentence to classify"
          withAsterisk
          sx={{ marginBottom: '20px' }}
        />
        <Text size="sm">Threshold</Text>
        <SimpleGrid cols={2}>
          <Slider
            label="Threshold"
            marks={[
              { value: 0, label: '0.0' },
              { value: 20, label: '0.2' },
              { value: 50, label: '0.5' },
              { value: 80, label: '0.8' },
              { value: 100, label: '1.0' },
            ]}
            value={threshold}
            onChange={setThreshold}
          />
          <Button sx={{ marginLeft: 'auto' }} onClick={classify}>
            Classify
          </Button>
        </SimpleGrid>
      </Container>
      {modelLoading && (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Model Loading</p>
        </>
      )}
      {classifying && <p>Classifying</p>}
    </div>
  );
}

export default Toxicity;
