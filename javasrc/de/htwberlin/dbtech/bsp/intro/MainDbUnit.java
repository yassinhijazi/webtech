package de.htwberlin.dbtech.bsp.intro;

import java.io.File;
import java.net.URL;
import java.sql.SQLException;

import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.csv.CsvDataSet;
import org.dbunit.dataset.csv.CsvURLDataSet;
import org.dbunit.operation.DatabaseOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.htwberlin.dbtech.utils.DbCred;
import de.htwberlin.dbtech.utils.DbUnitUtils;

public class MainDbUnit {
  private static final Logger L = LoggerFactory.getLogger(MainDbUnit.class);
  private static IDatabaseTester dbTester;
  private static IDatabaseConnection dbTesterCon = null;
  private static String dataDirPath = "de/htwberlin/test/data/";
  private static URL dataFeedUrl = ClassLoader.getSystemResource(dataDirPath);
  private static IDataSet feedDataSet = null;

  public static void main(String[] args) throws SQLException {
    L.info("main - start");
    try {
      dbTester = new JdbcDatabaseTester(DbCred.driverClass, DbCred.url, DbCred.user, DbCred.password, DbCred.schema);
      m0();
    } catch (Exception e) {
      DbUnitUtils.closeDbUnitConnectionQuietly(dbTesterCon);
      throw new RuntimeException(e);
    } finally {
      DbUnitUtils.closeDbUnitConnectionQuietly(dbTesterCon);
    }
    L.info("main - ende");
  }

  static void m0() throws Exception {
    L.info("m0 - start");
    File pre = new File("test-data/raum/pre");
    IDataSet dataSet = new CsvDataSet(pre);
    dbTester.setDataSet(dataSet);
    dbTesterCon = dbTester.getConnection();
    DatabaseOperation.CLEAN_INSERT.execute(dbTesterCon, dataSet);
    L.info("m0 - ende");
  }

  static void m1() throws Exception {
    dbTesterCon = dbTester.getConnection();
    IDataSet dataSet = new CsvURLDataSet(ClassLoader.getSystemResource(dataDirPath));
    dbTester.setDataSet(dataSet);
    DatabaseOperation.CLEAN_INSERT.execute(dbTesterCon, dataSet);
  }
  
  static void m2() throws Exception {
    L.info("Start");
    feedDataSet = new CsvURLDataSet(dataFeedUrl);
    dbTester.setDataSet(feedDataSet);
    ITable table = feedDataSet.getTable("Raum");
    int noOfRows = table.getRowCount();
    for (int i = 0; i < noOfRows; i++) {
      Object sampleId = table.getValue(i, "RaumNr");
      System.out.println(sampleId);
    }
    L.info("Ende");
  }


}
