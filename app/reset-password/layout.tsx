export default function ResetPasswordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="min-h-full h-full overflow-y-hidden flex items-center justify-center ">
			<div className="inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
	);
}
