import React from 'react';
import {Composition} from 'remotion';
import {PaperSample, TOTAL} from './PaperSample';
import {PaperLight, TOTAL as TOTAL_LIGHT} from './PaperLight';
import {Ep1A, EP1A_TOTAL} from './ep1a/Ep1A';
import {Ep1ASupers} from './ep1a/Supers';
export const Root: React.FC = () => (
  <>
    <Composition id="PaperSample" component={PaperSample} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="PaperLight" component={PaperLight} durationInFrames={TOTAL_LIGHT} fps={30} width={1920} height={1080} />
    <Composition id="Ep1A" component={Ep1A} durationInFrames={EP1A_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Ep1ASupers" component={Ep1ASupers} durationInFrames={EP1A_TOTAL} fps={30} width={1920} height={1080} />
  </>
);
