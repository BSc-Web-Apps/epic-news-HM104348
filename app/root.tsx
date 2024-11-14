import { type LinksFunction } from '@remix-run/node'
import Document from '~/components/shared-layout/Document'
import { useNonce } from '~/utils/nonce-provider.ts'
import rootLinkElements from '~/utils/providers/rootLinkElements'
export const links: LinksFunction = () => {
	return rootLinkElements
}
export { headers, meta } from './__root.client.tsx'
export { action, loader } from './__root.server.tsx'

export default function App() {
	const nonce = useNonce()

	return (

		<Document nonce={nonce}>

			<div className="flex h-screen flex-col justify-between bg-green-300">
				<div className="flex-1">
					<main className="grid h-full place-items-center">
						<h1 className= "text-mega text-gray-700">Your Journey Begins!</h1>
						<p className='text-base text-gray-700 md:text-lg lg:text-xl'>
							Welcome to Epic News, where the latest developments in tech are found.</p>
							<button className="bg-indigo-500 ... px-8 py-4 hover:bg-blue-400">
 								 Learn More
						</button>
					</main>
				</div>
			</div>
		</Document>
	)
}
