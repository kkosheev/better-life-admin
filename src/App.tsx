import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Product } from '@/features/products/Product'
import { AdminLayout } from '@/layout/AdminLayout'
import { ProductCreate } from '@/pages/product/CreateProduct'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/product"
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
