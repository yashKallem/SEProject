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