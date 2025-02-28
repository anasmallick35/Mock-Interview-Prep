
interface GlobalImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MEASUREMENT_ID: string;
  VITE_HASURA_ADMIN: string;
}

interface GlobalImportMeta {
  env: GlobalImportMetaEnv;
}

interface Global {
  import: {
    meta: GlobalImportMeta;
  };
}

declare var global: Global;

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_FIREBASE_API_KEY: 'mock-api-key',
        VITE_FIREBASE_AUTH_DOMAIN: 'mock-auth-domain',
        VITE_FIREBASE_PROJECT_ID: 'mock-project-id',
        VITE_FIREBASE_STORAGE_BUCKET: 'mock-storage-bucket',
        VITE_FIREBASE_MESSAGING_SENDER_ID: 'mock-messaging-sender-id',
        VITE_FIREBASE_APP_ID: 'mock-app-id',
        VITE_FIREBASE_MEASUREMENT_ID: 'mock-measurement-id',
        VITE_HASURA_ADMIN: 'mock-hasura-admin',
      },
    },
  },
  writable: true,
});

export default global.import.meta.env;
  