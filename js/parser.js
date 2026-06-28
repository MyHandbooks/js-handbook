export function parseMarkdown(markdown) {
	let cleanMarkdown = markdown.replace(/^---[\s\S]*?---/, '')

	cleanMarkdown = cleanMarkdown.replace(/\[\[(.*?)\]\]/g, (match, content) => {
		const parts = content.split('|')
		const targetArticle = parts[0].trim()
		const displayText = parts[1] ? parts[1].trim() : targetArticle

		return `<a href="#${encodeURIComponent(targetArticle)}">${displayText}</a>`
	})

	return marked.parse(cleanMarkdown)
}
