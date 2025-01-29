import { type MetaFunction } from '@remix-run/node'
import { json, Link, useLoaderData } from '@remix-run/react'
import ParallaxBackground from '#app/components/organisms/Hero/ParallaxBackground.tsx'
import { Button } from '#app/components/ui/button.tsx'
import heroImage from '~/assets/jpg/sample-hero.jpg'
import logo from '~/assets/svg/logo.svg'
import ArticleCard from '~/components/organisms/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export async function loader() {
	const allArticles = await prisma.article.findMany({
		where: { isPublished: true },

		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
		},
	})

	return json({ allArticles })
}

export default function Index() {
	const { allArticles } = useLoaderData<typeof loader>()
	return (
		<main className="h-full">
			<ParallaxBackground
				image={heroImage}
				title="Epic News"
				logo={logo}
				altText="Welcome to Epic News, where the latest developments in tech are found."
			>
				<div className="mx-auto flex w-fit flex-1 flex-col justify-between gap-16 bg-secondary/40 px-28 py-16 backdrop-blur-sm">
					<p className="text-center text-4xl font-extrabold text-secondary-foreground">
						The latest tech news in one place
					</p>
					<div className="flex justify-center gap-8">
						<Button variant="default" size="wide">
							<Link to="/signup">Sign up</Link>
						</Button>
						<Button variant="secondary" size="wide">
							<Link to="/login">Login</Link>
						</Button>
					</div>
				</div>
			</ParallaxBackground>

			<div className="container py-16">
				<h2 className="mb-8 text-h2 font-normal">Latest news</h2>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{allArticles.length > 0 ? (
						allArticles.map(article => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category}
							/>
						))
					) : (
						<p>No articles found</p>
					)}
				</div>
			</div>
		</main>
	)
}
