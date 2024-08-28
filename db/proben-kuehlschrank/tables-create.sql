create table SampleKind (
  SampleKindID      integer         not null,
  Text              varchar2(20)    not null,
  ValidNoOfDays     integer         not null,
  constraint pk_samplekind primary key(SampleKindID)
);

create table Tray (
  TrayID            integer         not null,
  DiameterInCM      integer         not null,
  Capacity          integer         not null,
  ExpirationDate    date            null,
  constraint pk_tray primary key(TrayID)
);

create table Sample (
  SampleID          integer       not null,
  SampleKindID      integer       not null,
  ExpirationDate    date          not null,
  constraint pk_sample primary key(SampleID),
  constraint fk_samplekind foreign key (SampleKindID) references SampleKind
);

create table Place (
  TrayID            integer         not null,
  PlaceNo           integer         not null,
  SampleID          integer         not null,
  constraint pk_place primary key(TrayID,PlaceNo),
  constraint fk_tray foreign key (TrayID) references Tray,
  constraint fk_sample foreign key (SampleID) references Sample
);

commit;

