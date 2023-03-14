-- Insert sample data into users table
INSERT INTO users (given_name, last_name, email, phone_number, address, gender, education_level, course_of_study, "password", "role", dob)
VALUES
  ('John', 'Doe', 'john.doe@example.com', '555-1234', '123 Main St', 'Male', 'Bachelor', 'Computer Science', 'password1', 'user', '1990-01-01'),
  ('Jane', 'Doe', 'jane.doe@example.com', '555-5678', '456 Broad St', 'Female', 'Master', 'Business Administration', 'password2', 'admin', '1985-02-15');

-- Insert sample data into skills table
INSERT INTO skills (user_id, skill)
VALUES
  (1, 'Java'),
  (1, 'Python'),
  (2, 'SQL'),
  (2, 'Leadership');

-- Insert sample data into education table
INSERT INTO education (user_id, institute_name, start_year, end_year, degree, department)
VALUES
  (1, 'XYZ University', 2008, 2012, 'Bachelor of Science', 'Computer Science'),
  (2, 'ABC University', 2010, 2012, 'Master of Business Administration', 'Finance');

-- Insert sample data into work_experience table
INSERT INTO work_experience (user_id, work_title, company_name, work_industry, from_date, till_date, achievements)
VALUES
  (1, 'Software Engineer', 'ACME Corp', 'Software Development', '2012-06-01', '2015-12-31', 'Led the development of a new mobile app'),
  (2, 'Marketing Manager', 'XYZ Corp', 'Marketing', '2013-03-01', '2016-07-31', 'Developed and executed successful marketing campaigns');

-- Insert sample data into summary table
INSERT INTO summary (user_id, summary)
VALUES
  (1, 'Experienced software engineer with expertise in Java and Python.'),
  (2, 'Marketing professional with a Master of Business Administration and strong leadership skills.');

-- Insert sample data into network table
INSERT INTO network (user_id, connected_user_id)
VALUES
  (1, 2),
  (2, 1);
