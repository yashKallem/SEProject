
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


CREATE TABLE public.education (
	id serial4 NOT NULL,
	user_id int4 NULL,
	institute_name varchar(100) NULL,
	start_year int4 NULL,
	end_year int4 NULL,
	"degree" varchar(50) NULL,
	department varchar(50) NULL,
	createdat timestamp NULL DEFAULT now(),
	CONSTRAINT education_pkey PRIMARY KEY (id),
	CONSTRAINT education_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);


CREATE TABLE public.network (
	id serial4 NOT NULL,
	user_id int4 NULL,
	connected_user_id int4 NULL,
	CONSTRAINT network_pkey PRIMARY KEY (id),
	CONSTRAINT network_connected_user_id_fkey FOREIGN KEY (connected_user_id) REFERENCES public.users(user_id),
	CONSTRAINT network_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);

-- Create the skills table

CREATE TABLE public.skills (
	id serial4 NOT NULL,
	user_id int4 NULL,
	skill varchar(50) NULL,
	createdat timestamp NULL DEFAULT now(),
	CONSTRAINT skills_pkey PRIMARY KEY (id),
	CONSTRAINT skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);

-- Create the projects table
CREATE TABLE public.projects (
	id serial4 NOT NULL,
	project_name varchar(100) NOT NULL,
	project_description text NOT NULL,
	project_role text NOT NULL,
	"location" text NOT NULL,
	published_at timestamp NOT NULL DEFAULT now(),
	job_description text NOT NULL,
	published_by serial4 NOT NULL,
	deadline timestamp NOT NULL,
	CONSTRAINT projects_pkey PRIMARY KEY (id),
	CONSTRAINT fk_project_requirements_users FOREIGN KEY (published_by) REFERENCES public.users(user_id) ON DELETE CASCADE
);


CREATE TABLE public.summary (
	id serial4 NOT NULL,
	user_id int4 NULL,
	summary text NULL,
	createdat timestamp NULL DEFAULT now(),
	CONSTRAINT summary_pkey PRIMARY KEY (id),
	CONSTRAINT summary_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);



-- Create the teams table
CREATE TABLE public.teams (
	team_id serial4 NOT NULL,
	team_name varchar(100) NOT NULL,
	project_id int4 NOT NULL,
	created_at timestamp NULL DEFAULT now(),
	CONSTRAINT teams_pkey PRIMARY KEY (team_id)
);

-- Create the team_members table
CREATE TABLE public.team_members (
	team_id int4 NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT team_members_pkey PRIMARY KEY (team_id, user_id),
	CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE,
	CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

CREATE TABLE public.user_projects (
	user_id int8 NOT NULL,
	project_id int8 NULL,
	CONSTRAINT user_project_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);

CREATE TABLE public.work_experience (
	id serial4 NOT NULL,
	user_id int4 NULL,
	work_title varchar(100) NOT NULL,
	company_name varchar(100) NOT NULL,
	work_industry varchar(50) NULL,
	from_date date NOT NULL,
	till_date date NOT NULL,
	achievements text NULL,
	createdat timestamp NULL DEFAULT now(),
	CONSTRAINT work_experience_pkey PRIMARY KEY (id),
	CONSTRAINT work_experience_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);






-- Insert data into the education table
INSERT INTO public.education (user_id, institute_name, start_year, end_year, degree, department) VALUES
(1, 'University of California, Berkeley', 2010, 2014, 'Bachelor of Science', 'Computer Science'),
(2, 'Massachusetts Institute of Technology', 2008, 2012, 'Bachelor of Science', 'Electrical Engineering'),
(3, 'Stanford University', 2009, 2013, 'Bachelor of Arts', 'English'),
(4, 'Harvard University', 2011, 2015, 'Bachelor of Arts', 'Political Science');

-- Insert data into the network table
INSERT INTO public.network (user_id, connected_user_id) VALUES
(1, 2),
(1, 3),
(2, 4),
(3, 4);

-- Insert data into the skills table
INSERT INTO public.skills (user_id, skill) VALUES
(1, 'Java'),
(2, 'Python'),
(3, 'JavaScript'),
(4, 'Ruby');

-- Insert data into the projects table
INSERT INTO public.projects (project_name, project_description, project_role, location, published_at, job_description, published_by, deadline) VALUES
('E-commerce Website', 'Developed a responsive e-commerce website using AngularJS', 'Front-end Developer', 'San Francisco', '2020-01-01', 'Looking for a talented front-end developer with experience in AngularJS', 1, '2020-03-01'),
('Mobile App', 'Developed a mobile app using React Native', 'Mobile Developer', 'New York', '2021-02-01', 'Looking for an experienced mobile developer with skills in React Native', 2, '2021-04-01'),
('Data Analysis Tool', 'Developed a data analysis tool using Python', 'Data Scientist', 'Seattle', '2022-01-01', 'Looking for a data scientist with experience in Python', 3, '2022-03-01'),
('Web Application', 'Developed a web application using Ruby on Rails', 'Full-stack Developer', 'Boston', '2023-01-01', 'Looking for a talented full-stack developer with skills in Ruby on Rails', 4, '2023-03-01');

-- Insert data into the summary table
INSERT INTO public.summary (user_id, summary) VALUES
(1, 'I am a highly motivated and creative software developer with experience in Java and AngularJS'),
(2, 'I am a skilled Python developer with experience in data analysis and machine learning'),
(3, 'I am an experienced web developer with skills in JavaScript and React'),
(4, 'I am a passionate political scientist with expertise in international relations and conflict resolution');

-- Insert data into the teams table
INSERT INTO public.teams (team_name, project_id) VALUES
('Web Development', 1),
('Mobile Development', 2),
('Data Science', 3),
('Full-stack Development', 4);

-- Insert data into the team_members table
INSERT INTO public.team_members (team_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4),
(4, 1),
(4, 4);




