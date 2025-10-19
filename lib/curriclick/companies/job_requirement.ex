defmodule Curriclick.Companies.JobRequirement do
  use Ash.Resource,
    otp_app: :curriclick,
    domain: Curriclick.Companies,
    data_layer: AshPostgres.DataLayer,
    authorizers: [Ash.Policy.Authorizer],
    extensions: [AshTypescript.Resource]

  postgres do
    table "job_requirements"
    repo Curriclick.Repo
  end

  typescript do
    type_name "JobRequirement"
  end

  actions do
    defaults [:read, :destroy]

    create :create do
      accept [:title, :requirement_text, :is_required, :job_listing_id]
    end

    update :update do
      accept [:title, :requirement_text, :is_required]
    end
  end

  policies do
    # For now, allow all operations - you can restrict this later based on your needs
    policy always() do
      authorize_if always()
    end
  end

  attributes do
    uuid_primary_key :id

    attribute :title, :string do
      description "Short title/summary for this requirement (e.g., 'Bachelor's in CS', '5+ years React')"
      allow_nil? true
      public? true
      constraints max_length: 50
    end

    attribute :requirement_text, :string do
      description "The specific requirement text (e.g., '5+ years of Python experience', 'Bachelor's degree in Computer Science')"
      allow_nil? false
      public? true
      constraints max_length: 5000
    end

    attribute :is_required, :boolean do
      description "Whether this is a required qualification (true) or preferred/nice-to-have (false)"
      allow_nil? false
      public? true
      default true
    end

    attribute :job_listing_id, :uuid do
      description "ID of the job listing this requirement belongs to"
      allow_nil? false
      public? true
    end

    create_timestamp :inserted_at
    update_timestamp :updated_at
  end

  relationships do
    belongs_to :job_listing, Curriclick.Companies.JobListing do
      source_attribute :job_listing_id
      destination_attribute :id
      public? true
    end
  end
end
