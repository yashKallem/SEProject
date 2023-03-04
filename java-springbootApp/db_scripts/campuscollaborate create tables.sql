
CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	given_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	dob date NOT NULL,
	education_level varchar(50) NOT NULL,
	course_of_study varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"role" varchar(20) NOT NULL,
	created_at timestamp NULL DEFAULT now(),
	phone varchar(255) NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);
CREATE INDEX email_idx ON public.users USING btree (email);


-- Create the skills table
CREATE TABLE skills (
  skill_id SERIAL PRIMARY KEY,
  skill_name VARCHAR(50) NOT NULL
);

-- Create the projects table
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(100) NOT NULL,
  project_description TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the project_skills table
CREATE TABLE project_skills (
  project_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  PRIMARY KEY (project_id, skill_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- Create the teams table
CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL,
  project_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Create the team_members table
CREATE TABLE team_members (
  team_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (team_id, user_id),
  FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE public.user_projects (
	user_id int8 NOT NULL,
	project_id int8 NULL,
	CONSTRAINT user_project_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);





