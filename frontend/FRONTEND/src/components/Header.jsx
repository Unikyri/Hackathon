import React from 'react';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
} from '@nextui-org/react';

export default function Header() {
	return (
		<Navbar className="bg-[#b2cef3e3]" maxWidth="full">
		<NavbarContent className="flex justify-between">
			<NavbarBrand>
				
			</NavbarBrand>
		</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify='center'>
				<NavbarItem>
					<Link href="/">
						<div className="flex items-center justify-center gap-4">
							<img src="./logo-name.PNG" className="w-36" />
						</div>
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						as={Link}
						href="/login"
						className="bg-white text-[#C41E3A] font-semibold"
					>
						Login
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
