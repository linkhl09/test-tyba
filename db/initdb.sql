CREATE TABLE IF NOT EXISTS USERS (
  username varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(250) NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS HISTORY (
  ID SERIAL,
  endpoint varchar(250) NOT NULL,
  username varchar(200),
  params varchar(500),
  PRIMARY KEY( ID )
);

CREATE TABLE IF NOT EXISTS REVOKED_SESSIONS (
  token varchar(250) NOT NULL,
  PRIMARY KEY (token)
);