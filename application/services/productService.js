// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductRepository = require('../../domain/repositories/productRepository');

class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    async getProductById(id) {
        const Product = await this.ProductRepository.getById(id);
        if (!Product) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return Product;
    }

    async createProduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.ProductRepository.save(data);
    }

    async updateProduct(id, data) {
        const updatedProduct = await this.ProductRepository.updateById(id, data);
        if (!updatedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be updated'}));
        }
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await this.ProductRepository.deleteById(id);
        if (!deletedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be deleted'}));
        }        
        return deletedProduct;
    }
    
    async searchProductsByName(name) {
        return await this.ProductRepository.searchByName(name);
    }
}

module.exports = ProductService;