import "@testing-library/jest-dom";


if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}


if (typeof global.TextDecoder === "undefined") {
  const { TextDecoder } = require("util");
  global.TextDecoder = TextDecoder as unknown as {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
    prototype: TextDecoder;
  };
}

// @ts-nocheck

Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_FIREBASE_API_KEY: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_AUTH_DOMAIN: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_PROJECT_ID: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_STORAGE_BUCKET: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_MESSAGING_SENDER_ID: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_APP_ID: 'random_' + Math.random().toString(36).slice(2),
    VITE_FIREBASE_MEASUREMENT_ID: 'random_' + Math.random().toString(36).slice(2)
  },
  writable: false,
});
