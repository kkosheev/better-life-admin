import React from 'react'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    PaginationState,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery, useQueryClient } from 'react-query'
import { fetchProducts, fetchSearchProducts, toggleArchiveProduct } from '@/lib/data'
import { useDebounce } from '@uidotdev/usehooks'
import { ReloadIcon, CaretSortIcon, DotsHorizontalIcon, Pencil1Icon, SymbolIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const columns: ColumnDef<unknown, any>[] = [
    {
        accessorKey: 'image_url',
        header: 'Image',
        cell: ({ row }) => {
            return row.getValue('image_url') ? (
                <img className="h-16 w-16" src={row.getValue('image_url')} />
            ) : (
                <div className="flex bg-gray-200 h-16 w-16 rounded justify-center items-center">
                    <span className="text-xs text-gray-400">No Image</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'pure',
        header: 'Pure',
        cell: ({ row }) => {
            return row.getValue('pure') === 1 ? 'Pure' : 'Composite'
        },
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
    },
    {
        accessorKey: 'glycemic_index',
        header: 'Glycemic Index',
    },
    {
        accessorKey: 'nutrition_score',
        header: 'Nutrition Score',
    },
    {
        accessorKey: 'proximates.protein',
        header: 'Protein (g)',
    },
    {
        accessorKey: 'proximates.carbohydrates',
        header: 'Carbohydrates (g)',
    },
    {
        accessorKey: 'proximates.fat',
        header: 'Fat (g)',
    },
    {
        accessorKey: 'proximates.energy',
        header: 'Energy (kcal)',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const navigate = useNavigate()
            const { toast } = useToast()

            const queryClient = useQueryClient()

            const handleUnarchive = async (id) => {
                toast({
                    title: 'Hooray 🎉',
                    description: 'Product unarchived successfully!',
                })

                await toggleArchiveProduct(id)

                queryClient.invalidateQueries('products_archived')
                queryClient.invalidateQueries('search_archived')
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/products/edit/${row.original?.id}`)}>
                            <Pencil1Icon /> &nbsp; Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUnarchive(row.original?.id)}>
                            <SymbolIcon /> &nbsp; Unarchive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export const ListArchivedProducts: React.FC = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [searchQuery, setSearchQuery] = React.useState('')
    const [fetchParams] = useDebounce([searchQuery], 300)

    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const fetchDataOptions = {
        pageIndex,
        pageSize,
        archived: 'true',
    } as const

    const { data: products, isLoading } = useQuery(
        ['products_archived', fetchDataOptions],
        () => fetchProducts(fetchDataOptions),
        { keepPreviousData: true }
    )

    const { data: searchData, isLoading: isSearchLoading } = useQuery(
        ['search_archived', ...fetchParams],
        () => fetchSearchProducts(searchQuery, 30, 'true'),
        { keepPreviousData: false }
    )

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const table = useReactTable({
        data: searchQuery.length > 2 ? searchData : products?.data,
        columns,
        pageCount: searchQuery.length > 2 ? 0 : products?.pageCount ?? -1,
        onSortingChange: setSorting,
        //onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        //getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
    })

    return (
        <div className="grid grid-cols-1 gap-8">
            <div>
                <h1 className="text-xl font-bold">Archived Products</h1>
            </div>
            {/* <Input
                placeholder="Search products"
                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                className="max-w-sm"
            /> */}
            <Input
                placeholder="Search archived products"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="max-w-sm"
            />
            {(isLoading || isSearchLoading) && <ReloadIcon className="mr-2 h-14 w-14 animate-spin" />}
            {!isLoading && !isSearchLoading && (
                <>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
