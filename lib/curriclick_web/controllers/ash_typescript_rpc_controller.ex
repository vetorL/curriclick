defmodule CurriclickWeb.AshTypescriptRpcController do
  use CurriclickWeb, :controller

  def run(conn, params) do
    result = AshTypescript.Rpc.run_action(:curriclick, conn, params)
    json(conn, result)
  end

  def validate(conn, params) do
    result = AshTypescript.Rpc.validate_action(:curriclick, conn, params)
    json(conn, result)
  end
end
