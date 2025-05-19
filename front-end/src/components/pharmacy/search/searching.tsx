import { ContentProp, columns } from "./columns";
import { DataTable } from "./data-table";

export default function Searching({
  content,
}: {
  content: ContentProp[] | null;
}) {
  if (!content) {
    return null;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={content} />
    </div>
  );
}
