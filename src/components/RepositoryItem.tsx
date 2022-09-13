interface RepositoryItemProps {
	repository: {
		name: string;
		description: string;
		html_url: string;
	};
}

export function RepositoryItem(props: RepositoryItemProps) {
	return (
		<li>
			<strong>{props.repository.name}</strong>
			<p>{props.repository.description}</p>

			<p>{props.repository.html_url}</p>

			<a href={props.repository.html_url}>Acessar repositorio</a>
		</li>
	);
}
