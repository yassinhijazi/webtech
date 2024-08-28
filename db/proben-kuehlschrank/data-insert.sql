alter session set nls_date_format = 'YYYY-MM-DD';

-- SampleKind
-- SampleKindID, Text, ValidNoOfDays
insert into samplekind values(1,'Blood',4);
insert into samplekind values(2,'Serum',5);
insert into samplekind values(3,'Urine',6);

-- Tray
-- TrayID, DiameterInCM, Capacity, ExpirationDate
insert into tray values( 1, 1, 50, '2017-01-31');
insert into tray values( 2, 1, 50, '2017-02-28');
insert into tray values( 3, 1, 50, '2017-03-31');
insert into tray values( 4, 1, 50, null);
insert into tray values( 5, 1, 50, null);

insert into tray values( 6, 2, 25, null);
insert into tray values( 7, 2, 25, null);
insert into tray values( 8, 2, 25, null);
insert into tray values( 9, 2, 25, null);
insert into tray values(10, 2, 25, null);

insert into tray values(11, 3, 16, null);
insert into tray values(12, 3, 16, null);
insert into tray values(13, 3, 16, null);
insert into tray values(14, 3, 16, null);

insert into tray values(15, 4, 12, null);
insert into tray values(16, 4, 12, null);
insert into tray values(17, 4, 12, null);

insert into tray values(18, 20, 2, '2017-03-31');
insert into tray values(19, 20, 2, '2017-04-30');

-- Sample
-- SampleID, SampleKindID, ExpirationDate
-- in tray 1
insert into sample values (10, 1, '2017-01-24');
insert into sample values (11, 1, '2017-01-23');
insert into sample values (12, 2, '2017-01-22');
insert into sample values (13, 2, '2017-01-23');

-- in no tray
insert into sample values (20, 2, '2017-03-23');

-- in tray 2
insert into sample values (30, 2, '2017-02-05');
insert into sample values (31, 2, '2017-02-06');

-- in tray 3
insert into sample values (40, 2, '2017-03-10');
insert into sample values (41, 1, '2017-03-11');

-- in tray 18
insert into sample values (50, 2, '2017-04-10');
insert into sample values (51, 1, '2017-04-11');

-- in tray 19
insert into sample values (60, 2, '2017-04-10');

-- Place
-- TrayID, PlaceNo, SampleID
insert into place values (1, 1, 10);
insert into place values (1, 2, 11);
insert into place values (1, 3, 12);
insert into place values (1, 4, 13);

insert into place values (2, 1, 30);
insert into place values (2, 2, 31);

insert into place values (3, 1, 40);
insert into place values (3, 2, 41);

insert into place values (18, 1, 50);
insert into place values (18, 2, 51);

insert into place values (19, 1, 60);

commit;