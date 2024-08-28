package de.htwberlin.dbtech.bsp.test;

import java.net.URL;
import java.sql.Connection;
import java.sql.Statement;

import org.dbunit.Assertion;
import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.csv.CsvURLDataSet;
import org.dbunit.operation.DatabaseOperation;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.htwberlin.dbtech.utils.DbCred;
import de.htwberlin.dbtech.utils.DbUnitUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DbTest {
  private static final Logger L = LoggerFactory.getLogger(DbTest.class);
  private static IDatabaseTester dbTester;
  private static IDatabaseConnection dbTesterCon = null;
  private static String dataDirPath = "de/htwberlin/test/data/";
  private static URL dataFeedUrl = ClassLoader.getSystemResource(dataDirPath);
  private static IDataSet feedDataSet = null;

  @BeforeClass
  public static void setUp() {
    L.debug("start");
    try {
      dbTester = new JdbcDatabaseTester(DbCred.driverClass, DbCred.url, DbCred.user, DbCred.password, DbCred.schema);
      dbTesterCon = dbTester.getConnection();
      feedDataSet = new CsvURLDataSet(dataFeedUrl);
      dbTester.setDataSet(feedDataSet);
      DatabaseOperation.CLEAN_INSERT.execute(dbTesterCon, feedDataSet);
    } catch (Exception e) {
      DbUnitUtils.closeDbUnitConnectionQuietly(dbTesterCon);
      throw new RuntimeException(e);
    }
  }

  @AfterClass
  public static void tearDown() throws Exception {
    L.debug("start");
    DbUnitUtils.closeDbUnitConnectionQuietly(dbTesterCon);
  }

  @org.junit.Test
  public void testInsertNewRoom() throws Exception {
    Connection c = dbTesterCon.getConnection();
    String sql = "insert into raum values(4,'A030', 30)";
     Statement s = c.createStatement();
     s.executeUpdate(sql);

    // Hole Daten aus der Tabelle Raum
    IDataSet databaseDataSet = dbTesterCon.createDataSet();
    ITable actualTable = databaseDataSet.getTable("raum");

    // Lade erwartete Daten aus der Testdaten-DB
    URL url = ClassLoader.getSystemResource("de/htwberlin/test/post/");
    IDataSet expectedDataSet = new CsvURLDataSet(url);
    ITable expectedTable = expectedDataSet.getTable("raum");

    // Pruefe, ob die Datenmengen uebereinstimmen
    Assertion.assertEquals(expectedTable, actualTable);
  }

}
