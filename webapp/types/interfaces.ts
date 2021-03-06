export interface Dsp {
  default: typeof import('/Users/oliver/repositories/boosh/dsp/pkg/boosh_dsp');
  run(): void;
  add(a: number, b: number): number;
  fft(data: Float64Array): Float64Array;
}

export enum DspProcessorType {
  delay = 'delay',
  reverb = 'reverb',
  whiteNoise = 'whiteNoise',
}

export interface DspProcessor {
  type: DspProcessorType;
}