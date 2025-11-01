// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

async function renderAllMermaidDiagrams() {
  console.log('Checking for mermaid diagrams...')
  
  // Wait for mermaid to be available
  let attempts = 0
  while (typeof window.mermaid === 'undefined' && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 100))
    attempts++
  }
  
  if (typeof window.mermaid === 'undefined') {
    console.error('Mermaid never loaded!')
    return
  }
  
  console.log('Mermaid is available, finding diagrams...')
  
  const mermaidElements = document.querySelectorAll('[data-controller="mermaid"]')
  console.log(`Found ${mermaidElements.length} mermaid elements`)
  
  mermaidElements.forEach(async (element) => {
    // Skip if already rendered
    if (element.querySelector('svg')) {
      console.log('Already rendered, skipping')
      return
    }
    
    const code = element.textContent.trim()
    console.log('Rendering:', code.substring(0, 50) + '...')
    
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    
    try {
      const { svg } = await window.mermaid.render(id, code)
      element.innerHTML = svg
      console.log('Rendered successfully!')
    } catch (error) {
      console.error('Render error:', error)
      element.innerHTML = `<pre class="text-red-500">Error: ${error.message}</pre>`
    }
  })
}

// Render on initial load
document.addEventListener('turbo:load', renderAllMermaidDiagrams)

// Render after turbo updates (like form submissions)
document.addEventListener('turbo:render', renderAllMermaidDiagrams)

// Also try after a short delay (backup)
document.addEventListener('turbo:render', () => {
  setTimeout(renderAllMermaidDiagrams, 500)
})