export class CustomerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomerError';
  }
}
