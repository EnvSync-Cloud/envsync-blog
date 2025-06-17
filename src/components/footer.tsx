import ExtLink from "./ext-link";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="footer-links">
					<ExtLink href="https://envsync.cloud">
						<img
							src="https://raw.githubusercontent.com/EnvSync-Cloud/.github/refs/heads/main/assets/Buttons/get-started-spaced.png"
							width={"50%"}
						/>
					</ExtLink>
				</div>
				<span>
					or <ExtLink href="https://github.com/envsync-cloud">View GitHub</ExtLink>
				</span>
			</footer>
		</>
	);
}
