import './index.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
// import { Product } from '@/features/products/Product'
import { AdminLayout } from '@/layout/AdminLayout'
import { ProductCreate } from '@/pages/product/CreateProduct'
import { EditProduct } from '@/pages/product/EditProduct'
import { ListProducts } from '@/pages/product/ListProducts'
import { ListRecipes } from '@/pages/recipe/ListRecipes'
import { QueryClientProvider, QueryClient } from 'react-query'
import { CreateRecipe } from '@/pages/recipe/CreateRecipe'

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <BrowserRouter></BrowserRouter> */}
            <HashRouter>
                <Routes>
                    <Route
                        path="/products"
                        element={
                            <AdminLayout>
                                <ListProducts />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/product/create"
                        element={
                            <AdminLayout>
                                <ProductCreate />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/products/edit/:id"
                        element={
                            <AdminLayout>
                                <EditProduct />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/recipe/create"
                        element={
                            <AdminLayout>
                                <CreateRecipe />
                            </AdminLayout>
                        }
                    />
                    {/* <Route
                        path="/recipes"
                        element={
                            <AdminLayout>
                                <ListRecipes />
                            </AdminLayout>
                        }
                    /> */}
                </Routes>
            </HashRouter>
        </QueryClientProvider>
    )
}

export default App
