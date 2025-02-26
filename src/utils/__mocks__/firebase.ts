
export const auth = {
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    currentUser: {
      displayName: "Test User",
      email: "test@example.com",
      uid: "test-uid",
    },
  };
  
  export const GoogleAuthProvider = jest.fn();
  export const GithubAuthProvider = jest.fn();