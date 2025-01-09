import { Link } from '@remix-run/react'

interface ArticleCardProps {
	articleId: string
	category: {
		name: string
	} | null
	id: string
	title: string
}

export default function ArticleCard(articleId: any, article: ArticleCardProps) {
	return (
		<Link to={`/article/${articleId}`}>
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
					<h3>{article.title}</h3>
					<p>{article.category?.name || 'General News'}</p>
				</div>
			</div>
		</Link>
	)
}
