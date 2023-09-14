import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
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
                    <MenubarItem onClick={() => navigate('/products/archived')}>Archived Products</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Recipes</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => navigate('/recipes')}>List Recipes</MenubarItem>
                    <MenubarItem onClick={() => navigate('/recipe/create')}>Add Recipe</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
