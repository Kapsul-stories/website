class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.string :category
      t.boolean :published
      t.string :author
      t.datetime :published_at

      t.timestamps
    end
  end
end
