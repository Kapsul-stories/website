Rails.application.routes.draw do
  # Admin routes
  namespace :admin do
    resources :articles
    resources :sessions, only: [:new, :create, :destroy]
    get 'login', to: 'sessions#new'
    delete 'logout', to: 'sessions#destroy'
  end
  
  # Blog routes
  resources :blog, only: [:index, :show], path: 'journal'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "pages#index"
  get "about", to: "pages#about"
  get "product", to: "pages#product"
  get "commercants", to: "pages#commercants"
  get "collectivites", to: "pages#collectivites"
  get "ambassadeurs", to: "pages#ambassadeurs"
end
