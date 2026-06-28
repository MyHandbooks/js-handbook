import { initTheme } from './theme.js'
import { initMobileMenu, renderMenu } from './menu.js'
import { initRouter } from './router.js'

async function init() {
	initTheme()
	initMobileMenu()

	try {
		const response = await fetch('./articles.json')
		const articles = await response.json()

		renderMenu(articles)
		initRouter(articles)
	} catch (error) {
		document.getElementById('menu').innerHTML = '<li>Ошибка загрузки меню</li>'
	}
}

init()
