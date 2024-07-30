import * as tf from '@tensorflow/tfjs';

let model;

async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/test_Model/model.json');
  }
}

onmessage = async function (e) {
  const { battedBallInput, situationInput, positionInput, lineup, preload } = e.data;

  if (preload) {
    await loadModel();
    postMessage({ preloaded: true });
    return;
  }

  await loadModel();
  const result = await runModel(battedBallInput, situationInput, positionInput, lineup);
  postMessage({ result, lineup });
};

async function runModel(battedBallInput, situationInput, positionInput, lineup) {
  let base_total = 0;
  const numFeatures = 9;

  const lineups_for_eval = tf.tidy(() => {
    return tf.tile(tf.tensor1d(lineup), [battedBallInput.length]).reshape([battedBallInput.length, numFeatures]);
  });

  const battedBall = tf.tensor(battedBallInput);
  const situation = tf.tensor(situationInput);
  const position = tf.tensor(positionInput);

  const prediction = model.predict([battedBall, situation, lineups_for_eval, position]);
  const baseArray = await prediction.data();

  base_total = baseArray.reduce((acc, value) => acc + value, 0);

  tf.dispose([lineups_for_eval, battedBall, situation, position, prediction]);

  return base_total;
}
