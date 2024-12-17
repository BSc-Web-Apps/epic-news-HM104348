import { type MetaFunction } from '@remix-run/node'
import { json, Link } from '@remix-run/react'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import ParallaxBackground from '#app/components/organisms/Hero/ParallaxBackground.tsx'
import { Button } from '#app/components/ui/button.tsx'
import heroImage from '~/assets/jpg/sample-hero.jpg'
import logo from '~/assets/svg/logo.svg'
import ArticleCard from '~/components/organisms/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export async function loader() {
	const allArticles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
	})

	return json({ allArticles })
}

export default function Index() {
	return (
		<main className="h-full">
			<HeroCallToAction
				image={heroImage}
				imageRight={true}
				hasBackgroundColour={true}
			>
				<div className="flex h-full flex-1 flex-col justify-between p-16">
					<div className="flex flex-col gap-8">
						<h2 className="text-h2">Welcome to Epic News</h2>
						<p className="text-lg">
							Keep up to date with the latest tech news.
						</p>
					</div>

					<Button asChild variant="default" size="lg">
						<Link to="/signup">Sign up</Link>
					</Button>
				</div>
			</HeroCallToAction>

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
								title={article.title}
								category={article.category?.name}
								imageId={article.images[0]?.id}
							/>
						))
					) : (
						<p>No articles found</p>
					)}
				</div>
			</div>

			<button className="... bg-indigo-500 px-8 py-4 hover:bg-blue-400">
				Learn More
			</button>
		</main>
	)
}
