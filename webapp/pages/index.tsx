import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import FourierGraph from '../components/FourierGraph';
import { Dsp } from '../types/interfaces';
import debounce from '../utils/debounce';

const dspInit = async (): Promise<Dsp> => {
  try {
    if (typeof document === 'undefined') return null;
    const dsp = await import('../../dsp/pkg');
    return dsp;
  } catch (err) {
    console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    return null;
  }
};

const beginAudio = async (
  callback: (this: ScriptProcessorNode, ev: AudioProcessingEvent) => any
) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = callback;
};

const DspWorkbench = dynamic({
  ssr: false,
  loader: async () => {
    const dsp = await dspInit();
    return () => {
      if (!dsp) return <div>Loading...</div>;
      const [samples, setSamples] = useState<Float32Array>();

      beginAudio((e) => {
        try {
          const data = e?.inputBuffer?.getChannelData(0);
          if (data && data.length) {
            debounce(() => {
              setSamples(data);
            }, 200);
          }
        } catch (e) {
          console.error(e);
        }
      });

      return (
        <div>
          <FourierGraph samples={samples} dsp={dsp} />
        </div>
      );
    };
  },
});

const Page = () => {
  return (
    <div>
      <h1>Workbench</h1>
      <DspWorkbench />
    </div>
  );
};

export default Page;
