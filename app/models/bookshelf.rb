class Bookshelf < ApplicationRecord
  validates :user, presence: true
  validates :book, uniqueness: { scope: :shelf_type }
  validates :shelf_type, presence: true

  belongs_to :user
  belongs_to :book
end