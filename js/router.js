import { parseMarkdown } from './parser.js'
import { updateActiveMenuItem } from './menu.js'

const ARTICLES_DIR = './articles'

async function loadArticle(name) {
	const contentEl = document.getElementById('article-content')
	contentEl.innerHTML = '<div class="loader">Загрузка статьи...</div>'

	try {
		const response = await fetch(
			`${ARTICLES_DIR}/${encodeURIComponent(name)}.md`,
		)
		if (!response.ok) {
			throw new Error('Файл не найден')
		}

		const markdown = await response.text()
		contentEl.innerHTML = parseMarkdown(markdown)

		Prism.highlightAllUnder(contentEl)
	} catch (error) {
		contentEl.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Не удалось загрузить статью "${name}".</p>`
	}
}

export function initRouter(articles) {
	const handleRoute = () => {
		const rawHash = window.location.hash.slice(1)
		const articleName = decodeURIComponent(rawHash)

		if (articleName && articles.includes(articleName)) {
			loadArticle(articleName)
			updateActiveMenuItem(articleName)
		} else if (articles.length > 0) {
			window.location.hash = encodeURIComponent(articles[0])
		}
	}

	window.addEventListener('hashchange', handleRoute)
	handleRoute()
}
