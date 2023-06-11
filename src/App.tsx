import './index.css'
import { Navigation } from './Navigation'
import { BrowserRouter, Route } from 'react-router-dom'
import { Product } from '@/features/products/Product'

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Route path="/product" element={<Product />} />
        </BrowserRouter>
    )
}

export default App
