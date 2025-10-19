# Sample data for testing the Companies domain

# First, let's create a few companies
tech_company = 
  Curriclick.Companies.Company
  |> Ash.Changeset.for_create(:create, %{
    name: "TechCorp Brasil",
    industry: "Technology",
    cnpj: "12.345.678/0001-90",
    description: "A leading technology company in Brazil, specializing in web development and AI solutions."
  })
  |> Ash.create!()

education_company = 
  Curriclick.Companies.Company
  |> Ash.Changeset.for_create(:create, %{
    name: "EduLearn",
    industry: "Education", 
    cnpj: "98.765.432/0001-10",
    description: "An innovative education technology company focused on online learning platforms."
  })
  |> Ash.create!()

# Create some job listings
senior_ml_job = 
  Curriclick.Companies.JobListing
  |> Ash.Changeset.for_create(:create, %{
    job_role_name: "Senior Machine Learning Engineer",
    job_description: "Lead the development of ML models for our AI-powered products. You will work with large datasets, implement ML algorithms, and collaborate with product teams to deploy models to production.",
    company_id: tech_company.id
  })
  |> Ash.create!()

junior_dev_job = 
  Curriclick.Companies.JobListing
  |> Ash.Changeset.for_create(:create, %{
    job_role_name: "Junior Full-Stack Developer",
    job_description: "Join our development team to build modern web applications using Phoenix LiveView and React. You'll contribute to both frontend and backend development while learning from senior developers.",
    company_id: tech_company.id
  })
  |> Ash.create!()

product_manager_job = 
  Curriclick.Companies.JobListing
  |> Ash.Changeset.for_create(:create, %{
    job_role_name: "Product Manager - EdTech",
    job_description: "Drive product strategy and roadmap for our educational platform. Work closely with engineering, design, and stakeholders to deliver features that improve student learning outcomes.",
    company_id: education_company.id
  })
  |> Ash.create!()

# Add job requirements for the Senior ML Engineer position
Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "5+ years of experience in Machine Learning and Python",
  is_required: true,
  job_listing_id: senior_ml_job.id
})
|> Ash.create!()

Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Experience with TensorFlow or PyTorch",
  is_required: true,
  job_listing_id: senior_ml_job.id
})
|> Ash.create!()

Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Knowledge of cloud platforms (AWS, GCP, or Azure)",
  is_required: false,
  job_listing_id: senior_ml_job.id
})
|> Ash.create!()

# Add job requirements for the Junior Developer position  
Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Bachelor's degree in Computer Science or related field",
  is_required: true,
  job_listing_id: junior_dev_job.id
})
|> Ash.create!()

Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Basic understanding of web development (HTML, CSS, JavaScript)",
  is_required: true,
  job_listing_id: junior_dev_job.id
})
|> Ash.create!()

Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Experience with Elixir/Phoenix framework",
  is_required: false,
  job_listing_id: junior_dev_job.id
})
|> Ash.create!()

# Add job requirements for the Product Manager position
Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "3+ years of product management experience",
  is_required: true,
  job_listing_id: product_manager_job.id
})
|> Ash.create!()

Curriclick.Companies.JobRequirement
|> Ash.Changeset.for_create(:create, %{
  requirement_text: "Experience in EdTech or Education industry",
  is_required: false,
  job_listing_id: product_manager_job.id
})
|> Ash.create!()

IO.puts("✅ Sample companies, job listings, and job requirements created successfully!")
IO.puts("Visit http://localhost:4000/admin to view and manage the data.")