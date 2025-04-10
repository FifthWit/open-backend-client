export class PStreamBackend {
  private readonly backendUrl: string;

  constructor(backendUrl: string = 'https://backend.fifthwit.net') {
    this.backendUrl = backendUrl
  }
}