import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for libraries like react-router in Jest
import { TextEncoder, TextDecoder } from 'util';
// @ts-ignore
if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
// @ts-ignore
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}