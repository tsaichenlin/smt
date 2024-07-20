import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const ModelLoader = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load the model from the JSON file
        const loadedModel = await tf.loadGraphModel('/model/model.json');
        setModel(loadedModel);
        console.log('Model loaded successfully');
        setLoading(false);
      } catch (err) {
        console.error('Error loading model:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  const makePrediction = async () => {
    if (model) {
      try {
        // Example input, modify the shape if necessary to match the model's expected input shape
        const input = tf.tensor2d([[0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]], [1, 20]);

        // Make a prediction
        const predictionTensor = model.predict(input);

        // Extract the prediction value
        const predictionArray = await predictionTensor.data();
        const predictionValue = predictionArray[0];

        // Set the prediction value in the state
        setPrediction(predictionValue);
        console.log('Prediction for input:', predictionValue);

        // Dispose tensors to avoid memory leaks
        input.dispose();
        predictionTensor.dispose();
      } catch (err) {
        console.error('Error making prediction:', err);
        setError(err);
      }
    } else {
      console.error('Model is not loaded yet');
      setError('Model is not loaded yet');
    }
  };

  return (
    <div>
      <h1>TensorFlow.js Model Prediction</h1>
      <button onClick={makePrediction}>Make Prediction</button>
      {prediction !== null && <div>Prediction: {prediction}</div>}
      {error && <div>Error: {error.toString()}</div>}
    </div>
  );
};


export default ModelLoader;
