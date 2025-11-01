class Message < ApplicationRecord
  belongs_to :conversation
  validates :role, inclusion: { in: %w[user assistant] }
end
