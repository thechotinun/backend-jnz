export default () => ({
  PORT: process.env.PORT,
  ENDPOINT_API: process.env.ENDPOINT_API || 'http://localhost:3000',
});
