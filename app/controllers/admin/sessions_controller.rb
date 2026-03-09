class Admin::SessionsController < ApplicationController
  def new
  end

  def create
    admin = Admin.find_by(email: params[:email])
    if admin&.authenticate(params[:password])
      session[:admin_id] = admin.id
      redirect_to admin_articles_path, notice: "Connexion réussie"
    else
      flash.now[:alert] = "Email ou mot de passe incorrect"
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session[:admin_id] = nil
    redirect_to root_path, notice: "Déconnexion réussie"
  end
end
