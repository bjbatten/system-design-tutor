import "@hotwired/turbo-rails"
import "controllers"

// Manually render all mermaid diagrams
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
  
  for (const element of mermaidElements) {
    // Skip if already rendered
    if (element.querySelector('svg')) {
      console.log('Already rendered, skipping')
      continue
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
  }
}

// Render on initial page load
document.addEventListener('turbo:load', renderAllMermaidDiagrams)

// CRITICAL: Handle Turbo Stream updates (fires after stream actions like replace)
document.addEventListener('turbo:before-stream-render', async (event) => {
  // Use setTimeout to ensure DOM is fully updated after the stream renders
  setTimeout(async () => {
    await renderAllMermaidDiagrams()

    // Also remove loading bubble when Mermaid finishes rendering
    const loadingBubble = document.getElementById('loading-bubble')
    if (loadingBubble) {
      loadingBubble.remove()
    }
  }, 100)
})