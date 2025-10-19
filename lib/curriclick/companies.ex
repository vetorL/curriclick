defmodule Curriclick.Companies do
  use Ash.Domain, otp_app: :curriclick, extensions: [AshAdmin.Domain, AshTypescript.Rpc]

  admin do
    show? true
  end

  typescript_rpc do
    resource Curriclick.Companies.JobListing do
      rpc_action :list_job_listings, :read
      rpc_action :get_job_listing, :read
    end

    resource Curriclick.Companies.Company do
      rpc_action :list_companies, :read
    end

    resource Curriclick.Companies.JobRequirement do
      rpc_action :list_job_requirements, :read
    end
  end

  resources do
    resource Curriclick.Companies.Company
    resource Curriclick.Companies.JobListing
    resource Curriclick.Companies.JobRequirement
  end
end
