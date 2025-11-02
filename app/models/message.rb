class Message < ApplicationRecord
  belongs_to :conversation
  validates :role, inclusion: { in: %w[user assistant] }

  # Generate cache key for a question
  def self.cache_key_for(question)
    # Normalize: lowercase, remove punctuation, trim
    normalized = question.downcase.strip.gsub(/[^\w\s]/, "")
    "system_design:#{Digest::SHA256.hexdigest(normalized)}"
  end
end
