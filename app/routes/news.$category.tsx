import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '#app/utils/db.server.ts'
import { toTitleCase } from '#app/utils/stringUtils.ts'
import ArticleCard from '#app/components/organisms/ArticleCard.tsx'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params
	invariant(typeof category === 'string', 'Category not found')

	const categoryTitle = toTitleCase(category)

	const filteredArticles = await prisma.article.findMany({
		where: {
			category: {
				slug: category,
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
	})
	return json({ categoryTitle, filteredArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, filteredArticles } = useLoaderData<typeof loader>()
	console.log({ filteredArticles })
	return (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			></meta>

			<div className="container py-16">
				<h2 className="pb-6 text-h2">{categoryTitle}</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 ">
					{filteredArticles.map(article => (
						<ArticleCard
							key={article.id}
							id={article.id}
							title={article.title}
							category={article.category}
						/>
					))}
				</div>
			</div>
		</>
	)
}
