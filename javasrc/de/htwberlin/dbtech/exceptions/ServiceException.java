package de.htwberlin.dbtech.exceptions;

public class ServiceException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public ServiceException() {
  }

  public ServiceException(Throwable t) {
    super(t);
  }

  public ServiceException(String msg) {
    super(msg);
  }
}
