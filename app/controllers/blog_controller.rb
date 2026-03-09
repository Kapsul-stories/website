class BlogController < ApplicationController
  def index
    @articles = Article.published
    @articles = @articles.by_category(params[:category]) if params[:category].present?
    @categories = Article::CATEGORIES
  end

  def show
    @article = Article.find(params[:id])
  end
end
