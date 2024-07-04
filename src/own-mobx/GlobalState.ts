import { Reaction } from './types.ts';

class GlobalState {
  trackingDerivation: Reaction | null = null;
}

export const globalState = new GlobalState();
