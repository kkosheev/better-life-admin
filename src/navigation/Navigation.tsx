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

export function Navigation() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Products</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>List Products</MenubarItem>
                    <MenubarItem>Add Product</MenubarItem>
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
