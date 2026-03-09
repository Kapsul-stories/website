class Article < ApplicationRecord
  CATEGORIES = ["Guides & itinéraires", "Creator Academy", "Actualités"]
  
  validates :title, presence: true
  validates :content, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }
  
  before_save :set_published_at
  
  scope :published, -> { where(published: true).order(published_at: :desc) }
  scope :by_category, ->(category) { where(category: category) }
  
  def publish!
    update(published: true, published_at: Time.current)
  end
  
  def unpublish!
    update(published: false)
  end
  
  private
  
  def set_published_at
    if published && published_at.nil?
      self.published_at = Time.current
    elsif !published
      self.published_at = nil
    end
  end
end
