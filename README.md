# Datenbanktechnologien -  Proben-Kühlschranksystem

## Übung 1 

## Übung 2
```java
public interface ICoolingJdbc {

  /**
   * Speichert die uebergebene Datenbankverbindung in einer Instanzvariablen.
   * 
   */
  void setConnection(Connection connection);

  /**
   * Liefert eine Liste mit den Bezeichnungen der Probearten.
   * 
   * @return Liste von Strings mit den Bezeichnungen der Probearten.
   */
  List<String> getSampleKinds();

  /**
   * Liefert das Proben-Objekt, das zu einer sampleId gehoert.
   * 
   * @param sampleId
   *          z.B. 1.
   * @return das Proben-Objekt mit der sampleId.
   * @throws CoolingSystemException
   *           wenn keine Probe mit der id existiert.
   */
  Sample findSampleById(Integer sampleId);

  /**
   * Fuegt einen neuen Proben-Datensatz in die Datenbank ein. Das Ablaufdatum
   * berechnet sich aus dem aktuellen Datum plus Anzahl der gueltigen Tage fuer
   * die Probenart.
   * 
   * @param sampleId
   *          Primaerschuessel der Probe.
   * @param sampleKindId
   *          Fremdschluessel auf die Probenart.
   * @throws CoolingSystemException
   *           wenn der Primaerschuessel bereits existiert.
   * @throws CoolingSystemException
   *           wenn keine Probenart mit der sampleKindId existiert.
   */
  void createSample(Integer sampleId, Integer sampleKindId);

  /**
   * Entsorgt alle Proben eines Tabletts.
   * 
   * @param trayId
   *          Primaerschuessel des Tabletts.
   * @throws CoolingSystemException
   *           wenn der Primaerschuessel nicht existiert.
   */
  void clearTray(Integer trayId);

}
```
## Übung 3
```java
public interface ICoolingService {

  /**
   * Speichert die uebergebene Datenbankverbindung in einer Instanzvariablen.
   * 
   * @author Ingo Classen
   */
  void setConnection(Connection connection);

  /**
   * Sucht ein Tablett, das die Probe aufnehmen kann und erzeugt einen
   * entsprechenden Datensatz in der Tabelle Place. Folgende Bedingungen muessen
   * erfuellt sein:
   * <ul>
   * <li>Der Durchmesser muss passen.</li>
   * <li>Die Probe soll auf das Tablett mit dem kleinsten Ablaufdatum kommen,
   * das groesser als das Ablaufdatum der Probe ist.</li>
   * <li>Auf dem ausgewaehlten Tablett soll die Probe auf den kleinsten freien
   * Platz kommen. Da stellt sicher, dass Luecken gefuellt werden.</li>
   * <li>Gibt es kein passendes Tablett, so wird ein leeres Tablett mit
   * passendem Durchmesser genommen und dessen Ablaufdatum auf das Ablaufdatum
   * der Probe plus 30 Tage gesetzt.</li>
   * <li>Gibt es kein leeres Tablett mit passendem Durchmesser mehr, so wird
   * eine Ausnahme ausgeloest.</li>
   * </ul>
   * 
   * @param sampleId
   *          Primaerschluessel der Probe.
   * @param diameterInCM
   *          Durchmesser des Probenroehrchens. Wird durch einen Sensor
   *          gemessen.
   * @throws CoolingSystemException
   *           falls kein passendes Tablett gefunden werden kann.
   * @throws DataException
   *           bei allen Datenbankfehlern.
   */
  void transferSample(Integer sampleId, Integer diameterInCM);
}
```

## Übung 4
```java
public interface ICoolingService {

  /**
   * Speichert die uebergebene Datenbankverbindung in einer Instanzvariablen.
   * 
   * @author Ingo Classen
   */
  void setConnection(Connection connection);

  /**
   * Sucht ein Tablett, das die Probe aufnehmen kann und erzeugt einen
   * entsprechenden Datensatz in der Tabelle Place. Folgende Bedingungen muessen
   * erfuellt sein:
   * <ul>
   * <li>Der Durchmesser muss passen.</li>
   * <li>Die Probe soll auf das Tablett mit dem kleinsten Ablaufdatum kommen,
   * das groesser als das Ablaufdatum der Probe ist.</li>
   * <li>Auf dem ausgewaehlten Tablett soll die Probe auf den kleinsten freien
   * Platz kommen. Da stellt sicher, dass Luecken gefuellt werden.</li>
   * <li>Gibt es kein passendes Tablett, so wird ein leeres Tablett mit
   * passendem Durchmesser genommen und dessen Ablaufdatum auf das Ablaufdatum
   * der Probe plus 30 Tage gesetzt.</li>
   * <li>Gibt es kein leeres Tablett mit passendem Durchmesser mehr, so wird
   * eine Ausnahme ausgeloest.</li>
   * </ul>
   * 
   * @param sampleId
   *          Primaerschluessel der Probe.
   * @param diameterInCM
   *          Durchmesser des Probenroehrchens. Wird durch einen Sensor
   *          gemessen.
   * @throws CoolingSystemException
   *           falls kein passendes Tablett gefunden werden kann.
   * @throws DataException
   *           bei allen Datenbankfehlern.
   */
  void transferSample(Integer sampleId, Integer diameterInCM);
}
```

## Hinweis

Bedenken Sie bitte, dass eine erfolgreiche Ausführung aller Tests nicht automatisch die Korrektheit Ihrer Lösung sicherstellt. Tests können immer nur die Anwesenheit von Fehlern zeigen, nicht aber deren Abwesenheit. Das liegt daran, dass Tests im Allgemeinen nicht vollständig alle Fehlersituationen abdecken. In der Bewertung Ihrer Lösung ist daher der erfolgreiche Durchlauf aller Tests eine notwendige Bedingung zum Erreichen der vollen Punktzahl. Es kann aber trotzdem Punktabzug geben, falls Ihre Lösung Fehler enthält, die durch die Tests nicht aufgedeckt werden.