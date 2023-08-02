import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Product } from '@/features/products/Product'
import { AdminLayout } from '@/layout/AdminLayout'
import { ProductCreate } from '@/pages/product/CreateProduct'
import { ListProducts } from '@/pages/product/ListProducts'

function App() {
    return (
        <BrowserRouter>
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
    )
}

export default App
