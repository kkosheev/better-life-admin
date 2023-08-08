import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Product } from '@/features/products/Product'
import { AdminLayout } from '@/layout/AdminLayout'
import { ProductCreate } from '@/pages/product/CreateProduct'
import { ListProducts } from './pages/product/ListProducts'
import { QueryClientProvider, QueryClient } from 'react-query'

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
            <BrowserRouter basename="https://kkosheev.github.io/better-life-admin/">
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
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
