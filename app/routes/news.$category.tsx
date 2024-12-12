import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '#app/utils/db.server.ts'
import { toTitleCase } from '#app/utils/stringUtils.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params
	invariant(typeof category === 'string', 'Category not found')

	const categoryTitle = toTitleCase(category)

	const allArticles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
	})
	return json({ categoryTitle, allArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, allArticles } = useLoaderData<typeof loader>()
	return (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			></meta>

			<div className="container py-16">
				<h2 className="pb-6 text-h2">{categoryTitle}</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 ">
					{allArticles.map(article => (
						<div
							className="line-clamp-6 flex h-40 flex-col justify-between rounded-lg bg-green-600 p-4 transition hover:scale-105
							hover:bg-green-900"
							key={article.id}
						>
							<h3>{article.title}</h3>
							<p>{article.category?.name || 'General News'}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
