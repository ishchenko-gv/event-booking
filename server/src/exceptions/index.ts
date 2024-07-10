export class NotFound extends Error {
  constructor(message?: string) {
    super(message || 'Not found');
  }

  status = 404;
}

export class PermissionDenied extends Error {
  constructor(message?: string) {
    super(message || 'Permission denied');
  }

  status = 403;
}
