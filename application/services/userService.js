// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserRepository = require('../../domain/repositories/userRepository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserById(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found'}));
        }
        return user;
    }

    async createUser(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.userRepository.save(data);
    }

    async getUserByNickAndPassword(body) {
        try {
            // Obtener el usuario por apodo
            const users = await this.userRepository.getNick(body.nick);
            console.log(users)
            // Verificar que el resultado es un array
            if (!Array.isArray(users)) {
                throw new Error('El resultado de getNick no es un array');
            }
    
            // Desestructurar el primer usuario
            const [user] = users;
    
            // Verificar si se encontró el usuario
            if (!user) {
                throw new Error(JSON.stringify({ status: 404, message: 'Usuario no encontrado' }));
            }
    
            // Validar la contraseña
            const token = await this.userRepository.getPassword(body.password, user);
    
            // Verificar si la contraseña es válida
            if (!token) {
                throw new Error(JSON.stringify({ status: 401, message: 'Contraseña inválida' }));
            }
    
            // Devolver el token si la validación es exitosa
            return token;
    
        } catch (error) {
            // Manejar errores (aquí se puede hacer registro o procesamiento adicional)
            console.error('Error en getUserByNickAndPassword:', error);
            throw error; // Volver a lanzar el error después de registrarlo
        }
    }
    
    async updateUser(id, data) {
        const updatedUser = await this.userRepository.updateById(id, data);
        if (!updatedUser) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be updated'}));
        }
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await this.userRepository.deleteById(id);
        if (!deletedUser) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be deleted'}));
        }        
        return deletedUser;
    }
    
    async searchUsersByName(name) {
        return await this.userRepository.searchByName(name);
    }
}

module.exports = UserService;