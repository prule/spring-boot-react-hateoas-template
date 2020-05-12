export default class Environment {

  static instance() {
    return Environment.configuration[document.domain];
  }

  static configuration = {
    'localhost': {
      api: 'http://localhost:8080',
      web: 'http://localhost:3000',
      logEnabled: true
    }
  }
}