import logo from '~/assets/svg/logo.svg'

export default function NavLogo() {
	return (
		<div className="flex items-center gap-4">
			<img src={logo} alt="Epic News Logo" className="w-16" />
			<span className="text-sm text-foreground">Epic News</span>
		</div>
	)
}
