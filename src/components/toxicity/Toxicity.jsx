import { useEffect, useState } from 'react';
import '../../App.css';
import {
  Anchor,
  Button,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Slider,
  Space,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import Table from './Table';

import logo from '../logo.svg';
import * as toxicity from '@tensorflow-models/toxicity';

function Toxicity() {
  const [modelLoading, setModelLoading] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [sentence, setSentence] = useState('Sally is nice!');
  const [sliderValue, setSliderValue] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [results, setResults] = useState(null);

  function classify() {
    setModelLoading(true);
    toxicity.load(threshold).then((model) => {
      setModelLoading(false);
      setClassifying(true);
      model.classify(sentence).then((predictions) => {
        setClassifying(false);
        console.log(JSON.stringify(predictions, null, 2));
        setResults(predictions, null, 2);
        console.log(results);
      });
    });
  }

  useEffect(() => {
    setThreshold(sliderValue * 0.01);
  }, [sliderValue]);

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
            label={`.${sliderValue}`}
            marks={[
              { value: 0, label: '0.0' },
              { value: 25, label: '0.25' },
              { value: 50, label: '0.5' },
              { value: 75, label: '0.75' },
              { value: 100, label: '1.0' },
            ]}
            value={sliderValue}
            onChange={setSliderValue}
          />
          <Button sx={{ marginLeft: 'auto' }} onClick={classify}>
            Classify
          </Button>
        </SimpleGrid>
      </Container>
      <Space h="lg" />
      <Container>
        <Space h="lg" />
        {modelLoading || classifying ? (
          <Center>
            <Loader size={50} />
          </Center>
        ) : (
          results && <Table results={results} />
        )}
      </Container>
    </div>
  );
}

export default Toxicity;
