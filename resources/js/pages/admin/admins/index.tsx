import { Head, usePage, router } from "@inertiajs/react";
import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import {route} from 'ziggy-js';
import { User } from "lucide-react";
import { BreadcrumbItem } from "@/types";
import admin from "@/routes/admin";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Администраторы',
        href: admin.admins.index().url,
    },
];

export default function adminIndex(){
    const {admins, filters, can} = usePage().props;
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
        router.delete(route('admin.admins.destroy', id),{
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Администраторы"/>
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={admins}
                        columns={columns}
                        icon={User}
                        filters={filters}

                        resourceName="Администраторы"
                        resourceNameNotFound="Администраторов"
                        singularName="Администратора"

                        canViewResource={true}
                        canCreateResource={true} 
                        canEditResource={true} 
                        canDeleteResource={true}

                        routeName="admin.admins.index"   
                        viewRoute="admin.admins.show"
                        editRoute="admin.admins.edit"
                        createRoute="admin.admins.create"

                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AppLayout>
    )
}

//16:25