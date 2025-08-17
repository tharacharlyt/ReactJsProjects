import EditUserForm from "@/features/users/components/EditUserForm";
import { getUserById } from "@/features/users/userApi";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const user = await getUserById(id);

  return <EditUserForm user={user} />;
}