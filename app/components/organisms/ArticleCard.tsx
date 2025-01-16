import { Link } from '@remix-run/react'

interface ArticleCardProps {
	articleId: string
	category: {
		name: string
	} | null
	title: string
}

export default function ArticleCard({
	articleId,
	title,
	category,
}: ArticleCardProps) {
	return (
		<Link to={`/article/${articleId}`}>
			<div>
				<div
					className="display: flex; flex-direction: flex-col; line-clamp-6 flex h-40 flex-col justify-between rounded-lg
 bg-green-600 p-4 transition hover:scale-105 hover:bg-green-900"
				>
					<h3>{title}</h3>
					<p>{category?.name || 'General News'}</p>
				</div>
			</div>
		</Link>
	)
}
