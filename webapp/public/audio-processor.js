class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  // static get parameterDescriptors() {
  //   return [{
  //     name: 'dsp',
  //     defaultValue: {},
  //     minValue: 0,
  //     maxValue: 1,
  //     automationRate: 'a-rate'
  //   }]
  // }

  process(inputs, outputs, parameters) {
    // By default, the node has single input and output.
    const input = inputs[0];

    // process the data 
    // ..

    // send the input data to our main thread
    this.port.postMessage(input[0]); // just the first channel for now

    // output the data
    const output = outputs[0];
    for (let channel = 0; channel < output.length; ++channel) {
      output[channel].set(input[channel]);
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor)