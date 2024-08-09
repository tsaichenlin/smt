from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras import regularizers
import json
import numpy as np
from flask_cors import CORS

class WeightedAverageLayer(tf.keras.layers.Layer):
    def __init__(self, kernel_regularizer='l1', **kwargs):
        super(WeightedAverageLayer, self).__init__(**kwargs)
        self.kernel_regularizer = regularizers.get(kernel_regularizer)

    def build(self, input_shape):
        # Initialize the trainable weights for the weighted average
        self.kernel = self.add_weight(shape=(input_shape[1],),
                                      initializer='random_normal',
                                      trainable=True,
                                      regularizer=self.kernel_regularizer)

        # A small value added to weights to avoid division by zero
        self.epsilon = 1e-10

    def call(self, inputs):
        # Compute the weighted sum

        zero_col = tf.zeros_like(inputs[:, :, :1])
        inputs = tf.concat([zero_col, inputs[:, :, 1:]], axis=-1)

        inputs = tf.transpose(inputs, perm=[0, 2, 1])
        inputs = inputs * self.kernel
        inputs = tf.transpose(inputs, perm=[0, 2, 1])
        weighted_sum = tf.reduce_sum(inputs, axis=1)
        # Compute the sum of weights
        weights_sum = tf.reduce_sum(self.kernel) + self.epsilon
        # Calculate the weighted average
        weighted_average = weighted_sum / weights_sum
        return weighted_average
app = Flask(__name__)
CORS(app)
print("start")
batted_bal = json.load(open('./data/batted_ball_Input.json'))
situation = json.load(open('./data/situation_Input.json'))
print('json loaded')
model = tf.keras.models.load_model('./model/saved_model_SitEmb_input0_refined_properWeighted_noPlayerKey_withAttention_fixedlineup_retrian_normalize.keras', custom_objects={'WeightedAverageLayer': WeightedAverageLayer})
model.summary()
lineup = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
lineup = np.tile(np.array(lineup), (3890, 1))

# Use a global variable to store the data
global_data = {'data': '404'}

situation_id = []
for x in situation:
    situation_id.append(x[3] * 8 + x[2] * 4 + x[1] * 2 + x[0])
base_RV = 7217.105
print('initialized')
ans = {
    'RV_player': [],
    'RV_lineup': 0,
    'TopPlayers': [],
    'BottomPlayers': []
}

@app.route('/data')
def members():
    RV_lineup = []
    for a in range( 10):
        lineup = [0]+global_data['data']
        lineup[a] = a
        lineup = np.tile(np.array(lineup), (3890, 1))
        RV = model.predict([
            np.asarray(batted_bal[:3890]).astype('float32'),
            np.asarray(situation_id[:3890]).astype('float32'),
            np.asarray(lineup[:3890]).astype('float32'),
            np.tile(np.array([0,1,2,3,4,5,6,7,8,9]), (3890, 1))
        ])[0].sum()
        print(lineup[0],RV) 
        if a==0:
            RV_lineup.append(float(base_RV - RV))
        else:
             RV_lineup.append(float(RV - base_RV + RV_lineup[0] )*748/base_RV)
    ans['RV_player'] = RV_lineup[1:]
    ans['RV_lineup'] = RV_lineup[0]*748/base_RV
    print(global_data['data'])  # Access the global variable
    order = sorted(list(enumerate(RV_lineup[1:])), key=lambda x:x[1])
    global_data['data']
    top =[]
    for a in order[-3:]:
        top.append(global_data['data'][a[0]])
    bottom =[]
    for a in order[:3]:
        bottom.append(global_data['data'][a[0]])
    ans['TopPlayers'] = top
    ans['BottomPlayers'] = bottom
    print(ans)
    return jsonify(ans)

@app.route('/data', methods=['POST'])
def receive_data():
    global global_data  # Access the global variable
    received_data = request.get_json()
    if isinstance(received_data['data'], str):
        # Convert the JSON string to a Python list
        global_data['data'] = []
        for a in json.loads(received_data['data']):
            global_data['data'].append(int(a))
    else:
        global_data['data'] = received_data['data']
    print(global_data)  # You can process the data here
    return jsonify({'message': 'Data received successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
