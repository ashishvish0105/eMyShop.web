export const environment = {
  BaseUrl: 'https://localhost:44352/api/',
  production: false,
  /**
   * Isolated FoodieDash customer OTP mock. Set to false once Auth/SendOtp
   * and Auth/VerifyOtp are available on the API. Never enable in a real
   * production deployment.
   */
  storefrontAuthMock: true,
};
