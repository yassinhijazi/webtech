package de.htwberlin.dbtech.bsp.auktion;

import java.math.BigDecimal;
import java.sql.Connection;

public interface IAuktionsService {
  public void setConnection(Connection connection);  
  void biete(Integer aid, BigDecimal angebotspreis);

}
