export class InvalidUserOrPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserOrPasswordError';
  }

  status = 400;
}
