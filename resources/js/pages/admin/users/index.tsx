import { Head, usePage, router } from "@inertiajs/react";
import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import {route} from 'ziggy-js';
import { User } from "lucide-react";

export default function UserIndex(){
    const {users, filters, can} = usePage().props;
    const columns = [
        {
            key: "index",
            label: "#",
            sortable: false,
            type: 'IndexColumn',
            width: '80px', 
            render:(item: any, index:number)=>{
                // console.log("Фильтры", filters)
                // console.log("Index", index)
                return(filters.page-1) *filters.perPage + index +1;
            },
        },
        {
            key: 'name',
            label: 'Имя',
            sortable: true,
        },
        {
            key: 'email',
            label: 'Электронная почта',
            sortable: true,
        },
        {
            key: 'phone',
            label: 'Телефон',
            sortable: true,
        },
        {
            key: 'created_at',
            type: 'date',
            label: 'Дата создания',
            sortable: true,
        }
    ];

    const handleDelete = (id:string) => {
        router.delete(route('admin.users.destroy', id),{
            preserveScroll: true,
            onSuccess: () =>{
                // toast.success("Пользователь успешно удалён");
            },
            onError: ()=> {
                // toast.error("Ошибка удаления");
            }
        })
    }

    return(
        <AppLayout>
            <Head title="Users"/>
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={users}
                        columns={columns}
                        resourceName="Users"
                        singularName="User"
                        routeName="admin.users.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={false} 
                        canEditResource={false} 
                        viewRoute="admin.users.show"
                        editRoute="admin.users.edit"
                        onDelete={handleDelete}
                        icon={User}
                    />
                </div>
            </div>
        </AppLayout>
    )
}