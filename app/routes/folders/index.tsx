import { useFoldersQuery } from "~/__generated__/types";
import { Navbar } from "~/components/layout/navbar";

export default function FoldersPage() {
	const [data] = useFoldersQuery();

	if (data.fetching) return <>loading...</>;

	return (
		<>
			{JSON.stringify(data.data?.folders)}
			<Navbar />
		</>
	);
}
