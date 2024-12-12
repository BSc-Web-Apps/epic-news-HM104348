import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { toTitleCase } from '#app/utils/stringUtils.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	const categoryTitle = toTitleCase(category)

	console.log({ category })

	return json({})
}
export default function NewsCategoryPage() {
	const { categoryTitle } = useLoaderData<typeof loader>()
	return (
		<div className="container py-16">
			<h2 className="text-h2">Generic news category page</h2>
		</div>
	)
}
