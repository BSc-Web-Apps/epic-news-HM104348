import {
	type Key,
	type ReactElement,
	type JSXElementConstructor,
	type ReactNode,
	type ReactPortal,
} from '#node_modules/@types/react'

export default function ArticleCard(article: {
	id: Key | null | undefined
	title:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| Iterable<ReactNode>
		| ReactPortal
		| null
		| undefined
	category: { name: any }
}) {
	return (
		<div>
			<div
				className="display: flex; flex-direction: flex-col; line-clamp-6 flex h-40 flex-col justify-between rounded-lg
							bg-green-600 p-4 transition
								hover:scale-105 hover:bg-green-900"
				key={article.id}
			>
				{' '}
				<p>Artical Card</p>
				<h1>News For You</h1>
			</div>
		</div>
	)
}
