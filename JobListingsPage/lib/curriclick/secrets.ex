defmodule Curriclick.Secrets do
  use AshAuthentication.Secret

  def secret_for(
        [:authentication, :tokens, :signing_secret],
        Curriclick.Accounts.User,
        _opts,
        _context
      ) do
    Application.fetch_env(:curriclick, :token_signing_secret)
  end
end
