import { Link } from '@remix-run/react'
import { GiFallingLeaf } from 'react-icons/gi'

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
					className="display: flex; 
				flex-direction: flex-col; 
				line-clamp-6 flex h-40 flex-col justify-between rounded-lg bg-green-600 p-4 transition hover:scale-105 hover:bg-green-900"
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'start',
							gap: '0.4rem',
						}}
					>
						<h3> {title}</h3>
					</div>
					<div className="flex items-center gap-2">
						<GiFallingLeaf size={20} /> {} {category?.name || 'General News'}{' '}
					</div>
				</div>
			</div>
		</Link>
	)
}
