CREATE TABLE users (
  user_id serial4 NOT NULL,
  given_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email varchar(100) NOT NULL,
  phone_number VARCHAR(20),
  address VARCHAR(100),
  gender VARCHAR(10),
  education_level varchar(50) NOT NULL,
  course_of_study varchar(50) NOT NULL,
  "password" varchar(100) NOT NULL,
  "role" varchar(20) NOT NULL,
  dob date NOT NULL,
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_pkey PRIMARY KEY (user_id)
);


CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  skill VARCHAR(50)
);

CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  institute_name VARCHAR(100),
  start_year INTEGER,
  end_year INTEGER,
  degree VARCHAR(50),
  department VARCHAR(50)
);

CREATE TABLE work_experience (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  work_title VARCHAR(100),
  company_name VARCHAR(100),
  work_industry VARCHAR(50),
  from_date DATE,
  till_date DATE,
  achievements TEXT
);

CREATE TABLE summary (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  summary TEXT
);

CREATE TABLE network (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  connected_user_id INTEGER REFERENCES users(user_id)
);
