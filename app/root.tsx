import { type LinksFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Document from '~/components/shared-layout/Document'
import ThemeSwitch from '~/components/shared-layout/ThemeSwitch'
import { useNonce } from '~/utils/nonce-provider.ts'
import rootLinkElements from '~/utils/providers/rootLinkElements'
import { type loader } from './__root.server'
import FooterLogoCentre from './components/organisms/Footer/FooterLogoCentre.tsx'
import FooterMenuRight from './components/organisms/Footer/FooterMenuRight'
import HeaderWithSearch from './components/organisms/HeaderWithSearch'
import useTheme from './hooks/useTheme.tsx'

export const links: LinksFunction = () => {
	return rootLinkElements
}
export { headers, meta } from './__root.client.tsx'
export { action, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader>();
	const nonce = useNonce()
	const theme = useTheme()
	return (

		<Document nonce={nonce} theme={theme}>

			<div className="flex h-screen flex-col justify-between">
			<HeaderWithSearch />
				<div className="flex-1">
					<main className="grid h-full place-items-center">
						<h1 className= "text-mega text-pink-500">Your Journey Begins!</h1>
						<p className='text-base text-pink-500 md:text-lg lg:text-xl'>
							Welcome to Epic News, where the latest developments in tech are found.</p>
							<button className="bg-indigo-500 ... px-8 py-4 hover:bg-blue-400">
 								 Learn More
						</button>
					</main>
				</div>
				
				<div className="container flex justify-between pb-5">
          <ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
        </div>
		
       		 <FooterMenuRight />
			</div>
		</Document>
	)
}
