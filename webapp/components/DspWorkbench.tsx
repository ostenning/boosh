import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import FourierGraph from './FourierGraph';
import { Dsp, DspProcessor, DspProcessorType } from '../types/interfaces';
import ProcessChainSelector from './ProcessChangeSelector';

const AUDIO_BUFFER_SIZE = 4096;

const dspInit = async (): Promise<Dsp> => {
  try {
    if (typeof document === 'undefined') return null;
    const dsp = await import('../../dsp/pkg/boosh_dsp');
    dsp.init(AUDIO_BUFFER_SIZE);
    return dsp;
  } catch (err) {
    console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    return null;
  }
};

const beginAudio = async (callback: (this: MessagePort, ev: MessageEvent<any>) => void) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    await audioContext.audioWorklet.addModule('audio-processor.js');
    const sourceProcessor = new AudioWorkletNode(audioContext, 'audio-processor',);
    source.connect(sourceProcessor);
    sourceProcessor.connect(audioContext.destination);
    sourceProcessor.port.onmessage = callback;
  } catch (e) {
    console.error(e);
  }
};

let SAMPLES: number[] = [];

const DspWorkbench = dynamic({
  ssr: false,
  loader: async () => {
    const dsp = await dspInit();
    beginAudio(({ data }: { data: Float32Array }) => {
      if (!data) return;
      const newData = Array.from(data);
      const current = [...SAMPLES, ...newData];
      SAMPLES = current.slice(Math.max(current.length - AUDIO_BUFFER_SIZE, 0));
    });

    return () => {
      if (!dsp) return <div>Loading...</div>;
      const [samples, setSamples] = useState<number[]>([]);
      const [processors, setProcessors] = useState<DspProcessor[]>([]);

      useEffect(() => {
        setInterval(() => {
          debugger;
          setSamples(SAMPLES);
        }, 100);
      }, []);

      console.info('update');
      return (
        <div>
          <FourierGraph samples={samples} dsp={dsp} />
          <ProcessChainSelector
            processors={processors}
            onChainChange={processors => setProcessors(processors)}
          />
        </div>
      );
    };
  },
});

export default DspWorkbench;