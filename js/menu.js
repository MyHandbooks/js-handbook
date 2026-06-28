export function renderMenu(articles) {
	const menuEl = document.getElementById('menu')
	menuEl.innerHTML = ''

	articles.forEach(name => {
		const li = document.createElement('li')
		const a = document.createElement('a')
		a.href = `#${encodeURIComponent(name)}`
		a.textContent = name
		a.dataset.name = name
		li.appendChild(a)
		menuEl.appendChild(li)
	})
}

export function updateActiveMenuItem(activeName) {
	document.querySelectorAll('#menu a').forEach(a => {
		if (a.dataset.name === activeName) {
			a.classList.add('active')
		} else {
			a.classList.remove('active')
		}
	})
}

export function initMobileMenu() {
	const menuToggle = document.getElementById('menu-toggle')
	const sidebar = document.getElementById('sidebar')

	menuToggle.addEventListener('click', () => {
		menuToggle.classList.toggle('open')
		sidebar.classList.toggle('open')
	})

	document.getElementById('menu').addEventListener('click', e => {
		if (e.target.tagName === 'A') {
			menuToggle.classList.remove('open')
			sidebar.classList.remove('open')
		}
	})
}
