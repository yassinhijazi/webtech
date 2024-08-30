# Datenbanktechnologien -  Proben-Kühlschranksystem
Dieses Repository beinhaltet den kompletten Satz an Übungsaufgaben für das Modul "Datenbanktechnologien" an der HTW Berlin. Die Aufgaben basieren auf dem Anwendungsfall eines automatisierten  Kühlschranksystems, in denen Blut-, Serum- und Urinproben gelagert werden können.

Importieren sie das Repository in ihren eigenen Github-Account und setzen sie die Sichtbarkeit auf "private", damit andere Gruppen nicht ihre Lösungen einsehen können. Klonen sie dan ihr Repository (nicht meines) und bearbeiten sie es mit der IDE ihrer Wahl (VS Code, IntelliJ, Eclipse)

- Anleitung Import 
[(link)](bbb)
- Anleitung VS Code 
[(link)](https://ic-htw.github.io/home/lv/dbtech/p/ide-vscode.html)
- Anleitung IntelliJ 
[(link)](bbb)
- Anleitung Eclipse 
[(link)](bbb)

## Datenmodell
Zur Bearbeitung der Aufgaben müssen sie das Datenmodell in ihrer eigenen Datenbank anlegen.
- Beschreibung des Datenmodells 
[(pdf)](https://github.com/ic-htw/dbtech-pks/blob/main/doc/pks-beschreibung.pdf)
- SQL-Code zur Erzeugung der Tabellen und zum Einfügen der Daten
[(link)](https://github.com/ic-htw/dbtech-pks/tree/main/db/proben-kuehlschrank)

## Übungen
Es gibt eine Übung zur Wiederholung von SQL, zwei Übungen zur Implementierung von datenbank-orientierten Diensten in Java und eine Übung zur Implementierung eines datenbank-orientierten Dienstes in PL/SQL. 

Für die Dienste werden Test bereitgestellt, mit denen sie die Funktionsfähigkeit ihrer Lösungen überprüfen können. Bedenken Sie aber, dass eine erfolgreiche Ausführung aller Tests nicht automatisch die Korrektheit Ihrer Lösung sicherstellt. Tests können immer nur die Anwesenheit von Fehlern zeigen, nicht aber deren Abwesenheit. Das liegt daran, dass Tests im Allgemeinen nicht vollständig alle Fehlersituationen abdecken. In der Bewertung Ihrer Lösung ist daher der erfolgreiche Durchlauf aller Tests eine notwendige Bedingung zum Erreichen der vollen Punktzahl. Es kann aber trotzdem Punktabzug geben, falls Ihre Lösung Fehler enthält, die durch die Tests nicht aufgedeckt werden.

### Übung 1 
Diese Übung dient zur Wiederholung von SQL und zur Einarbeitung in die Struktur der Daten im Proben-Kühlschranksystem. Die Bearbeitung dieser Übung ist freiwillig, eine Abgabe der Lösungen ist nicht erforderlich. 

- SQL-Aufgaben 
[(link)](https://github.com/ic-htw/dbtech-pks/blob/main/db/aufgaben/ue01/pks-sql.pdf)


### Übung 2
Diese Übung dient zur Implementierung einfacher Dienste in Java. Dabei geht es im wesentlichen um die Verwaltung der Daten.
```java
public interface ICoolingJdbc {
  List<String> getSampleKinds();
  Sample findSampleById(Integer sampleId);
  void createSample(Integer sampleId, Integer sampleKindId);
  void clearTray(Integer trayId);
}
```
Details zu den Diensten finden sie hier 
[(link)](https://github.com/ic-htw/dbtech-pks/blob/main/javasrc/de/htwberlin/dbtech/aufgaben/ue02/ICoolingJdbc.java)


### Übung 3
Diese Übung dient zur Implementierung eines komplexen Dienstes in Java. Dabei geht es um die Einlagerung von Proben unter Berücksichtigung von Verfallsdaten und Probengrößen.
```java
public interface ICoolingService {
  void transferSample(Integer sampleId, Integer diameterInCM);
}
```
Details zu den Diensten finden sie hier 
[(link)](https://github.com/ic-htw/dbtech-pks/blob/main/javasrc/de/htwberlin/dbtech/aufgaben/ue03/ICoolingService.java)

### Übung 4
Diese Übung dient zur Implementierung eines komplexen Dienstes innerhalb des Datenbanksystems mit PL/SQL. Dabei soll der Dienst aus Übung 3 in diesem neuen Umfeld reimplementiert werden.
```sql
create or replace package cooling_service as
  exc_data exception;
  pragma exception_init(exc_data, -20001);
  exc_cooling_system exception;
  pragma exception_init(exc_cooling_system, -20002);

  procedure transfer_sample(
    p_sample_id sample.sampleid%type, 
    p_diameter_in_cm tray.diameterincm%type);
end cooling_service;
```
PL/SQL-Code zu dieser Übung finden sie hier 
[(link)](https://github.com/ic-htw/dbtech-pks/tree/main/db/aufgaben/ue04)