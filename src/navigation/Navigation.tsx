import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from '@/components/ui/menubar'
import { useNavigate } from 'react-router-dom'

export function Navigation() {
    const navigate = useNavigate()

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Products</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => navigate('/products')}>List Products</MenubarItem>
                    <MenubarItem onClick={() => navigate('/product/create')}>Add Product</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Recipes</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem disabled>List Recipes</MenubarItem>
                    <MenubarItem disabled>Add Recipe</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
