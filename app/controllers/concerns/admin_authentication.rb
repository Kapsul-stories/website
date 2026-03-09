module AdminAuthentication
  extend ActiveSupport::Concern
  
  included do
    before_action :require_admin_login
    helper_method :current_admin, :admin_logged_in?
  end
  
  def current_admin
    @current_admin ||= Admin.find_by(id: session[:admin_id]) if session[:admin_id]
  end
  
  def admin_logged_in?
    current_admin.present?
  end
  
  def require_admin_login
    unless admin_logged_in?
      redirect_to new_admin_session_path, alert: "Vous devez être connecté pour accéder à cette page"
    end
  end
end
