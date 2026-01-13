import { usePage, router } from "@inertiajs/react"
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PaginatedData } from '@/types';
import React, { useState } from "react"
import {route} from 'ziggy-js';
import DeleteDialog from "../DeleteDialog";

interface TableColumn {
    key: string;
    label : string;
    type?: 'text' | 'number' | 'date' | 'custom';
    sortable?: boolean;
    render?: (row:any) => React.ReactNode;
}

export default function DataTable<T>({
  data,
  columns = [],
  resourceName = '',
  resourceNameNotFound = '',
  singularName = '',
  routeName = '',
  filters = {},
  viewRoute = '',
  canViewResource = false,
  canCreateResource = false,
  canEditResource = false,
  canDeleteResource = false,
  icon: Icon,
  createRoute = '',
  editRoute = '',
  onDelete,
} : {
    data: any,
    columns: any;
    resourceName: string;
    resourceNameNotFound: string;
    singularName: string;
    routeName: string;
    filters: any;
    viewRoute : string;
    canViewResource : boolean;
    canCreateResource : boolean;
    canEditResource : boolean;
    canDeleteResource : boolean;
    icon: React.ElementType;
    createRoute: string;
    editRoute: string;
    onDelete: (id: string) => void;
}) {

    const {errors}=usePage().props

    const [search, setSearch] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.perPage ||10);
    const [sort, setSort] = useState(filters?.sort || 'id');
    const [direction, setDirection]=useState(filters?.direction || 'desc');

    const [itemToDelete,setItemToDelete] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog]=useState(false);

    const updateRoute = (newParams = {}) => {
        const params = {
            search,
            perPage,
            sort,
            direction,
            page: 1,
            ...newParams,
        };
        router.get(route(routeName), params, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleSearch = (e : any) => {
        e.preventDefault();
        updateRoute();
    }

    const handlePerPageChange = (e : any) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        updateRoute({perPage : newPerPage})
    }

    const handleSort = (column : any) =>{
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        updateRoute({sort:column, direction: newDirection});
    }
    const formatDate = (dateString: any) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatDate2 = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const renderCell = (item: any, column: any, index: number) => {
        if (!column.key) return null;

        const getValue = (obj: any, path: any) => {
            return path.split('.').reduce((acc: any, part: any) => acc && acc[part], obj);
        };

        const value = getValue(item, column.key);

        if (column.type === 'date' && value) {
            return formatDate(value);
        } 
        if (column.type === 'date2' && value) {
            return formatDate2(value);
        } 
        if (column.type === 'badge') {
            return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">{value}</span>;
        }
        if (column.type === 'image' && column.design === 'rec') {
            return (
                <img
                    src={value}
                    alt={item.name}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholder.png';
                    }}
                    className="h-30 w-30"
                />
            );
        }
        if (column.type === 'image' && column.design === 'circle') {
            return (
                <img
                    src={value}
                    alt={item.name}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholder.png';
                    }}
                    className="h-10 w-10 rounded-full"
                />
            );
        }
        if (column.type === 'boolean') {
            return value ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Yes</span>
            ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">No</span>
            );
        }
        if(column.type ==='custom' && column.render){
            return column.render(item);
        }
        if(column.type ==='IndexColumn' && column.render){
            // console.log("Пользователь", item)
            return column.render(item, index);
        }
        return value;
    };

    const renderActions = (item : any) =>{
        return <div className="flex space-x-2">
            {canViewResource && (
                <button onClick={() => router.visit(route(viewRoute, item.id))}
                 className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 
                            hover:bg-blue-100 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Смотреть
                </button>
            )}
            {canEditResource && (
                <button onClick={() => router.visit(route(editRoute, item.id))}
                        className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 
                                    hover:bg-blue-100 
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Редактировать
                </button>
            )}
            {canDeleteResource && (
                <button onClick={() => {
                    setItemToDelete(item);
                    setShowDeleteDialog(true)
                }}
                className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 
                            hover:bg-red-100 
                            focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none">
                    Удалить
                </button>
            )}
        </div>
    }


    let tableColumns: TableColumn[] = []; 
    tableColumns = [...columns];
    // const tableColumns  = [...columns];

    if(canEditResource || canDeleteResource || canViewResource){
        tableColumns.push({
            key: ' actions',
            label : 'Действия',
            type: "custom",
            sortable: false,
            render: renderActions,
        })
    }

    return(
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="mb-6 flex flex-row space-y-4 
                                sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center">
                        {Icon && <Icon className="mr-3 h-6 w-6 text-blue-600"/>}
                        <h2 className="text-2xl font-bold text-gray-800">{resourceName}</h2>
                    </div>
                    {canCreateResource &&(
                        <a  href={route(createRoute)}
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm 
                            hover:bg-blue-700 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                            Добавить  {singularName}
                        </a>
                    )}
                </div>

                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <form onSubmit={handleSearch} className="relative flex w-full max-w-md gap-x-2">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"/>
                        <input
                            type="text"
                            placeholder={`Поиск ...`}
                            className="w-full rounded-lg border  border-gray-300 py-2  pr-4 pl-10 text-gray-700 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200  focus:outline-none"
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}>
                        </input>
                        
                        <button type="submit" className="ml-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors 
                                                       hover:bg-blue-700
                                                        focus:ring-offset-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200  focus:outline-none">
                            Поиск
                        </button>
                    </form>
                    
                    <div className="flex items-center">
                        <label htmlFor="perPage" className="mr-2 text-sm font-medium text-gray-600">
                            Показать
                        </label>

                        <select
                            id="perPage"
                            className="rouded-lg border  border-gray-300 bg-white py-2 pr-8 pl-3 text-gray-700 
                                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            value={perPage}
                            onChange={handlePerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow  m-6">
                <table className="min-w-full divide-y divide-gray-200 bg-white ">
                    <thead >
                        <tr className="bg-gray-50">
                            {tableColumns.map((column)=>(
                                <th key={column.key}
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    style={column.width ? {width:column.width} : {}}
                                >
                                    {column.sortable !== false ? (
                                        <button onClick={() => handleSort(column.key)}
                                                className="group inline-flex items-center">
                                            {column.label}
                                            <span className="ml-2">
                                                {sort === column.key ? (
                                                    direction === 'asc' ? (
                                                        <ArrowUp className="h-4 w-4 text-blue-500"/>
                                                    ): (
                                                        <ArrowDown className="h-4 w-4 text-blue-500"/>
                                                    )
                                                ):(
                                                    <span className="opacity-0 group-hover:opacity-50">
                                                        <ArrowUp className="h-4 w-4"/>
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    ):(
                                        column.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.data.length > 0 ? (
                            data.data.map((item: any, index: number) => (
                                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                                    {tableColumns.map((column) => (
                                        <td key={`${item.id}-${column.key}`} className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {renderCell(item, column, index)} 
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableColumns.length} className="px-6 py-10 text-center text-sm text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        {Icon && <Icon className="mb-2 h-10 w-10 text-gray-400" />}
                                        <p className="font-medium">
                                            Не найдено {resourceNameNotFound.toLowerCase()}
                                        </p>
                                        <p className="mt-1 text-gray-400">Попробуйте скорректировать критерии поиска или добавить пользователей</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between m-6">
                <p className="text-sm text-gray-700">
                    Смотреть <span className="font-medium">{data.from || 0}</span> по <span className="font-medium">{data.to || 0}</span> из
                    <span className="font-medium"> {data.total}</span> пользователей
                </p>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => data.prev_page_url && router.visit(data.prev_page_url)}
                        disabled={!data.prev_page_url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    {data.links &&
                        data.links.map((link: any, index: number) => {
                            // Skip "prev" and "next" buttons
                            if (link.label.includes("Previous") || link.label.includes("Next")) {
                                return null;
                            }
                            
                            // Try to parse the label as a number
                            const pageNum = parseInt(link.label);
                            if (isNaN(pageNum) && link.label.includes('...')) {
                                return (
                                    <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                );
                            }
                            
                            return (
                                <button
                                    key={index}
                                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                                        link.active 
                                            ? 'bg-blue-600 text-white' 
                                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => router.visit(link.url)}
                                    disabled={!link.url}
                                >
                                    {pageNum || link.label}
                                </button>
                            );
                        })
                    }

                    <button
                        onClick={() => router.visit(data.next_page_url)}
                        disabled={!data.next_page_url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* <DeleteDialog 
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={() => onDelete(itemToDelete?.id)}
                title="Delete Item"
                message="Вы уверены что хотите удалить пользователя ?"
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
            /> */}
        </div>
    )
}

// 17:47