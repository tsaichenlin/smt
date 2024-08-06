import * as tf from '@tensorflow/tfjs';

let model;

async function loadModel() {
  if (!model) {
    console.log('loading Model');
    model = await tf.loadLayersModel('/Model/model.json');
    console.log('model loaded');
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
  console.log(lineup,battedBallInput.length);
  const result = await runModel(battedBallInput, situationInput, positionInput, lineup);
  postMessage({ result, lineup });
};

async function runModel(battedBallInput, situationInput, positionInput, lineup) {
  let base_total = 0;
  const numFeatures = 9;

  const lineups_for_eval = tf.tile(tf.tensor1d(lineup), [battedBallInput.length]).reshape([battedBallInput.length, numFeatures]);


  const battedBall = tf.tensor(battedBallInput);
  const situation = tf.tensor(situationInput);
  const position = tf.tile(tf.tensor1d(positionInput), [battedBallInput.length]).reshape([battedBallInput.length, numFeatures]);
  console.log('before');
  const prediction = model.predict([battedBall, situation, lineups_for_eval, position]);
  console.log('after');
  const baseArray = await prediction.data();

  base_total = baseArray.reduce((acc, value) => acc + value, 0);

  tf.dispose([lineups_for_eval, battedBall, situation, position, prediction]);

  return base_total;
}
