# System Design Tutor

AI-powered system design interview preparation tool that generates explanations and visual architecture diagrams.

## Features

- **Interactive Q&A**: Ask system design questions and get detailed explanations
- **Visual Diagrams**: Automatic Mermaid diagram generation showing system architecture
- **Real-time Updates**: Turbo-powered chat interface with no page reloads
- **Persistent Conversations**: Save and review past discussions

## Tech Stack

- **Rails 8** - Backend framework
- **PostgreSQL** - Database
- **Claude API** - AI responses
- **Mermaid.js** - Architecture diagram rendering
- **Turbo + Stimulus** - Modern Rails frontend
- **Tailwind CSS** - Styling

## Setup
```bash
# Clone the repo
git clone https://github.com/yourusername/system-design-tutor.git
cd system-design-tutor

# Install dependencies
bundle install

# Setup database
bin/rails db:create db:migrate

# Add your Claude API key
bin/rails credentials:edit
# Add: anthropic: { api_key: your_key_here }

# Start the server
bin/rails server
```

Visit `http://localhost:3000`

## Usage

1. Create a new conversation
2. Ask a system design question (e.g., "How would you design Twitter?")
3. Receive an explanation + visual architecture diagram
4. Ask follow-up questions to refine the design

## Example Questions

- How would you design Twitter?
- Design a URL shortener service
- How would you build Netflix?
- Design a distributed cache system

## Future Enhancements

- Response caching for repeated questions
- Multi-message conversation context
- Streaming AI responses
- Diagram modification and expansion
- Interview practice mode

## License

MIT