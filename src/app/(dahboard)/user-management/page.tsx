import CustomMemberTable from '@/componets/usermanagement/CustomMemberTable';

export default function UserManagement() {
    return (
        <main className="p-6 ">
            <h1 className="text-3xl font-bold mb-6">User Management </h1>
            <CustomMemberTable />
        </main>
    )
}