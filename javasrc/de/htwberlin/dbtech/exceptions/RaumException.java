package de.htwberlin.dbtech.exceptions;

public class RaumException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public RaumException() {
  }

  public RaumException(Throwable t) {
    super(t);
  }

  public RaumException(String msg) {
    super(msg);
  }
}
