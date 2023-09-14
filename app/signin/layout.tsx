export default function SignInLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return ( // TODO: fix scrollable
		<section className="min-h-screen h-screen overflow-y-hidden flex items-center justify-center ">
			<div className="inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
	);
}
