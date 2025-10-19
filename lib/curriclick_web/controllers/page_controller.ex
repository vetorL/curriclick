defmodule CurriclickWeb.PageController do
  use CurriclickWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end

  def index conn, _params do
    render(conn, :index)
  end

  def jobs(conn, _params) do
    render(conn, :jobs)
  end
end
