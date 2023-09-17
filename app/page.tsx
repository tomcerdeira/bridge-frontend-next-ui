import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="mt-8">
				<Link
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href='/checkout/1'
				>
					Demo Checkout
				</Link>
			</div>
		</section>
	);
}
