import React from 'react';
import styled from 'styled-components';
import { DspProcessor, DspProcessorType } from '../types/interfaces';

interface Props {
  processors: DspProcessor[];
  onChainChange: (processors: DspProcessor[]) => void;
}

const ProcessChainSelector: React.FC<Props> = props => {
  return (
    <ProcessChangeSelectorWrapper>
      <div>{props.processors.map(i => <Item>{i.type}</Item>)}</div>
      <button onClick={(e) => {
        const updated = [...props.processors];
        const proc: DspProcessor = { type: DspProcessorType.whiteNoise };
        updated.push(proc);
        props.onChainChange(updated);
      }}>
        white noise
      </button>
    </ProcessChangeSelectorWrapper>
  );
};

const ProcessChangeSelectorWrapper = styled.div`
  display: flex;
  align-items: flex-start;  
  background-color: blue;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: black solid 1px;
  padding: 15px;
  border-radius: 2px;
`;

export default ProcessChainSelector;
