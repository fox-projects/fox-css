import gulp from 'gulp'
const { dest, parallel, series, src, watch } = gulp
import concat from 'gulp-concat'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import postcssImport from 'postcss-import'
import bs from 'browser-sync'
import autoprefixer from 'autoprefixer'
import rename from 'gulp-rename'
import { deleteSync } from 'del'

export const serve = (() => {
	const browserSync = bs.create()

	let postCssPlugins = [postcssImport, autoprefixer]

	async function init() {
		browserSync.init({ server: 'site' })
	}

	async function htmlReload() {
		watch(['samples/*.html'], { ignoreInitial: false }, async function htmlReloadCb() {
			src(['samples/*.html', '!samples/index.html'])
				.pipe(dest('site/dark'))
				.pipe(dest('site/light'))

			src('samples/index.html').pipe(dest('site'))

			browserSync.reload()
		})
	}

	async function cssInject() {
		watch('src/*.css', { ignoreInitial: false }, async function cssInjectWatchCb() {
			src('src/theme.light.css')
				.pipe(plumber())
				.pipe(concat('fox.css'))
				.pipe(postcss(postCssPlugins))
				.pipe(dest('site/light/styles'))
				.pipe(browserSync.stream())

			src('src/theme.dark.css')
				.pipe(plumber())
				.pipe(concat('fox.css'))
				.pipe(postcss(postCssPlugins))
				.pipe(dest('site/dark/styles'))
				.pipe(browserSync.stream())
		})
	}

	return series(init, parallel(htmlReload, cssInject))
})()

export async function build() {
	let postCssPlugins = [postcssImport, autoprefixer]

	deleteSync(['dist/*', '!dist'])
	src('site/dark/styles/fox.css')
		.pipe(postcss(postCssPlugins))
		.pipe(rename('fox.light.min.css'))
		.pipe(dest('dist'))

	src('site/dark/styles/fox.css')
		.pipe(postcss(postCssPlugins))
		.pipe(rename('fox.dark.min.css'))
		.pipe(dest('dist'))
		.pipe(rename('fox.min.css'))
		.pipe(dest('dist'))
}

export default serve
