import { Reaction } from './types.ts';
import { globalState } from './GlobalState.ts';

export function autorun(callback: Reaction) {
  const prevDerivationCallback = globalState.trackingDerivation;
  globalState.trackingDerivation = callback;
  callback();

  globalState.trackingDerivation = prevDerivationCallback;
}
